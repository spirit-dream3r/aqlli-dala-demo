'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, AreaChart, Area, BarChart, Bar, Legend,
} from 'recharts';
import {
  Droplets, Gauge, Leaf, Radio, ShieldCheck, Clock,
  ArrowRight, CheckCircle2, Send, Wifi, WifiOff, Server,
} from 'lucide-react';

// ==================== TYPES ====================
type Lang = 'uz' | 'ru';
type SubmitStatus = 'idle' | 'loading' | 'ok' | 'error' | 'conflict';
type DataMode = 'demo' | 'real';

type NewsItem = {
  tg_message_id: number;
  chat_id: number;
  title: string | null;
  text: string;
  media: string[];
  created_at: string;
};

type TelemetryData = {
  time: string;
  top20: number;
  root40: number;
  threshold: number;
};

// ==================== CONSTANTS ====================
const DEFAULT_BACKEND_URL = 'http://localhost:8000';
const DEMO_REFRESH_INTERVAL = 5000; // 5 seconds for demo mode
const NEWS_REFRESH_INTERVAL = 30000; // 30 seconds for news

// ==================== UTILS ====================
const fmt = new Intl.NumberFormat('ru-RU');

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

// ==================== UI COMPONENTS ====================
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
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

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80",
      className
    )}>
      {children}
    </span>
  );
}

function ModeToggle({ mode, onToggle }: { mode: DataMode; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
        mode === 'real'
          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
      )}
      title={mode === 'real' ? 'Режим: Реальные данные' : 'Режим: Демо-данные'}
    >
      {mode === 'real' ? (
        <>
          <Server className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Реальные данные</span>
          <span className="sm:hidden">Real</span>
        </>
      ) : (
        <>
          <Gauge className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Демо-режим</span>
          <span className="sm:hidden">Demo</span>
        </>
      )}
    </button>
  );
}

