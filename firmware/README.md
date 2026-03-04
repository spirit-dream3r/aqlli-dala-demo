# 📦 Прошивка ESP32-C3 для датчиков влажности почвы

## 🎯 Описание

Прошивка для **ESP32-C3 Super Mini** с двумя емкостными датчиками влажности почвы **v1.2** и питанием от аккумулятора **18650**.

### Особенности

- ✅ **Энергосбережение**: Глубокий сон между измерениями (6-12 месяцев от 18650)
- ✅ **Усреднение**: 5 измерений для точности
- ✅ **Калибровка**: Настраиваемые значения для разных типов почвы
- ✅ **WiFi**: Отправка данных на сервер по HTTP/JSON
- ✅ **Мониторинг**: Контроль напряжения батареи
- ✅ **Настраиваемость**: Интервал измерений от 5 минут

---

## 📋 Состав проекта

| Файл | Описание |
|------|----------|
| **[esp32c3_soil_sensor.ino](esp32c3_soil_sensor.ino)** | Основная прошивка |
| **[calibration_test.ino](calibration_test.ino)** | Тест и калибровка датчиков |
| **[README_PINOUT.md](README_PINOUT.md)** | Подробная документация по распиновке |
| **[CONNECTION_DIAGRAM.txt](CONNECTION_DIAGRAM.txt)** | Текстовые схемы подключения |
| **[QUICK_START_RU.md](QUICK_START_RU.md)** | Быстрая шпаргалка |
| **[platformio.ini](platformio.ini)** | Конфигурация PlatformIO |
| **`.vscode/`** | Настройки IntelliSense для VS Code |

---

## 🔌 Распиновка

### Датчики влажности v1.2

| Датчик | ESP32-C3 | GPIO | Цвет провода |
|--------|----------|------|--------------|
| Датчик 1 A0 | D4 | GPIO4 | Желтый |
| Датчик 1 VCC | 3.3V | - | Красный |
| Датчик 1 GND | GND | - | Черный |
| Датчик 2 A0 | D5 | GPIO5 | Желтый |
| Датчик 2 VCC | 3.3V | - | Красный |
| Датчик 2 GND | GND | - | Черный |

### Аккумулятор 18650

| Аккумулятор | ESP32-C3 |
|-------------|----------|
| + (плюс) | VIN (или 5V) |
| - (минус) | GND |

> ⚠️ **Используйте плату защиты TP4056** для безопасности!

---

## 🚀 Быстрый старт

### 1. Установка PlatformIO (рекомендуется)

```bash
# Установите VS Code
# Установите расширение "PlatformIO IDE"
# Откройте папку firmware в VS Code
```

### 2. Настройка WiFi и сервера

Откройте `esp32c3_soil_sensor.ino` и измените:

```cpp
const char* WIFI_SSID = "ВАШ_WIFI";
const char* WIFI_PASSWORD = "ВАШ_ПАРОЛЬ";

// Для локального сервера (укажите IP вашего сервера)
const char* SERVER_URL = "http://192.168.1.100:8000/api/telemetry";

// Для продакшена
// const char* SERVER_URL = "http://aqllidala.uz/api/telemetry";

const String DEVICE_ID = "ESP32C3_FIELD_01";  // Должен совпадать с field_id в БД
```

> **Важно:** Backend ожидает данные на эндпоинте `/api/telemetry` в формате:
> ```json
> {
>   "field_id": "ESP32C3_FIELD_01",
>   "moisture": 45,
>   "temperature": 22.5,
>   "battery": 85
> }
> ```

### 3. Регистрация поля в базе данных

Прошивка отправляет данные с `field_id = "ESP32C3_FIELD_01"`. Зарегистрируйте поле:

```bash
# Через API
curl -X POST http://192.168.1.100:8000/api/fields \
  -H "Content-Type: application/json" \
  -d '{
    "field_name": "ESP32C3_FIELD_01",
    "crop_type": "wheat",
    "area_hectares": 1.0
  }'
```

> 📖 Подробная инструкция: [FIELD_REGISTRATION.md](FIELD_REGISTRATION.md)

### 4. Калибровка датчиков

1. Загрузите `calibration_test.ino`
2. Откройте Serial Monitor (115200)
3. Запишите значения для воздуха и воды
4. Вставьте в `esp32c3_soil_sensor.ino`:

```cpp
const int CALIBRATION_DRY = 3200;  // В воздухе
const int CALIBRATION_WET = 1500;  // В воде
```

### 5. Загрузка прошивки

```bash
# PlatformIO
pio run --target upload

# Arduino IDE
# Выберите: Tools → Board → ESP32C3 Dev Module
# Нажмите Upload
```

---

## 🔧 Настройка

### Интервал измерений

```cpp
const int SLEEP_DURATION_MINUTES = 10;  // 5-60 мин
```

### Потребление энергии

| Режим | Ток | Время от 18650 (2500 mAh) |
|-------|-----|---------------------------|
| Активный | ~100-150 mA | ~2 мин |
| Глубокий сон | ~10-50 μA | ~5-10 лет |
| **Среднее (10 мин)** | **~0.5 mA** | **~6-12 месяцев** |

---

## 📊 Структура данных

Отправка на сервер в формате JSON (TelemetryData):

```json
{
  "field_id": "ESP32C3_FIELD_01",
  "moisture": 45,
  "temperature": 22.5,
  "battery": 85
}
```

**Поля:**
- `field_id` — идентификатор поля (должен существовать в базе данных)
- `moisture` — средняя влажность с двух датчиков (0-100%)
- `temperature` — температура воздуха (°C)
- `battery` — процент заряда батареи (0-100%)

**Эндпоинты API:**
- `POST /api/telemetry` — отправка данных телеметрии
- `GET /api/telemetry/{field_id}` — получение последней телеметрии

---

## 🛠️ Устранение неполадок

### IntelliSense показывает ошибки

**Решение 1**: Установите PlatformIO IDE
**Решение 2**: Откройте в Arduino IDE
**Решение 3**: Файлы `.clangd`, `.ccls`, `.vscode/settings.json` уже настроены

### Ошибка 404 Field not found

Зарегистрируйте поле с нужным field_id в базе данных. См. [FIELD_REGISTRATION.md](FIELD_REGISTRATION.md)

### Не подключается к WiFi

- Проверьте SSID и пароль
- Убедитесь что WiFi 2.4 GHz (ESP32 не поддерживает 5 GHz)
- Проверьте уровень сигнала

### Показания 0% или 100%

- Откалибруйте датчики
- Проверьте подключение (A0 → GPIO4/5)
- Убедитесь что VCC = 3.3V (не 5V)

### Не загружается прошивка

- Зажмите кнопку **BOOT** на плате
- Нажмите **RESET**
- Отпустите **BOOT** после начала загрузки

---

## 📖 Документация

- **[QUICK_START_RU.md](QUICK_START_RU.md)** - Быстрая шпаргалка
- **[README_PINOUT.md](README_PINOUT.md)** - Подробная распиновка и инструкции
- **[CONNECTION_DIAGRAM.txt](CONNECTION_DIAGRAM.txt)** - Схемы подключения

---

## 🔗 Ссылки

- [ESP32-C3 Documentation](https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/)
- [PlatformIO](https://platformio.org/)
- [Arduino ESP32 Core](https://github.com/espressif/arduino-esp32)

---

## 📄 Лицензия

MIT License - Aqlli Dala Demo Project

---

## 📞 Контакты

Проект: **Aqlli Dala Demo**  
Версия прошивки: **1.0**  
Дата: **Март 2026**
