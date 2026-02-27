# Aqlli Dala (Умное Поле)

Интеллектуальная система контроля влажности почвы для фермеров Узбекистана.

## Структура проекта

```text
aqlli-dala-landing/
├── backend/
│   ├── main.py              # Сервер (FastAPI)
│   ├── bot.py               # Telegram бот (aiogram)
│   ├── database.py          # Работа с БД (SQLAlchemy)
│   ├── config.py            # Настройки (Pydantic Settings)
│   ├── requirements.txt     # Зависимости Python
│   └── .env                 # Переменные окружения
├── firmware/
│   └── esp32_sensor.ino     # Прошивка для ESP32 (Arduino)
├── database/
│   └── aqlli_dala.db        # SQLite база (создается автоматически)
├── src/                     # Фронтенд (Next.js)
├── functions/               # Cloud Functions (Firebase)
└── README.md
```

## Установка и запуск

### 1. Backend (Python)
Требуется Python 3.9+
```bash
cd backend
python -m venv venv
source venv/bin/activate  # На Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Telegram Бот
```bash
# В активированном venv
python bot.py
```

### 3. Frontend (Next.js)
```bash
npm install
npm run dev
```

### 4. Прошивка ESP32
Откройте `firmware/esp32_sensor.ino` в Arduino IDE, укажите свои настройки WiFi и адрес сервера, затем загрузите в контроллер.

## Возможности
- **Мониторинг**: Снятие показаний влажности на глубине 20 и 40 см.
- **Уведомления**: Оперативная отправка данных в Telegram.
- **Экономия**: До 30% экономии воды за счет точного полива.
