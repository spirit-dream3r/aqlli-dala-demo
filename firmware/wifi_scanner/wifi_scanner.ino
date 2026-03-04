/*
 * Прошивка для ESP32-C3 Super Mini с двумя емкостными датчиками влажности почвы v1.2
 * 
 * РАСПИНОВКА:
 * ===========
 * Датчик влажности 1 (A0) -> GPIO4 (D4)
 * Датчик влажности 2 (A0) -> GPIO5 (D5)
 * 
 * Питание датчиков:
 * VCC датчиков -> 3.3V (рекомендуется для v1.2)
 * GND датчиков -> GND
 * 
 * Аккумулятор 18650:
 * + (плюс) -> VIN (или 5V пин)
 * - (минус) -> GND
 * ВАЖНО: Используйте плату защиты TP4056 или BMS для безопасности!
 * 
 * Автор: Aqlli Dala Demo Project
 */

#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include "esp_sleep.h"

// ==================== НАСТРОЙКИ WiFi ====================
const char* WIFI_SSID = "24-53";
const char* WIFI_PASSWORD = "23091951";

// ==================== НАСТРОЙКИ СЕРВЕРА ====================
// Локальный сервер (IP вашего компьютера)
const char* SERVER_URL = "http://192.168.1.102:8000/api/telemetry";
// const char* SERVER_URL = "http://aqllidala.uz/api/telemetry";  // Для продакшена

// ID устройства (должен соответствовать field_id в базе данных)
const String DEVICE_ID = "ESP32C3_FIELD_01";

// ==================== НАСТРОЙКИ ПИНИНГА ====================
// Аналоговые пины для датчиков влажности (ESP32-C3)
const int MOISTURE_SENSOR_1_PIN = 4;  // GPIO4 (D4) - первый датчик
const int MOISTURE_SENSOR_2_PIN = 5;  // GPIO5 (D5) - второй датчик

// ==================== НАСТРОЙКИ КАЛИБРОВКИ ====================
// Значения для калибровки датчиков (настроить экспериментально)
// Сухой воздух: максимальное значение ADC (4095 для 12-bit)
// Вода: минимальное значение ADC
const int CALIBRATION_DRY = 3200;   // Значение в сухом воздухе/почве
const int CALIBRATION_WET = 1500;   // Значение в воде/влажной почве

// ==================== НАСТРОЙКИ СНА И ИЗМЕРЕНИЙ ====================
const int SLEEP_DURATION_MINUTES = 10;  // Интервал между измерениями (минуты)
const int MEASUREMENTS_COUNT = 5;       // Количество усредняемых измерений
const int MEASUREMENT_DELAY_MS = 100;   // Задержка между измерениями (мс)

// ==================== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ====================
float moisture1_avg = 0.0;
float moisture2_avg = 0.0;
float battery_voltage = 0.0;

// ==================== ФУНКЦИИ ====================

/**
 * Инициализация ADC для ESP32-C3
 * ESP32-C3 использует SAR ADC с разрешением 12 бит (0-4095)
 * Примечание: analogRead() автоматически настраивает ADC
 */
void setupADC() {
  // analogRead() автоматически конфигурирует ADC на ESP32-C3
  // Явная настройка не требуется для базового использования
  pinMode(MOISTURE_SENSOR_1_PIN, INPUT);
  pinMode(MOISTURE_SENSOR_2_PIN, INPUT);
  
  // Небольшая задержка для стабилизации ADC
  delay(10);
}

/**
 * Чтение значения с датчика влажности
 * @param pin GPIO пин датчика
 * @return Среднее значение из нескольких измерений
 */
int readMoistureSensor(int pin) {
  int total = 0;
  
  for (int i = 0; i < MEASUREMENTS_COUNT; i++) {
    int adc_value = analogRead(pin);
    total += adc_value;
    delay(MEASUREMENT_DELAY_MS);
  }
  
  return total / MEASUREMENTS_COUNT;
}