// ==================== MAIN COMPONENT ====================
export default function Page() {
  // ==================== STATE ====================
  const [lang, setLang] = useState<Lang>('ru');
  const t = useCallback((ru: string, uz: string) => (lang === 'ru' ? ru : uz), [lang]);

  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [statusMsg, setStatusMsg] = useState<string>('');
  
  // Backend URL - единый источник
  const [backendUrl] = useState<string>(
    typeof window !== 'undefined'
      ? (process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND_URL)
      : DEFAULT_BACKEND_URL
  );

  // Data mode: demo or real
  const [dataMode, setDataMode] = useState<DataMode>('demo');
  const [realTelemetry, setRealTelemetry] = useState<TelemetryData[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'loading'>('loading');

  // News state
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    region: '',
    message: ''
  });

  // ==================== DEMO DATA ====================
  const generateDemoData = useCallback((): TelemetryData[] => {
    const baseTime = new Date();
    const times = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
    
    // Генерируем данные с небольшим случайным изменением
    const randomVariation = (base: number, variance: number) => 
      base + (Math.random() - 0.5) * variance;

    return times.map((time, idx) => ({
      time,
      top20: Math.round(randomVariation(26 - idx * 1.2, 3)),
      root40: Math.round(randomVariation(34 - idx * 0.8, 2)),
      threshold: 25
    }));
  }, []);

  const moisture = useMemo(() => {
    if (dataMode === 'demo') {
      return generateDemoData();
    }
    return realTelemetry.length > 0 ? realTelemetry : generateDemoData();
  }, [dataMode, realTelemetry, generateDemoData]);

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
    const avgBefore = waterBeforeAfter.reduce((s, x) => s + x.before, 0) / waterBeforeAfter.length;
    const avgAfter = waterBeforeAfter.reduce((s, x) => s + x.after, 0) / waterBeforeAfter.length;
    const savingPct = Math.round(((avgBefore - avgAfter) / avgBefore) * 100);

    return {
      savingPct,
      avgBefore: Math.round(avgBefore),
      avgAfter: Math.round(avgAfter),
    };
  }, [waterBeforeAfter]);

  // ==================== EFFECTS ====================
  
  // Fetch news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setNewsLoading(true);
        const res = await fetch(`${backendUrl}/api/news?limit=6`);
        const json = await res.json();
        if (json.ok && Array.isArray(json.news)) {
          setNews(json.news);
          setNewsError('');
        } else {
          setNewsError(lang === 'ru' ? 'Не удалось загрузить новости' : "Yangiliklarni yuklab bo'lmadi");
        }
      } catch (err: any) {
        setNewsError(lang === 'ru' ? 'Ошибка подключения' : "Ulanish xatoligi");
        console.error('Failed to fetch news:', err);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, NEWS_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [backendUrl, lang]);

  // Fetch real telemetry in real mode
  useEffect(() => {
    if (dataMode !== 'real') return;

    const fetchTelemetry = async () => {
      try {
        setConnectionStatus('loading');
        const res = await fetch(`${backendUrl}/api/telemetry/field1/history?hours=24&limit=8`);
        if (!res.ok) throw new Error('Failed to fetch');
        
        const json = await res.json();
        if (json.data && Array.isArray(json.data)) {
          const formatted = json.data.map((item: any) => ({
            time: new Date(item.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
            top20: item.moisture - 5 + Math.round(Math.random() * 4),
            root40: item.moisture,
            threshold: 25
          }));
          setRealTelemetry(formatted);
          setConnectionStatus('connected');
        }
      } catch (err) {
        console.error('Failed to fetch telemetry:', err);
        setConnectionStatus('disconnected');
        // Fallback to demo on error
        setDataMode('demo');
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, DEMO_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [dataMode, backendUrl]);

  // ==================== HANDLERS ====================
  const handleToggleMode = useCallback(() => {
    setDataMode(prev => prev === 'demo' ? 'real' : 'demo');
  }, []);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  async function submitLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // Honeypot check
    const form = e.currentTarget;
    const hp = String((form as any).company?.value ?? '').trim();
    if (hp) {
      setStatus('ok');
      setStatusMsg(lang === 'ru' ? 'Заявка отправлена ✅' : "So'rov yuborildi ✅");
      form.reset();
      return;
    }

    const payload = {
      name: formData.name.trim(),
      contact: formData.contact.trim(),
      region: formData.region.trim(),
      message: formData.message.trim(),
    };

    // Validation
    if (!payload.name || !payload.contact) {
      setStatus('error');
      setStatusMsg(lang === 'ru' ? 'Заполните обязательные поля' : "Majburiy maydonlarni to'ldiring");
      return;
    }

    setStatus('loading');
    setStatusMsg('');

    try {
      const res = await fetch(`${backendUrl}/api/lead`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json: any = await res.json().catch(() => ({}));

      if (!res.ok || !json?.ok) {
        if (res.status === 429) {
          setStatus('error');
          setStatusMsg(
            lang === 'ru' 
              ? `Слишком много запросов. Повторите через ${json?.detail?.retry_after || 60}с`
              : "Juda ko'p so'rovlar. Birozdan keyin qayta urinib ko'ring"
          );
          return;
        }
        
        setStatus('error');
        const msg = (typeof json?.error === 'string' && json.error) || 
                   (lang === 'ru' ? 'Ошибка отправки' : "Yuborishda xatolik");
        setStatusMsg(msg);
        return;
      }

      setStatus('ok');
      setStatusMsg(lang === 'ru' ? 'Заявка отправлена ✅' : "So'rov yuborildi ✅");
      form.reset();
      setFormData({ name: '', contact: '', region: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setStatusMsg(err?.message ?? (lang === 'ru' ? 'Сеть недоступна' : 'Tarmoq mavjud emas'));
    }
  }

  // ==================== RENDER ====================
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
                {t('AgTech • Умный полив', "AgTex • Aqlli sug'orish")}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Pill className="hidden sm:inline-flex">
              <Radio className="h-3.5 w-3.5 text-cyan-300" />
              {t('LoRaWAN • без интернета', 'LoRaWAN • internetsiz')}
            </Pill>

            <ModeToggle mode={dataMode} onToggle={handleToggleMode} />

            {dataMode === 'real' && (
              <Pill className={cn(
                connectionStatus === 'connected' ? 'text-emerald-400' :
                connectionStatus === 'disconnected' ? 'text-red-400' : 'text-amber-400'
              )}>
                {connectionStatus === 'connected' ? (
                  <Wifi className="h-3.5 w-3.5" />
                ) : connectionStatus === 'disconnected' ? (
                  <WifiOff className="h-3.5 w-3.5" />
                ) : (
                  <Clock className="h-3.5 w-3.5 animate-pulse" />
                )}
                <span className="hidden sm:inline">
                  {connectionStatus === 'connected' ? t('Подключено', 'Ulangan') :
                   connectionStatus === 'disconnected' ? t('Нет связи', "Aloqa yo'q") :
                   t('Подключение...', 'Ulanish')}
                </span>
              </Pill>
            )}

            <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
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
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[#070A12] transition-transform hover:bg-white/90 active:scale-95 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs"
            >
              <span className="hidden xs:inline">{t('Посмотреть демо', "Demoni ko'rish")}</span>
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
                <span className="text-[10px] sm:text-xs">
                  {t('Контроль влажности 20/40 см', 'Namlik nazorati 20/40 sm')}
                </span>
              </Pill>
              <Pill>
                <ShieldCheck className="h-3 w-3 text-emerald-300 sm:h-3.5 sm:w-3.5" />
                <span className="text-[10px] sm:text-xs">
                  {t('IP67 • Энергонезависимость', 'IP67 • Avtonom ishlash')}
                </span>
              </Pill>
              <Pill>
                <Clock className="h-3 w-3 text-amber-300 sm:h-3.5 sm:w-3.5" />
                <span className="text-[10px] sm:text-xs">
                  {t('Уведомления в Telegram', 'Telegram ogohlantirishlari')}
                </span>
              </Pill>
            </div>

            <h1 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              {t(
                'Экономьте 30% воды и 25% электричества — поливайте по данным.',
                "30% suv va 25% elektr energiyasini tejang — ma'lumotlar asosida sug'oring."
              )}
            </h1>

            <p className="mt-5 max-w-xl text-base text-white/70">
              {t(
                'Aqlli Dala — IoT-датчики влажности + LoRaWAN + ИИ-аналитика. Работает там, где нет 3G/4G. Увеличиваем урожайность на 15% за счет точного полива.',
                "Aqlli Dala — IoT namlik datchiklari + LoRaWAN + AI tahlili. 3G/4G yo'q joylarda ham ishlaydi. To'g'ri sug'orish orqali hosildorlikni 15% ga oshiramiz."
              )}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-[#070A12] transition-transform hover:bg-white/90 active:scale-95"
              >
                {t('Запросить пилот', "Pilot so'rash")}
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
                <div className="text-xs text-white/60">{t('Экономия воды', 'Suv tejalishi')}</div>
                <div className="mt-1 text-2xl font-bold text-emerald-400 xs:text-white">30%</div>
              </Card>
              <Card className="flex items-center justify-between p-4 xs:block">
                <div className="text-xs text-white/60">{t('Электричество', 'Elektr energiya')}</div>
                <div className="mt-1 text-2xl font-bold text-indigo-400 xs:text-white">25%</div>
              </Card>
              <Card className="flex items-center justify-between p-4 xs:block">
                <div className="text-xs text-white/60">{t('Урожайность', 'Hosildorlik')}</div>
                <div className="mt-1 text-2xl font-bold text-amber-400 xs:text-white">+15%</div>
              </Card>
            </div>
          </div>

          {/* Demo panel */}
          <Card className="h-fit">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">
                  {t('Контроль корневой зоны', 'Ildiz zonasi nazorati')}
                </div>
                <div className="mt-1 text-xs text-white/60">
                  {dataMode === 'demo' 
                    ? t('Демо-данные (обновляется каждые 5с)', "Demo ma'lumotlar (har 5s yangilanadi)")
                    : t('Реальные данные с датчиков', 'Datchiklardan real ma\'lumotlar')
                  }
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
                    stroke="#6366f1"
                  />
                  <Line
                    type="monotone"
                    dataKey="root40"
                    name={t('Влажность 40см', 'Namlik 40sm')}
                    strokeWidth={2}
                    dot={false}
                    stroke="#10b981"
                  />
                  <Line
                    type="monotone"
                    dataKey="threshold"
                    name={t('Порог', 'Chegara')}
                    strokeWidth={1}
                    dot={false}
                    strokeDasharray="5 5"
                    stroke="#f59e0b"
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
                <div className="text-xs text-white/60">{t('Рекомендация', 'Tavsiya')}</div>
                <div className="mt-1 text-sm font-semibold">
                  {t('Полив не требуется', "Sug'orish shart emas")}
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
            {t('Технология "Aqlli Dala"', '"Aqlli Dala" texnologiyasi')}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            {t(
              'Датчики ESP32-S3 + LoRa SX1262. Передача данных до 10 км без мобильной связи. Питание от солнечных панелей 24/7.',
              "ESP32-S3 + LoRa SX1262 datchiklari. Mobil aloqasiz 10 km gacha ma'lumot uzatish. Quyosh panellari orqali 24/7 quvvatlanish."
            )}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <Gauge className="h-5 w-5 text-indigo-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{t('1) IoT Узлы', '1) IoT tugunlari')}</div>
                  <div className="text-xs text-white/60">{t('Точность ±3%', 'Aniqlik ±3%')}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">
                {t(
                  'Емкостные датчики не окисляются в солончаке. Измеряют влажность и температуру на глубине корней.',
                  "Sig'imli datchiklar sho'r tuproqda korroziyaga uchramaydi. Ildiz chuqurligida namlik va haroratni o'lchaydi."
                )}
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <Radio className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{t('2) LoRaWAN Сеть', "2) LoRaWAN tarmog'i")}</div>
                  <div className="text-xs text-white/60">{t('Радиус до 10 км', '10 km gacha radius')}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">
                {t(
                  'Один шлюз покрывает всё хозяйство. Данные передаются на сервер даже из самых удаленных участков.',
                  "Bitta shlyuz butun xo'jalikni qoplaydi. Ma'lumotlar hatto eng chekka uchastkalardan ham serverga yuboriladi."
                )}
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <Droplets className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{t('3) Аналитика и ИИ', '3) Tahlil va AI')}</div>
                  <div className="text-xs text-white/60">{t('FAO-56 стандарт', 'FAO-56 standarti')}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">
                {t(
                  'Алгоритмы рассчитывают эвапотранспирацию и дают точную рекомендацию: сколько часов поливать сегодня.',
                  "Algoritmlar namlik bug'lanishini hisoblab, bugun necha soat sug'orish kerakligi bo'yicha aniq tavsiya beradi."
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
            {t('Адаптация под регионы Узбекистана', "O'zbekiston hududlariga moslashuv")}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-emerald-400">{t('Сырдарья', 'Sirdaryo')}</h3>
              <p className="text-sm text-white/70">
                {t(
                  'Борьба с вторичным засолением. Точный полив предотвращает подъем грунтовых вод и вымывание солей.',
                  "Ikkilamchi sho'rlanishga qarshi kurash. Aniq sug'orish sizot suvlarining ko'tarilishini va sho'r yuvilishini oldini oladi."
                )}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-indigo-400">{t('Джизак', 'Jizzax')}</h3>
              <p className="text-sm text-white/70">
                {t(
                  'Экономный полив в условиях острого дефицита воды. Максимальный урожай при минимальном расходе.',
                  "Suv tanqisligi sharoitida tejamkor sug'orish. Minimal sarf bilan maksimal hosil olish."
                )}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-amber-400">{t('Ферганская долина', "Farg'ona vodiysi")}</h3>
              <p className="text-sm text-white/70">
                {t(
                  'Прецизионный полив для интенсивных садов с высокой плотностью посадки и теплиц.',
                  "Yuqori zichlikdagi intensiv bog'lar va issiqxonalar uchun aniq (pretsizion) sug'orish."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo charts - Economics */}
      <section id="demo" className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                {t('Экономика проекта и окупаемость', "Loyiha iqtisodiyoti va o'zini oqlashi")}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                {t(
                  'Срок окупаемости системы составляет ~1.8 сезона за счет экономии ресурсов и роста урожайности.',
                  "Resurslarni tejash va hosildorlikni oshirish hisobiga tizim ~1.8 mavsumda o'zini oqlaydi."
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
                {t('Реальные показатели с пилотных участков', "Pilot maydonlaridan real ko'rsatkichlar")}
              </div>

              <div className="mt-6 h-72">
                <ResponsiveContainer>
                  <BarChart data={waterBeforeAfter}>
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
                    <Legend />
                    <Bar dataKey="before" fill="#6366f1" name={t('До', 'Oldin')} />
                    <Bar dataKey="after" fill="#10b981" name={t('После', 'Keyin')} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-white/60">{t('Средний до', "O'rtacha oldin")}</div>
                  <div className="text-lg font-bold text-indigo-400">{fmt.format(kpis.avgBefore)} м³</div>
                </div>
                <div>
                  <div className="text-xs text-white/60">{t('Средний после', "O'rtacha keyin")}</div>
                  <div className="text-lg font-bold text-emerald-400">{fmt.format(kpis.avgAfter)} м³</div>
                </div>
                <div>
                  <div className="text-xs text-white/60">{t('Экономия', 'Tejalish')}</div>
                  <div className="text-lg font-bold text-amber-400">-{kpis.savingPct}%</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-sm font-semibold">
                {t('Окупаемость инвестиций (ROI)', "Investitsiya o'zini oqlashi (ROI)")}
              </div>
              <div className="mt-1 text-xs text-white/60">
                {t('Накопленный доход vs Стоимость системы', "To'plangan daromad vs Tizim narxi")}
              </div>

              <div className="mt-6 h-72">
                <ResponsiveContainer>
                  <AreaChart data={payback}>
                    <CartesianGrid strokeDasharray="4 4" opacity={0.15} />
                    <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(10,12,20,0.95)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 14,
                        color: 'white',
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name={t('Накопленный доход', "To'plangan daromad")}
                      stroke="#10b981"
                      fill="#10b981/20"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="cost"
                      name={t('Стоимость системы', 'Tizim narxi')}
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 text-center">
                <div className="text-xs text-white/60">{t('Точка безубыточности', 'Bezararlik nuqtasi')}</div>
                <div className="text-2xl font-bold text-emerald-400">~18 {t('месяцев', 'oy')}</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold">
            {t('Новости и обновления', 'Yangiliklar va yangilanishlar')}
          </h2>
          <p className="mt-2 text-sm text-white/70">
            {t('Последние обновления из нашего Telegram канала', "Telegram kanalimizdan so'nggi yangiliklar")}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {newsLoading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-4 w-3/4 rounded bg-white/10" />
                  <div className="mt-3 h-3 w-full rounded bg-white/10" />
                  <div className="mt-2 h-3 w-2/3 rounded bg-white/10" />
                </Card>
              ))
            ) : newsError ? (
              <Card className="md:col-span-2 lg:col-span-3">
                <div className="text-center text-white/60">{newsError}</div>
              </Card>
            ) : news.length === 0 ? (
              <Card className="md:col-span-2 lg:col-span-3">
                <div className="text-center text-white/60">
                  {t('Нет новостей', "Yangiliklar yo'q")}
                </div>
              </Card>
            ) : (
              news.map((item) => (
                <Card key={item.tg_message_id} className="h-full">
                  {item.media?.[0] && (
                    <img
                      src={`${backendUrl}${item.media[0]}`}
                      alt={item.title || 'News image'}
                      className="h-40 w-full rounded-lg object-cover"
                    />
                  )}
                  <h3 className="mt-3 text-lg font-semibold">
                    {item.title || item.text.slice(0, 50) + '...'}
                  </h3>
                  <p className="mt-2 text-sm text-white/70 line-clamp-3">
                    {item.text}
                  </p>
                  <div className="mt-3 text-xs text-white/50">
                    {new Date(item.created_at).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'uz-UZ')}
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold">
              {t('Запросить пилотный проект', "Pilot loyihani so'rash")}
            </h2>
            <p className="mt-2 text-sm text-white/70">
              {t(
                'Оставьте заявку — мы свяжемся с вами и обсудим детали.',
                "So'rov qoldiring — biz siz bilan bog'lanib, tafsilotlarni muhokama qilamiz."
              )}
            </p>
          </div>

          <Card className="mx-auto mt-8 max-w-2xl">
            <form onSubmit={submitLead} className="space-y-4">
              {/* Honeypot field (hidden) */}
              <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80">
                    {t('Имя / Название хозяйства', "Ism / Xo'jalik nomi")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder={t('Иван Иванов', 'Ivan Ivanov')}
                  />
                </div>

                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-white/80">
                    {t('Контакт (телефон/email)', 'Aloqa (telefon/email)')} *
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="region" className="block text-sm font-medium text-white/80">
                  {t('Регион', 'Viloyat')}
                </label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">-- {t('Выберите регион', 'Viloyatni tanlang')} --</option>
                  <option value="Tashkent">Toshkent</option>
                  <option value="Syrdarya">Sirdaryo</option>
                  <option value="Jizzakh">Jizzax</option>
                  <option value="Fergana">Farg'ona</option>
                  <option value="Namangan">Namangan</option>
                  <option value="Andijan">Andijon</option>
                  <option value="Samarkand">Samarqand</option>
                  <option value="Bukhara">Buxoro</option>
                  <option value="Khorezm">Xorazm</option>
                  <option value="Karakalpakstan">Qoraqalpog'iston</option>
                  <option value="Navoi">Navoiy</option>
                  <option value="Kashkadarya">Qashqadaryo</option>
                  <option value="Surkhandarya">Surxondaryo</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80">
                  {t('Комментарий', 'Izoh')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder={t('Расскажите о вашем хозяйстве...', "Xo'jaligingiz haqida gapiring...")}
                />
              </div>

              {statusMsg && (
                <div
                  className={cn(
                    'rounded-lg p-3 text-sm',
                    status === 'ok' ? 'bg-emerald-500/20 text-emerald-300' :
                    status === 'error' ? 'bg-red-500/20 text-red-300' :
                    'bg-amber-500/20 text-amber-300'
                  )}
                >
                  {statusMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className={cn(
                  'w-full rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#070A12] transition-all',
                  status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white/90 active:scale-[0.98]'
                )}
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4 animate-spin" />
                    {t('Отправка...', 'Yuborilmoqda...')}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" />
                    {t('Отправить заявку', "So'rov yuborish")}
                  </span>
                )}
              </button>

              <p className="text-xs text-white/50 text-center">
                {t('Нажимая кнопку, вы соглашаетесь с обработкой персональных данных',
                   "Tugmani bosish orqali siz shaxsiy ma'lumotlarni qayta ishlashga rozilik bildirasiz")}
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/10">
                <Droplets className="h-4 w-4" />
              </div>
              <div className="text-sm font-semibold">Aqlli Dala</div>
            </div>

            <div className="text-xs text-white/50">
              © {new Date().getFullYear()} Aqlli Dala. {t('Все права защищены', 'Barcha huquqlar himoyalangan')}
            </div>

            <div className="flex gap-4">
              <a href="#" className="text-xs text-white/50 hover:text-white">Telegram</a>
              <a href="#" className="text-xs text-white/50 hover:text-white">Instagram</a>
              <a href="#" className="text-xs text-white/50 hover:text-white">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
