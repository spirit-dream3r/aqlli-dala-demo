# 🌾 Aqlli Dala — Умный Полив для Узбекистана

[![CI/CD](https://github.com/yourusername/aqlli-dala-demo/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/yourusername/aqlli-dala-demo/actions/workflows/ci-cd.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11](https://img.shields.io/badge/python-3.11-blue.svg)](https://www.python.org/downloads/)
[![Node 20](https://img.shields.io/badge/node-20-green.svg)](https://nodejs.org/)

**Aqlli Dala** — это IoT-платформа для агротехнологий, предназначенная для фермеров Узбекистана. Система контролирует влажность почвы с помощью датчиков ESP32 + LoRaWAN и предоставляет данные через веб-приложение и Telegram-бот.

## 📋 Содержание

- [Возможности](#-возможности)
- [Технологии](#-технологии)
- [Архитектура](#-архитектура)
- [Быстрый старт](#-быстрый-старт)
- [Настройка](#-настройка)
- [API Документация](#-api-документация)
- [Telegram Бот](#-telegram-бот)
- [Разработка](#-разработка)
- [Deployment](#-deployment)
- [Структура проекта](#-структура-проекта)
- [Команда](#-команда)
- [Лицензия](#-лицензия)

---

## ✨ Возможности

### 🎯 Основные функции

- **Мониторинг влажности** в реальном времени (2 глубины: 20см и 40см)
- **Telegram уведомления** при низкой влажности (<25%)
- **Авто-синхронизация новостей** из Telegram канала на сайт
- **Экономия ресурсов**: до 30% воды, 25% электричества
- **Увеличение урожайности**: +15% за счет точного полива
- **Двуязычность**: узбекский (UZ) и русский (RU)

### 🔧 Технические возможности

- Rate limiting для защиты от спама
- Валидация телефонов (+998...)
- JWT аутентификация для API
- Alembic миграции для БД
- Health checks для всех сервисов
- CI/CD pipeline с GitHub Actions
- Логирование с Loguru

---

## 🛠 Технологии

### Frontend
| Технология | Версия | Описание |
|------------|--------|----------|
| Next.js | 16.1.6 | React фреймворк |
| React | 19.2.3 | UI библиотека |
| TypeScript | 5.x | Типизация |
| Tailwind CSS | 4.x | Стилизация |
| Recharts | 3.7.0 | Графики |
| Lucide React | 0.575.0 | Иконки |

### Backend
| Технология | Версия | Описание |
|------------|--------|----------|
| FastAPI | 0.109.0 | Web фреймворк |
| SQLAlchemy | 2.0.25 | ORM |
| Aiogram | 3.4.1 | Telegram бот |
| Alembic | 1.13.1 | Миграции БД |
| Loguru | 0.7.2 | Логирование |
| SlowAPI | 0.1.9 | Rate limiting |

### База данных
- **SQLite** (разработка)
- **PostgreSQL 15** (production)

### Инфраструктура
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Nginx (reverse proxy)

---

## 🏗 Архитектура

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   ESP32 + LoRa  │────▶│   Backend API    │────▶│  PostgreSQL DB  │
│   (датчики)     │     │   (FastAPI)      │     │                 │
└─────────────────┘     └────────┬─────────┘     └─────────────────┘
                                 │
                        ┌────────┴────────┐
                        ▼                 ▼
              ┌─────────────────┐  ┌─────────────────┐
              │  Telegram Bot   │  │  Frontend       │
              │  (Aiogram)      │  │  (Next.js)      │
              └─────────────────┘  └─────────────────┘
```

### IoT Архитектура
```
[ESP32-S3 + LoRa SX1262] → [LoRa RF] → [ESP32 Gateway] → [WiFi] → [Backend Server]
```

- **Датчики**: ESP32-S3 + LoRa SX1262
- **Глубина измерения**: 20см и 40см
- **Точность**: ±3%
- **Радиус LoRa**: до 10 км
- **Питание**: Солнечные панели 24/7

---

## 🚀 Быстрый старт

### Требования

- Docker & Docker Compose
- Node.js 20+
- Python 3.11+

### 1. Клонирование репозитория

```bash
git clone https://github.com/yourusername/aqlli-dala-demo.git
cd aqlli-dala-demo
```

### 2. Настройка переменных окружения

```bash
# Скопируйте пример файла окружения
cp .env.example .env

# Отредактируйте .env файл
nano .env  # или используйте ваш редактор
```

### 3. Запуск через Docker Compose

```bash
# Запуск всех сервисов
docker-compose up -d

# Проверка статуса
docker-compose ps

# Просмотр логов
docker-compose logs -f
```

### 4. Доступ к приложениям

| Сервис | URL | Описание |
|--------|-----|----------|
| Frontend | http://localhost:3000 | Веб-приложение |
| Backend API | http://localhost:8000 | REST API |
| API Docs | http://localhost:8000/docs | Swagger UI |
| PostgreSQL | localhost:5432 | База данных |

---

## ⚙️ Настройка

### Переменные окружения

#### Telegram
```env
TELEGRAM_BOT_TOKEN=1234567890:AABBccDDeeFFggHHiiJJkkLLmmNNooP
TELEGRAM_CHAT_ID=-1001234567890
TELEGRAM_WEBHOOK_SECRET=your_secret_here
```

#### Database
```env
# Development (SQLite)
DATABASE_URL=sqlite:///./aqlli_dala.db

# Production (PostgreSQL)
DATABASE_URL=postgresql://aqlli_user:aqlli_pass@db/aqlli_dala
```

#### Security
```env
JWT_SECRET_KEY=your-super-secret-key-min-32-characters
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24
```

---

## 📖 API Документация

### Основные endpoints

#### Health Check
```bash
GET /health
```

#### Телеметрия
```bash
POST /api/telemetry
GET /api/telemetry/{field_id}
GET /api/telemetry/{field_id}/history?hours=24&limit=100
```

#### Поля
```bash
GET /api/fields
POST /api/fields
GET /api/fields/{telegram_id}
```

#### Заявки (Leads)
```bash
POST /api/lead
```

#### Новости
```bash
GET /api/news?limit=10
POST /api/telegram_webhook
```

### Пример запроса телеметрии

```bash
curl -X POST http://localhost:8000/api/telemetry \
  -H "Content-Type: application/json" \
  -d '{
    "field_id": "field1",
    "moisture": 28,
    "temperature": 25.5,
    "battery": 95
  }'
```

### Пример ответа

```json
{
  "status": "success",
  "message": "Данные получены и сохранены",
  "field_id": "field1"
}
```

---

## 🤖 Telegram Бот

### Команды бота

| Команда | Описание |
|---------|----------|
| `/start` | Запустить бота |
| `/help` | Помощь |
| `/status` | Статус полей |
| `/settings` | Настройки |

### Кнопки меню

- 🚜 Мои поля / Mening maydonlarim
- 📊 Отчёты / Hisobotlar
- ⚙️ Настройки / Sozlamalar
- 📞 Поддержка / Yordam
- 💳 Оплата / To'lov

---

## 👨‍💻 Разработка

### Backend

```bash
cd backend

# Создание виртуального окружения
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Установка зависимостей
pip install -r requirements.txt

# Запуск сервера
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Запуск бота
python bot.py
```

### Миграции БД

```bash
cd backend

# Создать новую миграцию
alembic revision --autogenerate -m "Description"

# Применить миграции
alembic upgrade head

# Откатить миграцию
alembic downgrade -1
```

### Frontend

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для production
npm run build

# Запуск production сервера
npm start

# Lint
npm run lint
```

---

## 📦 Deployment

### Production Docker Compose

```yaml
# docker-compose.prod.yml
version: '3.9'

services:
  backend:
    image: yourusername/aqlli-dala-backend:latest
    environment:
      ENVIRONMENT: production
      DATABASE_URL: postgresql://user:pass@db/aqlli_dala
    # ...

  frontend:
    image: yourusername/aqlli-dala-frontend:latest
    # ...
```

### Запуск в production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Nginx конфигурация

```nginx
server {
    listen 80;
    server_name aqllidala.uz;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 📁 Структура проекта

```
aqlli-dala-demo/
├── src/                    # Frontend (Next.js)
│   └── app/
│       ├── layout.tsx      # Root layout с SEO
│       ├── page.tsx        # Главная страница
│       └── globals.css     # Глобальные стили
│
├── backend/                # Backend (FastAPI)
│   ├── main.py             # Основной сервер
│   ├── bot.py              # Telegram бот
│   ├── database.py         # SQLAlchemy ORM
│   ├── config.py           # Pydantic Settings
│   ├── utils.py            # Утилиты
│   ├── alembic/            # Миграции БД
│   └── requirements.txt    # Python зависимости
│
├── database/               # База данных
│   └── aqlli_dala.db       # SQLite (dev)
│
├── firmware/               # Прошивка ESP32
│   └── esp32_sensor.ino
│
├── .github/workflows/      # GitHub Actions
│   └── ci-cd.yml
│
├── docker-compose.yml      # Docker оркестрация
├── Dockerfile.frontend     # Frontend Docker
├── package.json            # Node.js зависимости
├── tsconfig.json           # TypeScript конфиг
└── README.md               # Документация
```

---

## 👥 Команда

- **Разработка**: Aqlli Dala Team
- **Контакты**: support@aqllidala.uz
- **Telegram**: @AqlliDala_Support

---

## 📄 Лицензия

MIT License - см. файл [LICENSE](LICENSE) для деталей.

---

## 📊 Статистика

- **Экономия воды**: 30%
- **Экономия электричества**: 25%
- **Увеличение урожайности**: +15%
- **Срок окупаемости**: ~1.8 сезона

---

## 🗺 Регионы Узбекистана

Проект адаптирован под регионы:
- **Сырдарья** — борьба с засолением
- **Джизак** — экономный полив
- **Ферганская долина** — прецизионный полив для садов

---

## 🔗 Ссылки

- [Сайт](https://aqllidala.uz)
- [Telegram канал](https://t.me/aqllidala)
- [API Документация](http://localhost:8000/docs)

---

*Сделано с ❤️ для фермеров Узбекистана*