/**
 * Преобразование ADC значения в процент влажности
 * @param adc_value Значение ADC (0-4095)
 * @return Процент влажности (0-100%)
 */
float adcToMoisturePercent(int adc_value) {
  // Ограничиваем значения в пределах калибровки
  int constrained = constrain(adc_value, CALIBRATION_WET, CALIBRATION_DRY);
  
  // Маппинг: Wet (1500) -> 100%, Dry (3200) -> 0%
  float percent = map(constrained, CALIBRATION_WET, CALIBRATION_DRY, 100, 0);
  
  return constrain(percent, 0, 100);
}

/**
 * Измерение напряжения батареи
 * Для ESP32-C3 Super Mini без прямого ADC подключения
 * @return Напряжение в вольтах (заглушка)
 */
float readBatteryVoltage() {
  // ESP32-C3 Super Mini не имеет прямого доступа к ADC батареи
  // Возвращаем номинальное напряжение Li-Ion аккумулятора
  return 3.7; // Номинальное напряжение 18650
}

/**
 * Подключение к WiFi сети с принудительными попытками
 * @return true если успешно подключено
 */
bool connectToWiFi() {
  Serial.println();
  Serial.println("╔════════════════════════════════════════╗");
  Serial.println("║      Подключение к WiFi сети           ║");
  Serial.println("╚════════════════════════════════════════╝");
  Serial.println();
  
  // Отключаем WiFi для сброса
  WiFi.mode(WIFI_MODE_NULL);
  delay(100);
  
  // Включаем WiFi
  WiFi.mode(WIFI_STA);
  delay(100);
  
  const int MAX_ATTEMPTS = 3; // Максимум 3 попытки подключения
  
  for (int attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    Serial.print("📡 Попытка ");
    Serial.print(attempt);
    Serial.print(" из ");
    Serial.println(MAX_ATTEMPTS);
    Serial.print("   SSID: ");
    Serial.println(WIFI_SSID);
    Serial.print("   Пароль: ");
    Serial.println(WIFI_PASSWORD);
    Serial.println();
    
    // Начинаем подключение
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    
    int timeout = 30; // 30 секунд на попытку
    Serial.print("   ⏳ Подключение");
    
    while (WiFi.status() != WL_CONNECTED && timeout > 0) {
      delay(500);
      Serial.print(".");
      timeout--;
    }
    
    Serial.println();
    
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println();
      Serial.println("✅ WiFi ПОДКЛЮЧЕНО!");
      Serial.println();
      Serial.println("╔════════════════════════════════════════╗");
      Serial.println("║         ИНФОРМАЦИЯ О СЕТИ            ║");
      Serial.println("╠════════════════════════════════════════╣");
      Serial.print("║  📶 SSID:       ");
      Serial.println(WiFi.SSID());
      Serial.print("║  🔗 IP адрес:   ");
      Serial.println(WiFi.localIP());
      Serial.print("║  📡 MAC адрес:  ");
      Serial.println(WiFi.macAddress());
      Serial.print("║  📶 RSSI:       ");
      Serial.print(WiFi.RSSI());
      Serial.println(" dBm");
      Serial.print("║  🌐 Канал:      ");
      Serial.println(WiFi.channel());
      Serial.print("║  🚀 Скорость:   ");
      Serial.print(WiFi.getSpeed() / 1000000.0, 1);
      Serial.println(" Mbps");
      Serial.println("╚════════════════════════════════════════╝");
      Serial.println();
      return true;
    } else {
      Serial.println();
      Serial.println("   ❌ Не удалось подключиться");
      Serial.println("   Причина: " + getWiFiStatus());
      Serial.println();
      
      // Отключаем WiFi перед следующей попыткой
      WiFi.disconnect(true);
      delay(1000);
    }
  }
  
  // Все попытки исчерпаны
  Serial.println();
  Serial.println("╔════════════════════════════════════════╗");
  Serial.println("║  ❌ WiFi НЕ ПОДКЛЮЧЕНО (3 попытки)    ║");
  Serial.println("╚════════════════════════════════════════╝");
  Serial.println();
  Serial.println("Возможные причины:");
  Serial.println("  • Неверный SSID или пароль");
  Serial.println("  • WiFi сеть 5GHz (ESP32 только 2.4GHz)");
  Serial.println("  • Сеть слишком далеко");
  Serial.println("  • WiFi роутер выключен");
  Serial.println();
  
  return false;
}

