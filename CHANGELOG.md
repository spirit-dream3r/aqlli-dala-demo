# 📝 CHANGELOG — Aqlli Dala

Все изменения в проекте Aqlli Dala.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
версионирование следует [Semantic Versioning](https://semver.org/lang/ru/).

---

## [0.3.1] — 2024-03-04

### 🐛 Исправлено

#### Frontend
- **Исправление синтаксических ошибок в page.tsx** — заменены одинарные кавычки на двойные в строках содержащих апострофы в узбекском тексте (20 исправлений)
  - `"Pilot so'rash"` (строка 472)
  - `"Demo ma'lumotlar (har 5s yangilanadi)"` (строка 509)
  - `"Aloqa yo'q"` (строка 389)
  - `"Pilot maydonlaridan real ko'rsatkichlar"` (строка 728)
  - `"O'rtacha oldin"` (строка 754)
  - `"O'rtacha keyin"` (строка 758)
  - `"To'plangan daromad"` (строка 794)
  - `"Telegram kanalimizdan so'nggi yangiliklar"` (строка 827)
  - `"Yangiliklar yo'q"` (строка 847)
  - `"Pilot loyihani so'rash"` (строка 881)
  - `"Ism / Xo'jalik nomi"` (строка 899)
  - `"Xo'jaligingiz haqida gapiring..."` (строка 969)
  - И другие...

---

## [0.3.0] — 2024-03-04

### ✨ Добавлено (Итерационные улучшения)

#### 🔐 Личный кабинет фермера
- **JWT аутентификация** — access/refresh токены
- **Роутеры аутентификации** — `/api/auth/register`, `/api/auth/login`, `/api/auth/refresh`
- **Профиль пользователя** — `/api/profile/me` с данными и статистикой
- **Управление полями** — CRUD операции через `/api/fields`
- **Смена пароля** — с проверкой старого пароля
- **Сброс пароля** — через SMS код
- **Frontend dashboard** — страница входа, регистрации, личный кабинет
- **Rate limiting** — защита от brute force (5 попыток/минуту)
- **Файлы**:
  - `backend/auth.py` — JWT аутентификация, хеширование паролей
  - `backend/schemas.py` — Pydantic схемы для аутентификации
  - `backend/routers.py` — API роутеры (auth, profile, fields)
  - `src/app/dashboard/page.tsx` — Личный кабинет
  - `src/app/dashboard/register/page.tsx` — Регистрация

#### 📊 Экспорт отчетов
- **PDF генерация** — отчеты с таблицами и статистикой (reportlab)
- **Excel генерация** — данные телеметрии с форматированием (openpyxl)
- **Период отчета** — 1-365 дней на выбор
- **Статистика** — средняя/мин/макс влажность, температура
- **Endpoint** — `GET /api/reports/{field_name}/export?format=pdf|xlsx&days=7`
- **Frontend** — страница выбора периода и формата
- **Файлы**:
  - `backend/reports.py` — Генерация PDF и Excel отчетов
  - `src/app/dashboard/reports/[field_name]/page.tsx` — Экспорт отчетов

#### 🌤 Интеграция погоды
- **OpenWeatherMap API** — текущая погода и прогноз (3-5 дней)
- **Расчет эвапотранспирации** — по формуле FAO-56 Penman-Monteith
- **Рекомендации по поливу** — на основе влажности + погоды + прогноза осадков
- **Эндпоинты**:
  - `GET /api/weather?lat=&lon=&include_forecast=true`
  - `GET /api/fields/{field_name}/weather` — погода для поля с рекомендацией
- **Коэффициенты культур** — поддержка разных типов растений
- **Файлы**:
  - `backend/weather.py` — Сервис погоды с OpenWeatherMap
  - `backend/config.py` — добавлен `OPENWEATHER_API_KEY`

#### 🗺 Карта полей
- **Leaflet карты** — интерактивная карта с OpenStreetMap
- **GPS координаты** — отображение полей на карте
- **Кастомные маркеры** — цветовая индикация статуса (optimal/warning/critical)
- **Геолокация** — определение местоположения пользователя
- **Фильтры** — поиск по названию, фильтр по статусу
- **Frontend** — страница `/dashboard/map` с боковой панелью
- **Зависимости** — `react-leaflet`, `leaflet`
- **Файлы**:
  - `src/components/fields-map.tsx` — Переиспользуемый компонент карты
  - `src/app/dashboard/map/page.tsx` — Карта полей

#### 📱 SMS уведомления
- **Click SMS API** — интеграция с узбекским SMS провайдером
- **Код подтверждения** — для верификации телефона
- **Тревоги** — SMS о низкой влажности
- **Массовая рассылка** — отправка нескольким получателям
- **Проверка баланса** — мониторинг счета Click
- **Шаблонизация** — готовые шаблоны для разных типов SMS
- **Endpoint'ы**:
  - `POST /api/sms/send-code`
  - `POST /api/sms/verify-code`
  - `POST /api/sms/send-alert`
- **Файлы**:
  - `backend/sms.py` — Click SMS API интеграция
  - `backend/config.py` — добавлены `CLICK_API_KEY`, `CLICK_API_SECRET`

### 🔧 Изменено

#### Backend
- **config.py** — добавлены `OPENWEATHER_API_KEY`, `CLICK_API_KEY`, `CLICK_API_SECRET`
- **database.py** — новые поля User (`hashed_password`, `is_active`, `is_verified`, `updated_at`)
- **main.py** — 3 новых роутера (reports, weather, sms), импорт `get_current_user`
- **Миграции Alembic** — `002_add_user_auth_fields.py`
- **requirements.txt** — обновлены версии пакетов (гибкие версии для совместимости)

#### Frontend
- **dashboard/page.tsx** — личный кабинет с профилем и полями
- **dashboard/register/page.tsx** — страница регистрации
- **dashboard/map/page.tsx** — карта полей
- **dashboard/reports/[field_name]/page.tsx** — экспорт отчетов
- **components/fields-map.tsx** — переиспользуемый компонент карты
- **package.json** — добавлены `react-leaflet`, `leaflet`

#### DevOps
- **install.bat** — скрипт установки для Windows
- **TESTING.md** — руководство по тестированию
- **TEST_REPORT.md** — отчет о тестировании
- **demo.html** — интерактивная демонстрация

### 📚 Документация

- **CHANGELOG.md** — обновлен с итерациями 0.3.0 и 0.3.1
- **.env.example** — новые переменные для Weather и SMS API
- **README.md** — обновлен с новыми функциями

### 🐛 Исправлено

- SSR ошибки с Leaflet (динамический импорт)
- Отсутствие импорта `get_current_user` в main.py
- Обработка ошибок в SMS сервисе
- Синтаксические ошибки в page.tsx (аpostrophes в узбекском тексте)

### 🔒 Безопасность

- JWT токены с expiration
- Hash паролей (bcrypt)
- Rate limiting на auth endpoints
- Валидация SMS кодов

### 🧪 Тесты

- **tests/test_api.py** — тесты API (обновлены для httpx 0.26+)
- **tests/test_utils.py** — тесты утилит (13 тестов, 100% покрытие utils.py)
- **pytest.ini** — конфигурация pytest

---

## [0.2.0] — 2024-03-03

### ✨ Добавлено

#### Backend
- **Валидация телефонов** — полная валидация номеров Узбекистана (+998XXXXXXXXX)
- **Rate limiting** — защита от спама на endpoint `/api/lead` (5 запросов/минуту)
- **Логирование** — интеграция Loguru с ротацией файлов
- **Retry механизм** — автоматические повторные попытки для Telegram отправки (tenacity)
- **Pydantic Settings** — полная валидация конфигурации через Pydantic
- **SQLAlchemy ORM** — переход на SQLAlchemy с асинхронной поддержкой
- **Alembic миграции** — система миграций для БД
- **Индексы БД** — оптимизация запросов телеметрии
- **JWT подготовка** — структура для будущей аутентификации

#### Telegram Бот
- **FSM (Finite State Machine)** — пошаговая регистрация пользователей
- **CallbackQuery handlers** — интерактивные кнопки для настроек
- **Мультиязычность** — сохранение языка пользователя в БД (UZ/RU/EN)
- **Команды**: `/start`, `/help`, `/status`, `/settings`
- **Кнопки меню**: Мои поля, Отчёты, Настройки, Поддержка, Оплата
- **Фоновые задачи** — автоматические уведомления о низкой влажности

#### Frontend
- **SEO мета-теги** — полная SEO оптимизация (OpenGraph, Twitter, Schema.org)
- **Переключатель Demo/Real API** — режим реальных данных с датчиков
- **Исправление дублирования** — единый источник для backendUrl
- **Улучшенные графики** — цветовая кодировка для влаги 20см/40см
- **Статус подключения** — индикатор соединения с API
- **Валидация форм** — клиентская валидация перед отправкой
- **Обработка ошибок 429** — информирование о rate limiting

#### DevOps
- **GitHub Actions CI/CD** — автоматические тесты и deployment
- **Health checks** — для всех сервисов (backend, frontend, db)
- **Docker оптимизация** — multi-stage build, .dockerignore
- **Секреты в .env** — вынесение всех чувствительных данных
- **PostgreSQL** — поддержка production БД

### 🔧 Изменено

#### Backend
- **config.py** — полный рефакторинг с Pydantic Settings
- **database.py** — переход на SQLAlchemy с индексами
- **main.py** — добавлена валидация, логирование, обработка ошибок
- **bot.py** — полный рефакторинг с FSM и мультиязычностью
- **utils.py** — валидация телефонов, rate limiter, retry декоратор, логирование
- **requirements.txt** — добавлены новые зависимости

#### Frontend
- **layout.tsx** — добавлены SEO мета-теги и structured data
- **page.tsx** — рефакторинг с переключателем режимов
- **next.config.ts** — поддержка standalone build для Docker

#### Docker
- **docker-compose.yml** — health checks, сети, volumes
- **Dockerfile** — оптимизация слоев, health check
- **Dockerfile.frontend** — новый файл для production сборки

### 📚 Документация

- **README.md** — полное обновление с примерами
- **CHANGELOG.md** — создан новый файл
- **.env.example** — примеры всех переменных окружения
- **Alembic миграции** — начальная схема БД

### 🐛 Исправлено

- Дублирование `backendUrl` во frontend
- Отсутствие индексов в БД для телеметрии
- Нет обработки ошибок 429 (Too Many Requests)
- Отсутствие health checks для Docker
- Секреты в docker-compose.yml

### 🔒 Безопасность

- Валидация всех входных данных
- Rate limiting для защиты от спама
- Honeypot поле в форме заявок
- JWT структура для будущей аутентификации
- Валидация Telegram webhook secret

---

## [0.1.0] — 2024-02-01

### ✨ Добавлено

- Первоначальная версия проекта
- Базовый FastAPI backend
- Telegram бот с основными командами
- Next.js frontend с лендингом
- SQLite база данных
- Docker Compose для локальной разработки
- ESP32 firmware для датчиков

### 📊 Функции

- Мониторинг влажности (2 глубины: 20см, 40см)
- Telegram уведомления
- Синхронизация новостей из Telegram
- Демо-графики с экономией воды
- Форма для заявок

---

## Типы изменений

- **Added** — для новых функций
- **Changed** — для изменений в существующем функционале
- **Deprecated** — для скорого удаления функций
- **Removed** — для удаленного функционала
- **Fixed** — для исправления ошибок
- **Security** — для исправления уязвимостей

---

*Сделано с ❤️ для фермеров Узбекистана*
