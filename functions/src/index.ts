import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";

admin.initializeApp();
const db = admin.firestore();

const app = express();

// Разрешаем только твой домен (замени на свой)
// Если доменов несколько — добавь в массив.
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://aqlli-dala-landing.web.app"
  // "https://YOUR-DOMAIN.com",
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
}));
app.use(express.json({ limit: "50kb" }));

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// Простая нормализация IP (для Hosting → Functions)
function getClientIp(req: any): string {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  const xr = req.headers["x-real-ip"];
  if (typeof xr === "string" && xr.length) return xr.trim();
  return "unknown";
}

// Rate limit: 5 запросов/час на IP
async function rateLimitOrThrow(ip: string) {
  const now = Date.now();
  const hourBucket = Math.floor(now / (60 * 60 * 1000)); // “часовой” бакет
  const docId = `${ip}_${hourBucket}`;
  const ref = db.collection("rate_limits").doc(docId);

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const count = snap.exists ? (snap.data()?.count ?? 0) : 0;
    if (count >= 5) {
      const err: any = new Error("Too many requests");
      err.status = 429;
      throw err;
    }
    tx.set(ref, { count: count + 1, createdAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
  });
}

app.post("/lead", async (req, res) => {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({ ok: false, error: "Server not configured" });
    }

    const ip = getClientIp(req);
    const ua = String(req.headers["user-agent"] ?? "");

    // Honeypot (поле должно быть пустым — если заполнено, это бот)
    const hp = String(req.body?.company ?? "").trim();
    if (hp) {
      return res.status(200).json({ ok: true }); // “тихо” игнорим спамеров
    }

    await rateLimitOrThrow(ip);

    const name = String(req.body?.name ?? "").trim();
    const contact = String(req.body?.contact ?? "").trim();
    const region = String(req.body?.region ?? "").trim();
    const message = String(req.body?.message ?? "").trim();

    if (name.length < 2 || contact.length < 3) {
      return res.status(400).json({ ok: false, error: "Fill name and contact" });
    }
    if (name.length > 80 || contact.length > 120 || region.length > 120 || message.length > 600) {
      return res.status(400).json({ ok: false, error: "Too long" });
    }

    // 1) Сохраняем в Firestore
    const lead = {
      name,
      contact,
      region: region || null,
      message: message || null,
      ip,
      ua: ua.slice(0, 250),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      source: "landing",
    };

    const leadRef = await db.collection("leads").add(lead);

    // 2) Forward to Python Backend (FastAPI) which now handles the Bot
    try {
      const backendRes = await fetch("http://127.0.0.1:8000/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(req.body),
      });

      if (!backendRes.ok) {
        console.error("Backend forward failed:", await backendRes.text());
      }
    } catch (e) {
      console.error("Error forwarding to backend:", e);
    }

    return res.json({ ok: true });
  } catch (e: any) {
    const status = e?.status ?? 500;
    return res.status(status).json({ ok: false, error: e?.message ?? "Unknown error" });
  }
});

// HTTP function (2nd gen)
export const api = functions.https.onRequest(
  {
    region: "us-central1",
    // secrets подключаются к env
    secrets: ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"],
  },
  app
);