/**
 * Получение статуса WiFi в виде строки
 */
String getWiFiStatus() {
  switch (WiFi.status()) {
    case WL_CONNECTED: return "Подключено";
    case WL_NO_SHIELD: return "Нет WiFi модуля";
    case WL_IDLE_STATUS: return "Ожидание";
    case WL_NO_SSID_AVAIL: return "Сеть не найдена";
    case WL_SCAN_COMPLETED: return "Сканирование завершено";
    case WL_CONNECT_FAILED: return "Ошибка подключения";
    case WL_CONNECTION_LOST: return "Соединение потеряно";
    case WL_DISCONNECTED: return "Отключено";
    default: return "Неизвестно";
  }
}

/**
 * Отправка данных на сервер
 * @param m1 Влажность первого датчика (%)
 * @param m2 Влажность второго датчика (%)
 * @param voltage Напряжение батареи (V)
 * 
 * Формат для backend/main.py TelemetryData:
 * {
 *   "field_id": "ESP32C3_FIELD_01",
 *   "moisture": 45,
 *   "temperature": 22.5,
 *   "battery": 85
 * }
 */
void sendDataToServer(float m1, float m2, float voltage) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi не подключен, пропуск отправки данных");
    return;
  }

  HTTPClient http;
  http.begin(SERVER_URL);
  http.addHeader("Content-Type", "application/json");

  // Вычисляем среднюю влажность с двух датчиков
  int avg_moisture = (int)((m1 + m2) / 2.0);
  
  // Вычисляем процент батареи от напряжения (3.0V - 4.2V)
  int battery_percent = (int)(((voltage - 3.0) / (4.2 - 3.0)) * 100.0);
  battery_percent = constrain(battery_percent, 0, 100);
  
  // Температура (пока заглушка, можно добавить датчик DS18B20)
  float temperature = 22.5;

  // Формирование JSON payload для TelemetryData
  String jsonPayload = "{";
  jsonPayload += "\"field_id\":\"" + DEVICE_ID + "\",";
  jsonPayload += "\"moisture\":" + String(avg_moisture) + ",";
  jsonPayload += "\"temperature\":" + String(temperature, 1) + ",";
  jsonPayload += "\"battery\":" + String(battery_percent);
  jsonPayload += "}";

  Serial.println();
  Serial.println("╔════════════════════════════════════════╗");
  Serial.println("║      Отправка данных на сервер         ║");
  Serial.println("╚════════════════════════════════════════╝");
  Serial.println("Отправка данных: " + jsonPayload);
  Serial.println("  - Влажность (средняя): " + String(avg_moisture) + "%");
  Serial.println("  - Датчик 1: " + String(m1, 1) + "%");
  Serial.println("  - Датчик 2: " + String(m2, 1) + "%");
  Serial.println("  - Батарея: " + String(voltage, 2) + "V (" + String(battery_percent) + "%)");
  Serial.println();

  int httpResponseCode = http.POST(jsonPayload);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    Serial.println("Ответ сервера: " + response);
    
    // Парсинг ответа (опционально)
    if (httpResponseCode == 200) {
      Serial.println("✅ Данные успешно сохранены на сервере");
    }
  } else {
    Serial.print("Ошибка отправки: ");
    Serial.println(httpResponseCode);
    
    if (httpResponseCode == 404) {
      Serial.println("⚠️ Поле не найдено. Создайте поле с field_id='" + DEVICE_ID + "' в базе данных");
    } else if (httpResponseCode == 400) {
      Serial.println("⚠️ Ошибка валидации данных");
    } else if (httpResponseCode == 500) {
      Serial.println("⚠️ Ошибка сервера");
    }
  }

  http.end();
  Serial.println();
}

