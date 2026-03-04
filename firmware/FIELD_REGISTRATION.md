# 📝 Регистрация устройства (field_id) в базе данных

## 🎯 Описание

Прошивка отправляет данные с `field_id = "ESP32C3_FIELD_01"`. Для корректной работы необходимо зарегистрировать это поле в базе данных.

## ✅ Способы регистрации

### Способ 1: Через API (рекомендуется)

```bash
# Создайте поле через API
curl -X POST http://localhost:8000/api/fields \
  -H "Content-Type: application/json" \
  -d '{
    "field_name": "ESP32C3_FIELD_01",
    "crop_type": "wheat",
    "area_hectares": 1.0
  }'
```

### Способ 2: Через Telegram бота

Если у вас настроен Telegram бот:

1. Отправьте боту команду `/register`
2. Введите название поля: `ESP32C3_FIELD_01`
3. Укажите тип культуры
4. Укажите площадь в гектарах

### Способ 3: Напрямую в базу данных (SQLite)

```bash
# Подключитесь к базе данных
cd backend
sqlite3 aqlli_dala.db

# Создайте поле
INSERT INTO fields (field_name, crop_type, area_hectares, created_at) 
VALUES ('ESP32C3_FIELD_01', 'wheat', 1.0, datetime('now'));

# Проверьте
SELECT * FROM fields;

# Выход
.exit
```

### Способ 4: Через PostgreSQL

```sql
-- Подключитесь к базе данных
psql -U aqlli_dala -d aqlli_dala

-- Создайте поле
INSERT INTO fields (field_name, crop_type, area_hectares, created_at) 
VALUES ('ESP32C3_FIELD_01', 'wheat', 1.0, NOW());

-- Проверьте
SELECT * FROM fields WHERE field_name = 'ESP32C3_FIELD_01';
```

## 🔍 Проверка

После регистрации проверьте, что поле создано:

```bash
# Через API
curl http://localhost:8000/api/fields/ESP32C3_FIELD_01

# Через SQLite
sqlite3 aqlli_dala.db "SELECT * FROM fields WHERE field_name='ESP32C3_FIELD_01';"
```

## 📊 Просмотр телеметрии

После того как устройство отправит данные:

```bash
# Последняя телеметрия
curl http://localhost:8000/api/telemetry/ESP32C3_FIELD_01

# История за 24 часа
curl http://localhost:8000/api/telemetry/ESP32C3_FIELD_01/history?hours=24
```

## 🔧 Изменение field_id в прошивке

Если хотите использовать другое имя:

1. Откройте `esp32c3_soil_sensor.ino`
2. Измените строку:
   ```cpp
   const String DEVICE_ID = "ESP32C3_FIELD_01";  // Ваше имя
   ```
3. Зарегистрируйте новое поле в БД
4. Перезагрузите устройство

## ⚠️ Возможные ошибки

| Ошибка | Решение |
|--------|---------|
| `404 Field not found` | Зарегистрируйте поле с таким field_id |
| `400 Validation error` | Проверьте формат moisture (0-100) |
| `500 Internal error` | Проверьте логи backend: `docker logs aqlli-backend` |

---

**Документация:** [README.md](README.md)  
**API Docs:** http://localhost:8000/docs
