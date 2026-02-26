'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';

type Lang = 'uz' | 'ru';

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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

export default function Page() {
  const [lang, setLang] = useState<Lang>('ru');
  const t = (ru: string, uz: string) => (lang === 'ru' ? ru : uz);

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
      waterBeforeAfter.reduce((s, x) => s + x.before, 0) / waterBeforeAfter.length;
    const avgAfter =
      waterBeforeAfter.reduce((s, x) => s + x.after, 0) / waterBeforeAfter.length;
    const savingPct = Math.round(((avgBefore - avgAfter) / avgBefore) * 100);

    return {
      savingPct,
      avgBefore: Math.round(avgBefore),
      avgAfter: Math.round(avgAfter),
    };
  }, [waterBeforeAfter]);

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
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
              <Droplets className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Aqlli Dala</div>
              <div className="text-xs text-white/60">
                {t('AgTech • Умный полив', 'AgTech • Aqlli sug‘orish')}
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Pill>
              <Radio className="h-3.5 w-3.5 text-cyan-300" />
              {t('LoRaWAN • без интернета', 'LoRaWAN • internet shartsiz')}
            </Pill>

            <div className="ml-2 flex rounded-full border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => setLang('ru')}
                className={cn(
                  'rounded-full px-3 py-1 text-xs',
                  lang === 'ru' ? 'bg-white/15' : 'text-white/70 hover:text-white'
                )}
              >
                RU
              </button>
              <button
                onClick={() => setLang('uz')}
                className={cn(
                  'rounded-full px-3 py-1 text-xs',
                  lang === 'uz' ? 'bg-white/15' : 'text-white/70 hover:text-white'
                )}
              >
                UZ
              </button>
            </div>

            <a
              href="#demo"
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#070A12] hover:bg-white/90"
            >
              {t('Посмотреть демо', "Demoni ko‘rish")}
              <ArrowRight className="h-4 w-4" />
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
                <Gauge className="h-3.5 w-3.5 text-indigo-300" />
                {t('Контроль влажности 20/40 см', 'Namlik nazorati 20/40 sm')}
              </Pill>
              <Pill>
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                {t('IP67 • для жары и пыли', 'IP67 • issiq va chang uchun')}
              </Pill>
              <Pill>
                <Clock className="h-3.5 w-3.5 text-amber-300" />
                {t('Уведомления в Telegram', 'Telegram ogohlantirishlari')}
              </Pill>
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              {t(
                'Экономьте воду и электричество — поливайте по данным, а не “на глаз”.',
                "Suv va elektrni tejang — “ko‘z bilan” emas, ma’lumot bilan sug‘oring."
              )}
            </h1>

            <p className="mt-5 max-w-xl text-base text-white/70">
              {t(
                'Aqlli Dala — автономные датчики влажности + LoRaWAN + Telegram-бот. Работает там, где нет связи. Дает простые решения: поливать / подождать.',
                "Aqlli Dala — avtonom namlik datchiklari + LoRaWAN + Telegram-bot. Aloqa bo‘lmagan joyda ham ishlaydi. Oddiy qaror: sug‘orish / kutish."
              )}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#070A12] hover:bg-white/90"
              >
                {t('Запросить пилот', 'Pilot so‘rash')}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#how"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                {t('Как это работает', 'Qanday ishlaydi')}
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="text-xs text-white/60">{t('Экономия воды', 'Suv tejalishi')}</div>
                <div className="mt-1 text-2xl font-semibold">{kpis.savingPct}%</div>
              </Card>
              <Card className="p-4">
                <div className="text-xs text-white/60">{t('До (ср.)', 'Oldin (o‘rt.)')}</div>
                <div className="mt-1 text-2xl font-semibold">{kpis.avgBefore}</div>
                <div className="text-xs text-white/50">{t('м³/нед', 'm³/hafta')}</div>
              </Card>
              <Card className="p-4">
                <div className="text-xs text-white/60">{t('После (ср.)', 'Keyin (o‘rt.)')}</div>
                <div className="mt-1 text-2xl font-semibold">{kpis.avgAfter}</div>
                <div className="text-xs text-white/50">{t('м³/нед', 'm³/hafta')}</div>
              </Card>
            </div>
          </div>

          {/* Right: Demo panel */}
          <Card className="h-fit">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{t('Демо: “Состояние поля”', 'Demo: “Maydon holati”')}</div>
                <div className="mt-1 text-xs text-white/60">
                  {t('Пример данных за день (20см и 40см)', "Kunlik misol (20sm va 40sm)")}
                </div>
              </div>
              <Pill>
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                {t('Онлайн', 'Onlayn')}
              </Pill>
            </div>

            <div className="mt-6 h-64 w-full">
              <ResponsiveContainer>
                <LineChart data={moisture} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" opacity={0.15} />
                  <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(10,12,20,0.95)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 14,
                      color: 'white',
                    }}
                  />
                  <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }} />
                  <Line type="monotone" dataKey="top20" name={t('Влажность 20см', 'Namlik 20sm')} stroke="#22d3ee" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="root40" name={t('Влажность 40см', 'Namlik 40sm')} stroke="#34d399" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="threshold" name={t('Порог', 'Chegara')} stroke="#fbbf24" strokeWidth={1} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Card className="p-4">
                <div className="text-xs text-white/60">{t('Статус', 'Holat')}</div>
                <div className="mt-1 text-sm font-semibold text-amber-200">
                  {t('Внимание', 'Diqqat')}
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-xs text-white/60">{t('Рекомендация', 'Tavsiya')}</div>
                <div className="mt-1 text-sm font-semibold">
                  {t('Полить 1–2 часа', "1–2 soat sug‘oring")}
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-xs text-white/60">{t('Канал', 'Kanal')}</div>
                <div className="mt-1 text-sm font-semibold">Telegram</div>
              </Card>
            </div>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold">{t('Как это работает', 'Qanday ishlaydi')}</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            {t(
              'Минимальный набор: датчик в земле → LoRaWAN-шлюз → сервер → уведомление в Telegram.',
              "Minimal to‘plam: datchik yerda → LoRaWAN shlyuz → server → Telegram xabari."
            )}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <Gauge className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{t('1) Датчики', '1) Datchiklar')}</div>
                  <div className="text-xs text-white/60">{t('Влажность/температура', "Namlik/harorat")}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">
                {t(
                  'Измеряем корневую зону (20–40 см), где “решается” урожай.',
                  "Ildiz zonasini o‘lchaymiz (20–40 sm) — hosil shu yerda hal bo‘ladi."
                )}
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <Radio className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{t('2) Связь LoRaWAN', '2) LoRaWAN aloqa')}</div>
                  <div className="text-xs text-white/60">{t('Работает без 3G/4G', "3G/4G siz ishlaydi")}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">
                {t(
                  'Один шлюз покрывает хозяйство. Датчики передают данные редко и экономно.',
                  "Bitta shlyuz xo‘jalikni qoplaydi. Datchiklar kam va tejamkor uzatadi."
                )}
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <Droplets className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{t('3) Решение и отчёт', '3) Qaror va hisobot')}</div>
                  <div className="text-xs text-white/60">{t('Поливать / ждать', "Sug‘orish / kutish")}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">
                {t(
                  'Telegram-бот даёт простую рекомендацию и выгружает отчёт “до/после”.',
                  "Telegram-bot oddiy tavsiya beradi va “oldin/keyin” hisobot chiqaradi."
                )}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo charts */}
      <section id="demo" className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                {t('Онлайн-демо: экономия и окупаемость', "Onlayn demo: tejalish va qaytish")}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                {t(
                  'Данные ниже демонстрационные. В пилоте вы будете показывать реальные цифры “насос/вода/графики влажности”.',
                  "Quyidagi ma’lumotlar demo. Pilotda real “nasos/suv/namlik grafigi” bo‘ladi."
                )}
              </p>
            </div>
            <Pill>
              <Leaf className="h-4 w-4 text-emerald-300" />
              {t('Подходит под ESG/гранты', 'ESG/grantlar uchun mos')}
            </Pill>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <div className="text-sm font-semibold">{t('Вода: до/после (м³ в неделю)', "Suv: oldin/keyin (m³/hafta)")}</div>
              <div className="mt-1 text-xs text-white/60">
                {t('Сравнение 4 недель', '4 haftalik taqqoslash')}
              </div>

              <div className="mt-6 h-72">
                <ResponsiveContainer>
                  <BarChart data={waterBeforeAfter} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" opacity={0.15} />
                    <XAxis dataKey="week" tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(10,12,20,0.95)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 14,
                        color: 'white',
                      }}
                    />
                    <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }} />
                    <Bar dataKey="before" name={t('До', 'Oldin')} fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="after" name={t('После', 'Keyin')} fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 text-sm text-white/80">
                {t('Средняя экономия:', 'O‘rtacha tejalish:')}{' '}
                <span className="font-semibold">{kpis.savingPct}%</span>
              </div>
            </Card>

            <Card>
              <div className="text-sm font-semibold">{t('Окупаемость (выручка vs. стоимость установки)', "Qaytish (tushum vs. o‘rnatish xarajati)")}</div>
              <div className="mt-1 text-xs text-white/60">
                {t('Демо для подписки ~ $8/мес/га и CAPEX ~ $90/га', 'Demo: ~ $8/oy/ga va CAPEX ~ $90/ga')}
              </div>

              <div className="mt-6 h-72">
                <ResponsiveContainer>
                  <AreaChart data={payback} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" opacity={0.15} />
                    <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 12 }} />
                    <Tooltip
                      formatter={(v: any, name: any) => [
                        `$${fmt.format(Number(v))}`,
                        name === 'revenue' ? t('Выручка (накоп.)', 'Tushum (jam)') : t('CAPEX', 'CAPEX'),
                      ]}
                      contentStyle={{
                        background: 'rgba(10,12,20,0.95)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 14,
                        color: 'white',
                      }}
                    />
                    <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }} />
                    <Area dataKey="revenue" name={t('Выручка (накоп.)', 'Tushum (jam)')} stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.15} strokeWidth={2} />
                    <Area dataKey="cost" name={t('CAPEX', 'CAPEX')} stroke="#f87171" fill="#f87171" fillOpacity={0.08} strokeWidth={2} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p className="mt-6 text-sm text-white/70">
                {t(
                  'Цель пилота — подтвердить экономию и снизить срок окупаемости за счёт сервисной модели и масштабирования.',
                  "Pilot maqsadi — tejalishni isbotlash va servis modeli hamda masshtablash orqali qaytishni tezlatish."
                )}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing / Offer */}
      <section className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold">{t('Оффер для пилота', 'Pilot uchun taklif')}</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            {t(
              'Ставим на 1–2 га, показываем цифры. Если пользы нет — забираем. Если есть — масштабируем.',
              "1–2 gektarga o‘rnatamiz, raqamlarni ko‘rsatamiz. Foyda bo‘lmasa — olib ketamiz. Bo‘lsa — kengaytiramiz."
            )}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <div className="text-sm font-semibold">{t('Старт', 'Start')}</div>
              <div className="mt-2 text-3xl font-semibold">{t('Пилот', 'Pilot')}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> {t('Установка 1–2 га', '1–2 ga o‘rnatish')}</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> {t('Telegram-бот', 'Telegram-bot')}</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> {t('Отчёт “до/после”', '“Oldin/keyin” hisobot')}</li>
              </ul>
            </Card>

            <Card>
              <div className="text-sm font-semibold">{t('Подписка', 'Obuna')}</div>
              <div className="mt-2 text-3xl font-semibold">
                100 000 <span className="text-base font-semibold text-white/60">{t('сум/га/мес', 'so‘m/ga/oy')}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> {t('Уведомления и графики', "Ogohlantirishlar va grafiklar")}</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> {t('Пороговые правила', "Chegaraviy qoidalar")}</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> {t('Поддержка/замена', "Qo‘llab-quvvatlash/almashtirish")}</li>
              </ul>
            </Card>

            <Card>
              <div className="text-sm font-semibold">{t('Интеграция', 'Integratsiya')}</div>
              <div className="mt-2 text-3xl font-semibold">{t('LoRaWAN', 'LoRaWAN')}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> {t('Работа без 3G/4G', '3G/4G siz ishlaydi')}</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> {t('Шлюз на хозяйство', 'Xo‘jalikka shlyuz')}</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> {t('Готово к масштабированию', 'Masshtabga tayyor')}</li>
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
              <h3 className="text-xl font-semibold">{t('Запросить пилот', 'Pilot so‘rash')}</h3>
              <p className="mt-2 text-sm text-white/70">
                {t(
                  'Оставьте контакты — мы вернемся с планом установки и списком данных для отчета.',
                  "Kontakt qoldiring — o‘rnatish reja va hisobot uchun ma’lumotlar ro‘yxati bilan qaytamiz."
                )}
              </p>

              {/* Это демо-форма без backend */}
              <form
                className="mt-6 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(t('Демо: подключите отправку через Formspree/Resend.', "Demo: Formspree/Resend orqali yuborishni ulang."));
                }}
              >
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/25"
                  placeholder={t('Имя / Хозяйство', "Ism / Xo‘jalik")}
                />
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/25"
                  placeholder={t('Телефон / Telegram', "Telefon / Telegram")}
                />
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/25"
                  placeholder={t('Регион (например: Сырдарья)', "Hudud (masalan: Sirdaryo)")}
                />
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#070A12] hover:bg-white/90">
                  {t('Отправить', 'Yuborish')}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <p className="mt-4 text-xs text-white/50">
                {t(
                  'Подключение формы: Formspree, Resend или API route в Next.js.',
                  "Forma ulash: Formspree, Resend yoki Next.js API route."
                )}
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold">{t('Что показать инвестору/партнеру', 'Investor/hamkorga nima ko‘rsatish')}</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                  {t('Графики влажности (20/40 см) и порог.', 'Namlik grafiklari (20/40 sm) va chegara.')}
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                  {t('Сравнение “до/после”: вода и часы насоса.', '“Oldin/keyin”: suv va nasos soatlari.')}
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                  {t('Окупаемость: подписка vs CAPEX и SLA на замену.', 'Qaytish: obuna vs CAPEX va SLA.')}
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                  {t('Фото/видео установки и отчет на 1 страницу.', 'O‘rnatish foto/video va 1 bet hisobot.')}
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs text-white/60">{t('Слоган', 'Slogan')}</div>
                <div className="mt-2 text-lg font-semibold">
                  {t(
                    '“Вода становится золотой. Мы помогаем поливать точно.”',
                    "“Suv oltindek qimmat. Biz aniq sug‘orishga yordam beramiz.”"
                  )}
                </div>
              </div>
            </Card>
          </div>

          <footer className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
            {t('© Aqlli Dala — demo landing (Vercel-ready)', '© Aqlli Dala — demo landing (Vercel-ready)')}
          </footer>
        </div>
      </section>
    </div>
  );
}