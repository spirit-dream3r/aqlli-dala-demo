'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Download, FileText, FileSpreadsheet, Calendar, ArrowLeft,
  Loader2, CheckCircle, AlertCircle, Droplets, TrendingUp
} from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

type FieldData = {
  field_name: string;
  crop_type: string;
  area_hectares: number;
  latitude?: number;
  longitude?: number;
};

type TelemetryStats = {
  avg_moisture: number;
  avg_temp: number;
  min_moisture: number;
  max_moisture: number;
  count: number;
};

export default function FieldReportPage() {
  const router = useRouter();
  const params = useParams();
  const fieldName = params.field_name as string;

  const [fieldData, setFieldData] = useState<FieldData | null>(null);
  const [stats, setStats] = useState<TelemetryStats | null>(null);
  const [days, setDays] = useState(7);
  const [format, setFormat] = useState<'pdf' | 'xlsx'>('pdf');
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFieldData();
  }, [fieldName]);

  const fetchFieldData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${BACKEND_URL}/api/fields/${fieldName}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setFieldData(data);
      }
    } catch (err) {
      setError('Не удалось загрузить данные поля');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(
        `${BACKEND_URL}/api/reports/${fieldName}/export?format=${format}&days=${days}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error('Ошибка при генерации отчета');
      }

      // Скачивание файла
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fieldName}_report_${days}d.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070A12] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070A12]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute -top-24 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute top-48 left-16 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[480px] w-[480px] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070A12]/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад
            </button>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <h1 className="text-sm font-semibold">Экспорт отчета</h1>
              <p className="text-xs text-white/60">{fieldName}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-6">
          {/* Field Info */}
          {fieldData && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Культура</div>
                <div className="mt-1 text-lg font-semibold">{fieldData.crop_type}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Площадь</div>
                <div className="mt-1 text-lg font-semibold">{fieldData.area_hectares} га</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Координаты</div>
                <div className="mt-1 text-sm font-semibold">
                  {fieldData.latitude?.toFixed(4)}, {fieldData.longitude?.toFixed(4)}
                </div>
              </div>
            </div>
          )}

          {/* Export Settings */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-4">Настройки экспорта</h2>

            <div className="space-y-4">
              {/* Period Selection */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Период отчета
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 7, 14, 30].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDays(d)}
                      className={cn(
                        'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                        days === d
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      )}
                    >
                      {d} {d === 1 ? 'день' : 'дней'}
                    </button>
                  ))}
                </div>
                <div className="mt-2">
                  <input
                    type="range"
                    min="1"
                    max="365"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/50 mt-1">
                    <span>1 день</span>
                    <span>{days} дней</span>
                    <span>365 дней</span>
                  </div>
                </div>
              </div>

              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <Download className="inline h-4 w-4 mr-2" />
                  Формат файла
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormat('pdf')}
                    className={cn(
                      'flex items-center justify-center gap-3 rounded-lg border p-4 transition-colors',
                      format === 'pdf'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                    )}
                  >
                    <FileText className="h-6 w-6" />
                    <div className="text-left">
                      <div className="text-sm font-semibold">PDF</div>
                      <div className="text-xs opacity-70">Для печати</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setFormat('xlsx')}
                    className={cn(
                      'flex items-center justify-center gap-3 rounded-lg border p-4 transition-colors',
                      format === 'xlsx'
                        ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                    )}
                  >
                    <FileSpreadsheet className="h-6 w-6" />
                    <div className="text-left">
                      <div className="text-sm font-semibold">Excel</div>
                      <div className="text-xs opacity-70">Для анализа</div>
                    </div>
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              {/* Export Button */}
              <button
                onClick={handleExport}
                disabled={exporting}
                className={cn(
                  'w-full rounded-xl bg-white px-6 py-4 text-sm font-semibold text-[#070A12] transition-all',
                  exporting
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:bg-white/90 active:scale-[0.98]'
                )}
              >
                {exporting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Генерация отчета...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Download className="h-5 w-5" />
                    Скачать отчет ({format.toUpperCase()})
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Preview Stats */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-4">Что будет в отчете</h2>
            
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-white/5 p-4 text-center">
                <Droplets className="h-6 w-6 mx-auto mb-2 text-emerald-400" />
                <div className="text-xs text-white/60">Влажность</div>
                <div className="text-sm font-semibold">20см / 40см</div>
              </div>
              
              <div className="rounded-lg bg-white/5 p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-amber-400" />
                <div className="text-xs text-white/60">Температура</div>
                <div className="text-sm font-semibold">°C</div>
              </div>
              
              <div className="rounded-lg bg-white/5 p-4 text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-indigo-400" />
                <div className="text-xs text-white/60">Период</div>
                <div className="text-sm font-semibold">{days} дней</div>
              </div>
              
              <div className="rounded-lg bg-white/5 p-4 text-center">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
                <div className="text-xs text-white/60">Записей</div>
                <div className="text-sm font-semibold">~{days * 24}</div>
              </div>
            </div>

            <div className="mt-4 text-xs text-white/50 text-center">
              Отчет включает данные телеметрии с почасовой разбивкой
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
