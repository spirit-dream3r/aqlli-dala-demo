'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  MapPin, Droplets, TrendingUp, ArrowLeft, Loader2,
  Plus, Filter, Search
} from 'lucide-react';

// Динамический импорт карты (для client-side only)
const FieldsMap = dynamic(() => import('@/components/fields-map'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full bg-white/5 rounded-2xl flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      <span className="ml-3 text-white/60">Загрузка карты...</span>
    </div>
  ),
});

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

type FieldLocation = {
  id: number;
  field_name: string;
  crop_type: string;
  area_hectares: number;
  latitude: number;
  longitude: number;
  moisture?: number;
  status?: 'optimal' | 'warning' | 'critical';
};

export default function FieldsMapPage() {
  const router = useRouter();
  const [fields, setFields] = useState<FieldLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState<FieldLocation | null>(null);
  const [filter, setFilter] = useState<'all' | 'optimal' | 'warning' | 'critical'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchFields = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${BACKEND_URL}/api/fields`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        
        // Fetch telemetry for each field
        const fieldsWithTelemetry = await Promise.all(
          data.map(async (field: any) => {
            try {
              const telemRes = await fetch(
                `${BACKEND_URL}/api/telemetry/${field.field_name}`,
                {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                }
              );
              
              if (telemRes.ok) {
                const telemetry = await telemRes.json();
                return {
                  ...field,
                  moisture: telemetry.moisture,
                  status: getMoistureStatus(telemetry.moisture),
                };
              }
            } catch (e) {
              console.error('Failed to fetch telemetry:', e);
            }
            return field;
          })
        );
        
        setFields(fieldsWithTelemetry);
      }
    } catch (err) {
      console.error('Failed to fetch fields:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

  const getMoistureStatus = (moisture?: number): 'optimal' | 'warning' | 'critical' => {
    if (moisture === undefined) return 'warning';
    if (moisture >= 25) return 'optimal';
    if (moisture >= 15) return 'warning';
    return 'critical';
  };

  const handleFieldClick = (field: FieldLocation) => {
    setSelectedField(field);
  };

  // Filter fields
  const filteredFields = fields.filter((field) => {
    const matchesFilter = filter === 'all' || field.status === filter;
    const matchesSearch = field.field_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         field.crop_type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate center from fields
  const getMapCenter = (): [number, number] => {
    if (fields.length === 0) return [41.3115, 69.2401]; // Tashkent
    
    const avgLat = fields.reduce((sum, f) => sum + f.latitude, 0) / fields.length;
    const avgLon = fields.reduce((sum, f) => sum + f.longitude, 0) / fields.length;
    
    return [avgLat, avgLon];
  };

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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
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
              <h1 className="text-sm font-semibold">Карта полей</h1>
              <p className="text-xs text-white/60">Мониторинг местоположения</p>
            </div>
          </div>

          <a
            href="/dashboard/fields/new"
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#070A12] hover:bg-white/90"
          >
            <Plus className="h-4 w-4" />
            Добавить поле
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="relative mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search & Filter */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Поиск поля..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                {(['all', 'optimal', 'warning', 'critical'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      'flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                      filter === f
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    )}
                  >
                    {f === 'all' ? 'Все' : 
                     f === 'optimal' ? '✓' :
                     f === 'warning' ? '!' : '✕'}
                  </button>
                ))}
              </div>
            </div>

            {/* Fields List */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 max-h-[calc(100vh-300px)] overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold">
                  Поля ({filteredFields.length})
                </h2>
                <Filter className="h-4 w-4 text-white/40" />
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-emerald-400" />
                  <p className="text-xs text-white/60 mt-2">Загрузка...</p>
                </div>
              ) : filteredFields.length === 0 ? (
                <div className="text-center py-8 text-white/60 text-sm">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  Нет полей
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFields.map((field) => (
                    <button
                      key={field.id}
                      onClick={() => handleFieldClick(field)}
                      className={cn(
                        'w-full text-left rounded-lg p-3 transition-colors',
                        selectedField?.id === field.id
                          ? 'bg-white/10 border border-emerald-500/50'
                          : 'bg-white/5 hover:bg-white/10'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-sm">{field.field_name}</div>
                          <div className="text-xs text-white/60">{field.crop_type}</div>
                        </div>
                        <div className={cn(
                          'w-2 h-2 rounded-full',
                          field.status === 'optimal' && 'bg-emerald-500',
                          field.status === 'warning' && 'bg-amber-500',
                          field.status === 'critical' && 'bg-red-500',
                        )}></div>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-xs text-white/70">
                        <span className="flex items-center gap-1">
                          <Droplets className="h-3 w-3" />
                          {field.moisture !== undefined ? `${field.moisture}%` : '—'}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {field.area_hectares} га
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="h-[600px] w-full bg-white/5 rounded-2xl flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
                <span className="ml-3 text-white/60">Загрузка карты...</span>
              </div>
            ) : (
              <FieldsMap
                fields={filteredFields}
                center={getMapCenter()}
                zoom={8}
                onFieldClick={handleFieldClick}
                height="h-[600px]"
                showControls={true}
              />
            )}

            {/* Selected Field Info */}
            {selectedField && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{selectedField.field_name}</h2>
                    <p className="text-sm text-white/60 mt-1">{selectedField.crop_type}</p>
                  </div>
                  <button
                    onClick={() => router.push(`/dashboard/fields/${selectedField.field_name}`)}
                    className="text-sm text-emerald-400 hover:text-emerald-300"
                  >
                    Подробнее →
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-white/5 p-3">
                    <div className="text-xs text-white/60">Влажность</div>
                    <div className="mt-1 text-lg font-semibold">
                      {selectedField.moisture !== undefined ? `${selectedField.moisture}%` : '—'}
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3">
                    <div className="text-xs text-white/60">Площадь</div>
                    <div className="mt-1 text-lg font-semibold">{selectedField.area_hectares} га</div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3">
                    <div className="text-xs text-white/60">Широта</div>
                    <div className="mt-1 text-lg font-semibold">{selectedField.latitude.toFixed(4)}</div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3">
                    <div className="text-xs text-white/60">Долгота</div>
                    <div className="mt-1 text-lg font-semibold">{selectedField.longitude.toFixed(4)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
