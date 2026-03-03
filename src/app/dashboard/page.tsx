'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  User, LogOut, Settings, Droplets, MapPin, TrendingUp,
  Bell, CheckCircle, AlertCircle, Loader2, Eye, EyeOff
} from 'lucide-react';

// ==================== TYPES ====================
type UserProfile = {
  id: number;
  full_name: string;
  phone_number: string;
  telegram_id?: number;
  language: string;
  is_verified: boolean;
};

type Field = {
  id: number;
  field_name: string;
  crop_type: string;
  moisture_threshold: number;
  area_hectares: number;
  latest_moisture?: number;
  latest_temperature?: number;
};

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

// ==================== CONSTANTS ====================
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

// ==================== UTILS ====================
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur', className)}>
      {children}
    </div>
  );
}

// ==================== LOGIN FORM ====================
function LoginForm({ onLogin }: { onLogin: (tokens: any) => void }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail?.message || 'Ошибка входа');
      }

      // Сохранение токенов
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      onLogin(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10">
            <User className="h-6 w-6" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold">Вход в кабинет</h2>
        <p className="text-sm text-white/60 mt-2">
          Войдите для управления полями
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Номер телефона
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+998 90 123 45 67"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Пароль
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={cn(
            'w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#070A12] transition-all',
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white/90 active:scale-[0.98]'
          )}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Вход...
            </span>
          ) : (
            'Войти'
          )}
        </button>

        <p className="text-xs text-white/50 text-center">
          Нет аккаунта?{' '}
          <a href="/dashboard/register" className="text-emerald-400 hover:text-emerald-300">
            Зарегистрироваться
          </a>
        </p>
      </form>
    </Card>
  );
}

// ==================== DASHBOARD ====================
function Dashboard({ tokens }: { tokens: any }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/profile/me`, {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setProfile(data.user);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  }, [tokens.access_token]);

  const fetchFields = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/fields`, {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setFields(data);
      }
    } catch (err) {
      console.error('Failed to fetch fields:', err);
    } finally {
      setLoading(false);
    }
  }, [tokens.access_token]);

  useEffect(() => {
    fetchProfile();
    fetchFields();
  }, [fetchProfile, fetchFields]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/dashboard');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Здравствуйте, {profile?.full_name || 'Фермер'}! 👋
          </h1>
          <p className="text-sm text-white/60 mt-1">
            {profile?.phone_number}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Выход
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/20">
              <Droplets className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs text-white/60">Полей</div>
              <div className="text-2xl font-bold">{fields.length}</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/20">
              <MapPin className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <div className="text-xs text-white/60">Площадь</div>
              <div className="text-2xl font-bold">
                {fields.reduce((sum, f) => sum + (f.area_hectares || 1), 0).toFixed(1)} га
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20">
              <TrendingUp className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xs text-white/60">Статус</div>
              <div className="text-sm font-semibold text-emerald-400">
                {profile?.is_verified ? '✓ Проверен' : '○ Не проверен'}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Fields List */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Мои поля</h2>
          <a
            href="/dashboard/fields/new"
            className="text-sm text-emerald-400 hover:text-emerald-300"
          >
            + Добавить поле
          </a>
        </div>

        {loading ? (
          <div className="text-center text-white/60 py-8">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            Загрузка...
          </div>
        ) : fields.length === 0 ? (
          <div className="text-center text-white/60 py-8">
            <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>У вас пока нет полей</p>
            <a
              href="/dashboard/fields/new"
              className="text-emerald-400 hover:text-emerald-300 text-sm mt-2 inline-block"
            >
              Добавить первое поле →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{field.field_name}</h3>
                    <p className="text-sm text-white/60 mt-1">{field.crop_type}</p>
                  </div>
                  <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">
                    {field.area_hectares} га
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-white/70">
                    <Droplets className="h-3.5 w-3.5" />
                    {field.latest_moisture !== undefined ? `${field.latest_moisture}%` : '—'}
                  </div>
                  <div className="flex items-center gap-1 text-white/70">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {field.latest_temperature !== undefined ? `${field.latest_temperature}°C` : '—'}
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <a
                    href={`/dashboard/fields/${field.field_name}`}
                    className="flex-1 text-center text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Подробнее
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Notifications */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-amber-400" />
          <h2 className="text-lg font-semibold">Уведомления</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 text-sm">
            <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
            <div>
              <p className="text-white/80">Система работает нормально</p>
              <p className="text-white/50 text-xs mt-1">Все датчики онлайн</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ==================== MAIN PAGE ====================
export default function DashboardPage() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
  const [tokens, setTokens] = useState<any>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (accessToken && refreshToken) {
      setTokens({ access_token: accessToken, refresh_token: refreshToken });
      setAuthStatus('authenticated');
    } else {
      setAuthStatus('unauthenticated');
    }
  }, []);

  if (authStatus === 'loading') {
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

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070A12]/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
              <Droplets className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Aqlli Dala</div>
              <div className="text-xs text-white/60">Кабинет фермера</div>
            </div>
          </a>

          <nav className="flex items-center gap-4">
            <a href="/" className="text-sm text-white/70 hover:text-white">
              Главная
            </a>
            <a href="/dashboard/settings" className="text-sm text-white/70 hover:text-white">
              <Settings className="h-4 w-4" />
            </a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="relative mx-auto max-w-6xl px-4 py-8">
        {authStatus === 'authenticated' && tokens ? (
          <Dashboard tokens={tokens} />
        ) : (
          <div className="flex items-center justify-center min-h-[80vh]">
            <LoginForm onLogin={(data) => {
              setTokens(data);
              setAuthStatus('authenticated');
            }} />
          </div>
        )}
      </main>
    </div>
  );
}
