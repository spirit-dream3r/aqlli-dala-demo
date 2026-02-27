'use client';

import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import {
  Droplets,
  Gauge,
  Leaf,
  Radio,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  Send,
} from 'lucide-react';

type Lang = 'uz' | 'ru';
type SubmitStatus = 'idle' | 'loading' | 'ok' | 'error';

const fmt = new Intl.NumberFormat('ru-RU');

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur',
        className
      )}
    >
      {children}
    </div>
  );
}

function Pill({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80", className)}>
      {children}
    </span>
  );
}

export default function Page() {
  const [lang, setLang] = useState<Lang>('ru');
  const t = (ru: string, uz: string) => (lang === 'ru' ? ru : uz);

  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [statusMsg, setStatusMsg] = useState<string>('');

  // DEMO DATA (замени на реальные)
  const moisture = useMemo(
    () => [
      { time: '06:00', top20: 26, root40: 34, threshold: 25 },
      { time: '08:00', top20: 24, root40: 33, threshold: 25 },
      { time: '10:00', top20: 22, root40: 31, threshold: 25 },
      { time: '12:00', top20: 19, root40: 29, threshold: 25 },
      { time: '14:00', top20: 18, root40: 27, threshold: 25 },
      { time: '16:00', top20: 20, root40: 26, threshold: 25 },
      { time: '18:00', top20: 23, root40: 28, threshold: 25 },
      { time: '20:00', top20: 25, root40: 30, threshold: 25 },
    ],
    []
  );

  const waterBeforeAfter = useMemo(
    () => [
      { week: 'W1', before: 120, after: 92 },
      { week: 'W2', before: 118, after: 86 },
      { week: 'W3', before: 124, after: 90 },
      { week: 'W4', before: 121, after: 88 },
    ],
    []
  );

  const payback = useMemo(
    () => [
      { month: '1', revenue: 8, cost: 90 },
      { month: '2', revenue: 16, cost: 90 },
      { month: '3', revenue: 24, cost: 90 },
      { month: '4', revenue: 32, cost: 90 },
      { month: '5', revenue: 40, cost: 90 },
      { month: '6', revenue: 48, cost: 90 },
      { month: '7', revenue: 56, cost: 90 },
      { month: '8', revenue: 64, cost: 90 },
      { month: '9', revenue: 72, cost: 90 },
      { month: '10', revenue: 80, cost: 90 },
      { month: '11', revenue: 88, cost: 90 },
      { month: '12', revenue: 96, cost: 90 },
      { month: '14', revenue: 112, cost: 90 },
      { month: '16', revenue: 128, cost: 90 },
      { month: '18', revenue: 144, cost: 90 },
    ],
    []
  );

  const kpis = useMemo(() => {
    const avgBefore =
      waterBeforeAfter.reduce((s, x) => s + x.before, 0) /
      waterBeforeAfter.length;
    const avgAfter =
      waterBeforeAfter.reduce((s, x) => s + x.after, 0) /
      waterBeforeAfter.length;
    const savingPct = Math.round(((avgBefore - avgAfter) / avgBefore) * 100);

    return {
      savingPct,
      avgBefore: Math.round(avgBefore),
      avgAfter: Math.round(avgAfter),
    };
  }, [waterBeforeAfter]);

  async function submitLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: должен быть пустым
    const hp = String(fd.get('company') ?? '').trim();
    if (hp) {
      // молча “успех” — спамер не понимает, что его отфильтровали
      setStatus('ok');
      setStatusMsg(lang === 'ru' ? 'Заявка отправлена ✅' : "So‘rov yuborildi ✅");
      form.reset();
      return;
    }

    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      contact: String(fd.get('contact') ?? '').trim(),
      region: String(fd.get('region') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
      // company (honeypot) намеренно НЕ отправляем
    };

    setStatus('loading');
    setStatusMsg('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json: any = await res.json().catch(() => ({}));

      if (!res.ok || !json?.ok) {
        setStatus('error');
        const msg =
          (typeof json?.error === 'string' && json.error) ||
          (lang === 'ru' ? 'Ошибка отправки' : "Yuborishda xatolik");
        setStatusMsg(msg);
        return;
      }

      setStatus('ok');
      setStatusMsg(lang === 'ru' ? 'Заявка отправлена ✅' : "So‘rov yuborildi ✅");
      form.reset();
    } catch (err: any) {
      setStatus('error');
      setStatusMsg(err?.message ?? (lang === 'ru' ? 'Сеть недоступна' : 'Tarmoq mavjud emas'));
    }
  }

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute -top-24 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute top-48 left-16 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[480px] w-[480px] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070A12]/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
              <Droplets className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Aqlli Dala</div>
              <div className="text-xs text-white/60">
                {t('AgTech • Умный полив', 'AgTech • Aqlli sug‘orish')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Pill className="hidden sm:inline-flex">
              <Radio className="h-3.5 w-3.5 text-cyan-300" />
              {t('LoRaWAN • без интернета', 'LoRaWAN • internet shartsiz')}
            </Pill>

            <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => setLang('ru')}
                className={cn(
                  'rounded-full px-3 py-1 text-xs',
                  lang === 'ru'
                    ? 'bg-white/15'
                    : 'text-white/70 hover:text-white'
                )}
              >
                RU
              </button>
              <button
                onClick={() => setLang('uz')}
                className={cn(
                  'rounded-full px-3 py-1 text-xs',
                  lang === 'uz'
                    ? 'bg-white/15'
                    : 'text-white/70 hover:text-white'
                )}
              >
                UZ
              </button>
            </div>

            <a
              href="#demo"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[#070A12] transition-transform hover:bg-white/90 active:scale-95 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs"
            >
              <span className="hidden xs:inline">{t('Посмотреть демо', "Demoni ko‘rish")}</span>
              <span className="xs:hidden">{t('Демо', "Demo")}</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <div className="flex flex-wrap gap-2">
              <Pill>
                <Gauge className="h-3 w-3 text-indigo-300 sm:h-3.5 sm:w-3.5" />
                <span className="text-[10px] sm:text-xs">{t('Контроль влажности 20/40 см', 'Namlik nazorati 20/40 sm')}</span>
              </Pill>
              <Pill>
                <ShieldCheck className="h-3 w-3 text-emerald-300 sm:h-3.5 sm:w-3.5" />
                <span className="text-[10px] sm:text-xs">{t('IP67 • Энергонезависимость', 'IP67 • Avtonom ishlash')}</span>
              </Pill>
              <Pill>
                <Clock className="h-3 w-3 text-amber-300 sm:h-3.5 sm:w-3.5" />
                <span className="text-[10px] sm:text-xs">{t('Уведомления в Telegram', 'Telegram ogohlantirishlari')}</span>
              </Pill>
            </div>

            <h1 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              {t(
                'Экономьте 30% воды и 25% электричества — поливайте по данным.',
                "30% suv va 25% elektr energiyasini tejang — ma’lumotlar asosida sug‘oring."
              )}
            </h1>

            <p className="mt-5 max-w-xl text-base text-white/70">
              {t(
                'Aqlli Dala — IoT-датчики влажности + LoRaWAN + ИИ-аналитика. Работает там, где нет 3G/4G. Увеличиваем урожайность на 15% за счет точного полива.',
                "Aqlli Dala — IoT namlik datchiklari + LoRaWAN + AI tahlili. 3G/4G yo‘q joylarda ham ishlaydi. To‘g‘ri sug‘orish orqali hosildorlikni 15% ga oshiramiz."
              )}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-[#070A12] transition-transform hover:bg-white/90 active:scale-95"
              >
                {t('Запросить пилот', 'Pilot so‘rash')}
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#how"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t('Как это работает', 'Qanday ishlaydi')}
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 xs:grid-cols-3">
              <Card className="flex items-center justify-between p-4 xs:block">
                <div className="text-xs text-white/60">
                  {t('Экономия воды', 'Suv tejalishi')}
                </div>
                <div className="mt-1 text-2xl font-bold text-emerald-400 xs:text-white">
                  30%
                </div>
              </Card>
              <Card className="flex items-center justify-between p-4 xs:block">
                <div className="text-xs text-white/60">
                  {t('Электричество', 'Elektr energiya')}
                </div>
                <div className="mt-1 text-2xl font-bold text-indigo-400 xs:text-white">
                  25%
                </div>
              </Card>
              <Card className="flex items-center justify-between p-4 xs:block">
                <div className="text-xs text-white/60">
                  {t('Урожайность', 'Hosildorlik')}
                </div>
                <div className="mt-1 text-2xl font-bold text-amber-400 xs:text-white">
                  +15%
                </div>
              </Card>
            </div>
          </div>

          {/* Right: Demo panel */}
          <Card className="h-fit">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">
                  {t('Контроль корневой зоны', 'Ildiz zonasi nazorati')}
                </div>
                <div className="mt-1 text-xs text-white/60">
                  {t(
                    'Данные с глубины 20см и 40см',
                    '20sm va 40sm chuqurlikdagi ma’lumotlar'
                  )}
                </div>
              </div>
              <Pill>
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                LoRaWAN Online
              </Pill>
            </div>

            <div className="mt-6 h-64 w-full">
              <ResponsiveContainer>
                <LineChart
                  data={moisture}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="4 4" opacity={0.15} />
                  <XAxis
                    dataKey="time"
                    tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 12 }}
                  />
                  <YAxis
                    tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(10,12,20,0.95)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 14,
                      color: 'white',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="top20"
                    name={t('Влажность 20см', 'Namlik 20sm')}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="root40"
                    name={t('Влажность 40см', 'Namlik 40sm')}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="threshold"
                    name={t('Порог', 'Chegara')}
                    strokeWidth={1}
                    dot={false}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Card className="p-4">
                <div className="text-xs text-white/60">{t('Статус', 'Holat')}</div>
                <div className="mt-1 text-sm font-semibold text-emerald-300">
                  {t('Оптимально', 'Optimal')}
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-xs text-white/60">
                  {t('Рекомендация', 'Tavsiya')}
                </div>
                <div className="mt-1 text-sm font-semibold">
                  {t('Полив не требуется', "Sug‘orish shart emas")}
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-xs text-white/60">{t('Прогноз', 'Prognoz')}</div>
                <div className="mt-1 text-sm font-semibold">
                  {t('24ч Ок', '24s Ok')}
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold">
            {t('Технология “Aqlli Dala”', '“Aqlli Dala” texnologiyasi')}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            {t(
              'Датчики ESP32-S3 + LoRa SX1262. Передача данных до 10 км без мобильной связи. Питание от солнечных панелей 24/7.',
              "ESP32-S3 + LoRa SX1262 datchiklari. Mobil aloqasiz 10 km gacha ma’lumot uzatish. Quyosh panellari orqali 24/7 quvvatlanish."
            )}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <Gauge className="h-5 w-5 text-indigo-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {t('1) IoT Узлы', '1) IoT tugunlari')}
                  </div>
                  <div className="text-xs text-white/60">
                    {t('Точность ±3%', 'Aniqilik ±3%')}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">
                {t(
                  'Емкостные датчики не окисляются в солончаке. Измеряют влажность и температуру на глубине корней.',
                  "Sig‘imli datchiklar sho‘r tuproqda korroziyaga uchramaydi. Ildiz chuqurligida namlik va haroratni o‘lchaydi."
                )}
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <Radio className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {t('2) LoRaWAN Сеть', '2) LoRaWAN tarmog‘i')}
                  </div>
                  <div className="text-xs text-white/60">
                    {t('Радиус до 10 км', '10 km gacha radius')}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">
                {t(
                  'Один шлюз покрывает всё хозяйство. Данные передаются на сервер даже из самых удаленных участков.',
                  "Bitta shlyuz butun xo‘jalikni qoplaydi. Ma’lumotlar hatto eng chekka uchastkalardan ham serverga yuboriladi."
                )}
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <Droplets className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {t('3) Аналитика и ИИ', '3) Tahlil va AI')}
                  </div>
                  <div className="text-xs text-white/60">
                    {t('FAO-56 стандарт', 'FAO-56 standarti')}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">
                {t(
                  'Алгоритмы рассчитывают эвапотранспирацию и дают точную рекомендацию: сколько часов поливать сегодня.',
                  "Algoritmlar namlik bug‘lanishini hisoblab, bugun necha soat sug‘orish kerakligi bo‘yicha aniq tavsiya beradi."
                )}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Regional Strategy */}
      <section className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold">
            {t('Адаптация под регионы Узбекистана', 'O‘zbekiston hududlariga moslashuv')}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-emerald-400">{t('Сырдарья', 'Sirdaryo')}</h3>
              <p className="text-sm text-white/70">
                {t(
                  'Борьба с вторичным засолением. Точный полив предотвращает подъем грунтовых вод и вымывание солей.',
                  "Ikkilamchi sho‘rlanishga qarshi kurash. Aniq sug‘orish sizot suvlarining ko‘tarilishini va sho‘r yuvilishini oldini oladi."
                )}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-indigo-400">{t('Джизак', 'Jizzax')}</h3>
              <p className="text-sm text-white/70">
                {t(
                  'Экономный полив в условиях острого дефицита воды. Максимальный урожай при минимальном расходе.',
                  "Suv tanqisligi sharoitida tejamkor sug‘orish. Minimal sarf bilan maksimal hosil olish."
                )}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-amber-400">{t('Ферганская долина', 'Farg‘ona vodiysi')}</h3>
              <p className="text-sm text-white/70">
                {t(
                  'Прецизионный полив для интенсивных садов с высокой плотностью посадки и теплиц.',
                  "Yuqori zichlikdagi intensiv bog‘lar va issiqxonalar uchun aniq (pretsizion) sug‘orish."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo charts */}
      <section id="demo" className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                {t(
                  'Экономика проекта и окупаемость',
                  'Loyiha iqtisodiyoti va o‘zini oqlashi'
                )}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                {t(
                  'Срок окупаемости системы составляет ~1.8 сезона за счет экономии ресурсов и роста урожайности.',
                  "Resurslarni tejash va hosildorlikni oshirish hisobiga tizim ~1.8 mavsumda o‘zini oqlaydi."
                )}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <div className="text-sm font-semibold">
                {t('Вода: до/после (м³ в неделю)', 'Suv: oldin/keyin (m³/hafta)')}
              </div>
              <div className="mt-1 text-xs text-white/60">
                {t('Реальные показатели с пилотных участков', 'Pilot maydonlaridan real ko‘rsatkichlar')}
              </div>

              <div className="mt-6 h-72">
                <ResponsiveContainer>
                  <BarChart
                    data={waterBeforeAfter}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="4 4" opacity={0.15} />
                    <XAxis
                      dataKey="week"
                      tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 12 }}
                    />
                    <YAxis
                      tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(10,12,20,0.95)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 14,
                        color: 'white',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="before" fill="#6366f1" name={t('До', 'Oldin')} />
                    <Bar dataKey="after" fill="#10b981" name={t('После', 'Keyin')} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 text-sm text-white/80">
                {t('Снижение затрат на полив:', "Sug‘orish xarajatlari kamayishi:")}{' '}
                <span className="font-semibold text-emerald-400">30%</span>
              </div>
            </Card>

            <Card>
              <div className="text-sm font-semibold">
                {t(
                  'График окупаемости (CAPEX $95/га)',
                  'Qoplash grafigi (CAPEX $95/ga)'
                )}
              </div>
              <div className="mt-1 text-xs text-white/60">
                {t(
                  'Сравнение стоимости установки и накопленной прибыли',
                  'O‘rnatish xarajati va to‘plangan foyda taqqoslanishi'
                )}
              </div>

              <div className="mt-6 h-72">
                <ResponsiveContainer>
                  <AreaChart
                    data={payback}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="4 4" opacity={0.15} />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 12 }}
                    />
                    <YAxis
                      tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(v: any, name: any) => [
                        `$${fmt.format(Number(v))}`,
                        name === 'revenue'
                          ? t('Прибыль (накоп.)', 'Foyda (jam)')
                          : t('Затраты (CAPEX)', 'Xarajatlar (CAPEX)'),
                      ]}
                      contentStyle={{
                        background: 'rgba(10,12,20,0.95)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 14,
                        color: 'white',
                      }}
                    />
                    <Legend />
                    <Area
                      dataKey="revenue"
                      name={t('Прибыль (накоп.)', 'Foyda (jam)')}
                      fill="#10b981"
                      fillOpacity={0.2}
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="cost"
                      name={t('Затраты (CAPEX)', 'Xarajatlar (CAPEX)')}
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p className="mt-6 text-sm text-white/70">
                {t(
                  'К концу второго сезона система полностью окупает затраты на оборудование и начинает приносить чистую прибыль.',
                  "Ikkinchi mavsum oxiriga kelib, tizim uskunalar xarajatlarini to‘liq qoplaydi va sof foyda keltirishni boshlaydi."
                )}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Offer */}
      <section className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold">{t('Модель сотрудничества', 'Hamkorlik modeli')}</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            {t(
              'Мы предлагаем гибкую HaaS (Hardware as a Service) модель для фермеров и кластеров.',
              "Biz fermerlar va klasterlar uchun moslashuvchan HaaS (uskuna xizmat sifatida) modelini taklif qilamiz."
            )}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <div className="text-sm font-semibold">{t('Вход', 'Kirish')}</div>
              <div className="mt-2 text-3xl font-semibold">{t('Бесплатно*', 'Bepul*')}</div>
              <div className="mt-2 text-xs text-white/50">{t('*Пилот на 2 недели', '*2 haftalik pilot')}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {t('Установка 1–2 узлов', '1–2 tugunni o‘rnatish')}
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {t('Доступ к Telegram-боту', 'Telegram-botga kirish')}
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {t('Обучение агронома', 'Agronomni o‘qitish')}
                </li>
              </ul>
            </Card>

            <Card className="border-indigo-500/50 bg-indigo-500/5 sm:col-span-2 lg:col-span-1">
              <div className="text-sm font-semibold text-indigo-300">{t('Сервис (HaaS)', 'Servis (HaaS)')}</div>
              <div className="mt-2 text-3xl font-semibold">
                100 000{' '}
                <span className="text-base font-semibold text-white/60">
                  {t('сум/га/мес', 'so‘m/ga/oy')}
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {t('Аналитика и рекомендации', 'Tahlil va tavsiyalar')}
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {t('Техническая поддержка 24/7', '24/7 texnik yordam')}
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {t('Замена оборудования за 3 дня', '3 kunda uskunani almashtirish')}
                </li>
              </ul>
            </Card>

            <Card>
              <div className="text-sm font-semibold">{t('Масштаб', 'Masshtab')}</div>
              <div className="mt-2 text-3xl font-semibold">Кластеры</div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {t('Своя LoRaWAN сеть', 'O‘z LoRaWAN tarmog‘i')}
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {t('Интеграция с 1С / Дашборды', '1S integratsiyasi / Dashbordlar')}
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {t('Индивидуальные тарифы', 'Individual tariflar')}
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <h3 className="text-xl font-semibold">
                {t('Запросить расчет экономии', 'Tejamkorlik hisobini so‘rash')}
              </h3>
              <p className="mt-2 text-sm text-white/70">
                {t(
                  'Оставьте данные о вашем хозяйстве — мы подготовим индивидуальное предложение с расчетом окупаемости для вашей культуры и региона.',
                  "Xo‘jaligingiz haqida ma’lumot qoldiring — biz sizning ekiningiz va hududingiz uchun o‘zini oqlash hisob-kitobi bilan individual taklif tayyorlaymiz."
                )}
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t('Бесплатный выезд', 'Bepul tashrif')}</div>
                    <div className="text-xs text-white/50">{t('Замер влажности и осмотр участка', 'Namlikni o‘lchash va maydonni ko‘zdan kechirish')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t('Индивидуальный ROI', 'Individual ROI')}</div>
                    <div className="text-xs text-white/50">{t('Расчет прибыли на 3 года вперед', '3 yillik foyda hisob-kitobi')}</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <form onSubmit={submitLead} className="space-y-4">
                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60">
                      {t('Ваше имя или Хозяйство', 'Ismingiz yoki Xo‘jalik nomi')}
                    </label>
                    <input
                      name="name"
                      required
                      placeholder={t('например, Кластер Агро', 'masalan, Klaster Agro')}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition-focus focus:border-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60">
                      {t('Номер телефона', 'Telefon raqami')}
                    </label>
                    <input
                      name="contact"
                      required
                      type="tel"
                      placeholder="+998"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition-focus focus:border-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/60">
                    {t('Регион и Площадь (га)', 'Hudud va Maydon (ga)')}
                  </label>
                  <input
                    name="region"
                    placeholder={t('например, Сырдарья, 50 га', 'masalan, Sirdaryo, 50 ga')}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition-focus focus:border-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/60">
                    {t('Комментарий / Культура', 'Izoh / Ekin turi')}
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder={t('какие культуры выращиваете?', 'qanday ekinlar ekasiz?')}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition-focus focus:border-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full rounded-2xl bg-white py-4 text-sm font-semibold text-[#070A12] transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-50"
                >
                  {status === 'loading'
                    ? t('Отправка...', 'Yuborilmoqda...')
                    : t('Получить расчет экономии', 'Tejamkorlik hisobini olish')}
                </button>

                {status === 'ok' && (
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-center text-sm font-medium text-emerald-400">
                      {t(
                        'Заявка принята! Теперь откройте наш Telegram бот для завершения регистрации и просмотра данных.',
                        "So'rov qabul qilindi! Endi ma'lumotlarni ko'rish va ro'yxatdan o'tishni yakunlash uchun Telegram botimizni oching."
                      )}
                    </p>
                    <a
                      href="https://t.me/AqlliDala_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#54a9eb] px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#4a96d1] active:scale-95"
                    >
                      <Send className="h-4 w-4" />
                      {t('ОТКРЫТЬ BOT', 'BOTNI OCHISH')}
                    </a>
                  </div>
                )}
                {status === 'error' && (
                  <p className="text-center text-sm font-medium text-rose-400">
                    {t('Ошибка. Хм, попробуйте еще раз?', 'Xatolik. Qaytadan urinib ko‘ring?')}
                  </p>
                )}
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#070A12]/50 py-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xl font-bold tracking-tight">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-500">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            Aqlli Dala
          </div>
          <p className="mt-4 text-xs text-white/40">
            © {new Date().getFullYear()} Aqlli Dala. {t('Сделано для фермеров Узбекистана.', "O‘zbekiston fermerlari uchun tayyorlandi.")}
          </p>
        </div>
      </footer>
    </div>
  );
}