/**
 * Вывод информации о питании
 */
void printPowerInfo() {
  Serial.println("\n=== Информация о питании ===");
  Serial.print("Напряжение батареи: ");
  Serial.print(battery_voltage);
  Serial.println(" V");
  
  // Процент заряда батареи (примерный)
  int batteryPercent = (battery_voltage - 3.0) / (4.2 - 3.0) * 100;
  batteryPercent = constrain(batteryPercent, 0, 100);
  Serial.print("Заряд батареи: ");
  Serial.print(batteryPercent);
  Serial.println(" %");
  Serial.println("==============================\n");
}

/**
 * Вывод информации о датчиках
 */
void printSensorInfo() {
  Serial.println("\n=== Показания датчиков ===");
  Serial.print("Датчик 1 (GPIO4): ");
  Serial.print(moisture1_avg, 1);
  Serial.println(" % влажности");
  
  Serial.print("Датчик 2 (GPIO5): ");
  Serial.print(moisture2_avg, 1);
  Serial.println(" % влажности");
  Serial.println("==========================\n");
}

/**
 * Переход в глубокий сон для экономии энергии
 */
void goToDeepSleep() {
  Serial.println("Переход в режим глубокого сна...");
  Serial.println("Следующее пробуждение через " + String(SLEEP_DURATION_MINUTES) + " мин");

  // Отключаем WiFi для экономии энергии
  WiFi.disconnect(true);
  WiFi.mode(WIFI_OFF);

  // Настраиваем таймер пробуждения (в микросекундах)
  uint64_t sleep_time_us = SLEEP_DURATION_MINUTES * 60 * 1000000ULL;
  
  // Переходим в глубокий сон с таймером пробуждения
  esp_sleep_enable_timer_wakeup(sleep_time_us);
  esp_deep_sleep_start();
}

// ==================== SETUP ====================
void setup() {
  // Инициализация последовательного порта
  Serial.begin(115200);
  
  Serial.println("\n");
  Serial.println("╔════════════════════════════════════════╗");
  Serial.println("║  ESP32-C3 Soil Moisture Sensor v1.0   ║");
  Serial.println("║  Датчики влажности почвы v1.2         ║");
  Serial.println("╚════════════════════════════════════════╝");
  
  // Инициализация ADC
  setupADC();
  
  // Небольшая задержка для стабилизации датчиков
  delay(100);
  
  // Подключение к WiFi
  if (connectToWiFi()) {
    // Измерение напряжения батареи
    battery_voltage = readBatteryVoltage();
    printPowerInfo();
    
    // Чтение датчиков
    int sensor1_raw = readMoistureSensor(MOISTURE_SENSOR_1_PIN);
    int sensor2_raw = readMoistureSensor(MOISTURE_SENSOR_2_PIN);
    
    // Преобразование в проценты
    moisture1_avg = adcToMoisturePercent(sensor1_raw);
    moisture2_avg = adcToMoisturePercent(sensor2_raw);
    
    // Вывод показаний
    printSensorInfo();
    
    // Отправка на сервер
    sendDataToServer(moisture1_avg, moisture2_avg, battery_voltage);
  }
  
  Serial.println("Измерение завершено. Переход в сон...");
  delay(1000);
}

// ==================== LOOP ====================
void loop() {
  // В этой прошивке основной цикл не используется
  // После setup() устройство переходит в глубокий сон
  // Пробуждение происходит по таймеру и выполняется reset
  
  goToDeepSleep();
  
  // Эта строка никогда не будет достигнута
  delay(1000);
}
