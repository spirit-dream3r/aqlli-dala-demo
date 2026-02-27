from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import init_db, save_telemetry, get_latest_telemetry, get_all_fields, add_field
from config import config
import asyncio
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    await init_db()
    print("✅ База данных инициализирована")
    yield
    # Shutdown logic (if any) could go here

app = FastAPI(title="Aqlli Dala API", version="1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3003", "http://192.168.1.101:3000", "http://192.168.1.101:3003"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TelemetryData(BaseModel):
    field_id: str
    moisture: int
    temperature: float = 0.0
    battery: int = 100

class FieldData(BaseModel):
    field_name: str
    crop_type: str = "unknown"
    owner_phone: str = None

class SyncData(BaseModel):
    phone_number: str
    telegram_id: int
    username: str = None

class LeadData(BaseModel):
    name: str
    contact: str
    region: str = None
    message: str = None

# Routes continue here...

@app.get("/")
async def root():
    return {"message": "Aqlli Dala API работает", "status": "online"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": asyncio.get_event_loop().time()}

@app.post("/api/telemetry")
async def receive_telemetry(data: TelemetryData):
    try:
        await save_telemetry(
            field_id=data.field_id,
            moisture=data.moisture,
            temperature=data.temperature,
            battery=data.battery
        )
        return {"status": "success", "message": "Данные получены"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/fields")
async def add_new_field(data: FieldData):
    success = await add_field(data.field_name, data.crop_type, data.owner_phone)
    if success:
        return {"status": "success", "message": f"Поле {data.field_name} добавлено"}
    else:
        return {"status": "error", "message": "Поле уже существует"}

@app.get("/api/fields")
async def list_fields():
    fields = await get_all_fields()
    return {"fields": [{"name": f[0], "crop": f[1]} for f in fields]}

@app.get("/api/telemetry/{field_id}")
async def get_field_telemetry(field_id: str):
    data = await get_latest_telemetry(field_id)
    if data:
        return {
            "field_id": field_id,
            "moisture": data[0],
            "temperature": data[1],
            "battery": data[2],
            "timestamp": data[3]
        }
    else:
        raise HTTPException(status_code=404, detail="Данные не найдены")

@app.post("/api/lead")
async def receive_lead(data: LeadData):
    from bot import bot
    from config import config
    from database import register_user
    try:
        # Register user in DB
        await register_user(data.name, data.contact)
        
        # Send to Telegram (Resilient)
        try:
            text = (
                f"<b>🚜 Aqlli Dala — новая заявка</b>\n\n"
                f"<b>Имя/хозяйство:</b> {data.name}\n"
                f"<b>Контакт:</b> {data.contact}\n"
                f"<b>Регион:</b> {data.region or '—'}\n"
                f"<b>Комментарий:</b> {data.message or '—'}"
            )
            await bot.send_message(
                chat_id=config.TELEGRAM_CHAT_ID,
                text=text,
                parse_mode="HTML"
            )
        except Exception as telegram_error:
            print(f"⚠️ Telegram Notification Failed: {telegram_error}")
            # We still return OK because the user is registered in the DB
            
        return {"ok": True, "message": "Заявка принята и сохранена в базе"}
    except Exception as e:
        print(f"❌ Error in receive_lead: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post("/api/sync_bot")
async def sync_bot_user(data: SyncData):
    from database import sync_telegram_id
    success = await sync_telegram_id(data.phone_number, data.telegram_id, data.username)
    if success:
        return {"ok": True}
    else:
        raise HTTPException(status_code=500, detail="Failed to sync")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=config.HOST, port=config.PORT)