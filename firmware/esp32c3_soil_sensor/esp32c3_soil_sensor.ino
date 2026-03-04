#include <WiFi.h>
#include <HTTPClient.h>
#include <esp_sleep.h>
#include <driver/rtc_io.h>

// ==================== НАСТРОЙКИ WI-FI ====================
const char* ssid     = "24-53";
const char* password = "23091951";

// ==================== НАСТРОЙКИ СЕРВЕРА ====================
const char* serverUrl = "http://192.168.1.100:8000/api/telemetry";  // IP и порт backend сервера
const char* fieldId   = "field_01";  // Уникальный идентификатор поля (сенсора)

// ==================== ПИНЫ ДАТЧИКОВ ====================
// На C3 SuperMini GPIO 0 и 1 поддерживают ADC
const int sensorPin1 = 0; 
const int sensorPin2 = 1;

// ==================== КАЛИБРОВОЧНЫЕ ЗНАЧЕНИЯ ====================
// AirValue — значение, когда датчик сухой в воздухе
// WaterValue — значение, когда датчик полностью в воде
const int AirValue = 3500;   
const int WaterValue = 1200;

// ==================== ПЕРЕМЕННЫЕ ====================
unsigned long lastSendTime = 0;
const unsigned long sendInterval = 1800000;  // 30 минут в миллисекундах (30 * 60 * 1000)

// Deep sleep на 30 минут
#define SLEEP_DURATION 30 * 60  // 30 minutes в секундах

void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println("\n\n=== ESP32-C3 Soil Sensor Initialization ===");
  Serial.printf("Field ID: %s\n", fieldId);
  Serial.printf("Server URL: %s\n", serverUrl);
  Serial.printf("Sleep Interval: %d minutes\n", SLEEP_DURATION/60);
  
  // Проверка причины пробуждения
  esp_sleep_wakeup_cause_t wakeup_reason = esp_sleep_get_wakeup_cause();
  switch (wakeup_reason) {
    case ESP_SLEEP_WAKEUP_TIMER:
      Serial.println("⏰ Пробуждение: таймер (sleep завершен)");
      break;
    case ESP_SLEEP_WAKEUP_UNDEFINED:
      Serial.println("🔌 Пробуждение: холодный старт (питание включено)");
      break;
    case ESP_SLEEP_WAKEUP_EXT0:
    case ESP_SLEEP_WAKEUP_EXT1:
      Serial.println("📌 Пробуждение: externe GPIO");
      break;
    default:
      Serial.printf("? Неизвестная причина пробуждения: %d\n", wakeup_reason);
  }

  // Подключение к Wi-Fi
  Serial.print("\n📡 Connecting to WiFi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("");
    Serial.println("✅ WiFi connected");
    Serial.print("📍 IP address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("");
    Serial.println("❌ Failed to connect to WiFi");
  }
}

void loop() {
  // Чтение сырых данных
  int raw1 = analogRead(sensorPin1);
  int raw2 = analogRead(sensorPin2);

  // Перевод в проценты
  int moisture1 = map(raw1, AirValue, WaterValue, 0, 100);
  int moisture2 = map(raw2, AirValue, WaterValue, 0, 100);

  // Ограничение диапазона от 0 до 100
  moisture1 = constrain(moisture1, 0, 100);
  moisture2 = constrain(moisture2, 0, 100);

  // Усредненное значение влажности
  int avgMoisture = (moisture1 + moisture2) / 2;

  // Вывод в монитор порта
  Serial.println("\n--- 📊 Данные датчиков ---");
  Serial.printf("Датчик 1: %d%% (Raw: %d)\n", moisture1, raw1);
  Serial.printf("Датчик 2: %d%% (Raw: %d)\n", moisture2, raw2);
  Serial.printf("Среднее:  %d%%\n", avgMoisture);

  // Отправка данных на сервер
  sendTelemetry(avgMoisture);
  
  // Подготовка и переход в deep sleep
  Serial.println("\n💤 Переход в глубокий сон на 30 минут...");
  Serial.println("===========================================\n");
  
  Serial.flush();  // Убедиться что все данные отправлены в UART перед sleep
  
  // Переход в deep sleep на SLEEP_DURATION секунд
  esp_sleep_enable_timer_wakeup(SLEEP_DURATION * 1000000);  // Конвертируем секунды в микросекунды
  esp_deep_sleep_start();
  
  // Этот код не будет выполнен - device проснется и снова начнется с setup()
}

// ==================== ФУНКЦИЯ ОТПРАВКИ ТЕЛЕМЕТРИИ ====================
void sendTelemetry(int moisture) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("❌ WiFi disconnected - trying to reconnect...");
    WiFi.reconnect();
    delay(1000);
    
    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("❌ Failed to reconnect - proceeding to sleep");
      return;
    }
  }

  HTTPClient http;
  http.setTimeout(5000);  // 5 секунд timeout
  
  Serial.println("\n📡 Отправка данных на сервер...");
  Serial.printf("URL: %s\n", serverUrl);

  // Формирование JSON payload вручную (без внешних библиотек)
  String payloadStr = "{\"field_id\":\"";
  payloadStr += fieldId;
  payloadStr += "\",\"moisture\":";
  payloadStr += String(moisture);
  payloadStr += ",\"temperature\":25,\"battery\":100}";
  
  Serial.printf("Payload: %s\n", payloadStr.c_str());

  // Отправка POST запроса
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");
  
  int httpResponseCode = http.POST(payloadStr);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.printf("✅ Status code: %d\n", httpResponseCode);
    
    if (httpResponseCode == 200) {
      Serial.println("✅ Данные успешно отправлены!");
    } else {
      Serial.printf("⚠️  Response: %s\n", response.c_str());
    }
  } else {
    Serial.printf("❌ HTTP Error: %s\n", http.errorToString(httpResponseCode).c_str());
  }
  
  http.end();
}