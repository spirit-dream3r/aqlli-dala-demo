/*
 * Тест WiFi подключения для ESP32-C3
 * Проверяет подключение к WiFi сети без отправки данных на сервер
 */

#include <WiFi.h>

// ==================== НАСТРОЙКИ WiFi ====================
const char* WIFI_SSID = "24-53";
const char* WIFI_PASSWORD = "23091951";

void setup() {
  Serial.begin(115200);
  
  Serial.println();
  Serial.println("╔════════════════════════════════════════╗");
  Serial.println("║      WiFi Connection Test              ║");
  Serial.println("║      Тест подключения к WiFi           ║");
  Serial.println("╚════════════════════════════════════════╝");
  Serial.println();
  
  // Отключаем WiFi для начала
  WiFi.mode(WIFI_MODE_NULL);
  delay(100);
  
  // Включаем WiFi
  WiFi.mode(WIFI_STA);
  delay(100);
  
  Serial.print("📡 Подключение к сети: ");
  Serial.println(WIFI_SSID);
  Serial.print("🔑 Пароль: ");
  Serial.println(WIFI_PASSWORD);
  Serial.println();
  
  // Подключение
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  int timeout = 30; // 30 секунд
  Serial.print("⏳ Ожидание подключения");
  
  while (WiFi.status() != WL_CONNECTED && timeout > 0) {
    delay(500);
    Serial.print(".");
    timeout--;
  }
  
  Serial.println();
  Serial.println();
  
  // Результат
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("✅ WiFi ПОДКЛЮЧЕНО!");
    Serial.println();
    Serial.println("╔════════════════════════════════════════╗");
    Serial.println("║         ИНФОРМАЦИЯ О СЕТИ            ║");
    Serial.println("╠════════════════════════════════════════╣");
    Serial.print("║  📶 SSID:          ");
    Serial.println(WiFi.SSID().length() > 18 ? WiFi.SSID().substring(0, 15) + "..." : WiFi.SSID());
    Serial.print("║  🔗 IP адрес:      ");
    Serial.println(WiFi.localIP());
    Serial.print("║  📡 MAC адрес:     ");
    Serial.println(WiFi.macAddress());
    Serial.print("║  📶 RSSI:          ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
    Serial.print("║  🌐 Канал:         ");
    Serial.println(WiFi.channel());
    Serial.print("║  📶 Сигнал:        ");
    Serial.println(getSignalStrength(WiFi.RSSI()));
    Serial.print("║  🚀 Скорость:      ");
    Serial.println(WiFi.getSpeed() / 1000000.0, 1);
    Serial.println("║                        Mbps");
    Serial.println("╚════════════════════════════════════════╝");
    Serial.println();
    
    // Тест ping до шлюза
    Serial.println("🔄 Тест соединения с сервером...");
    Serial.print("   Шлюз: ");
    Serial.println(WiFi.gatewayIP());
    
    // Проверка доступности сервера
    testServerConnection();
    
  } else {
    Serial.println("❌ WiFi НЕ ПОДКЛЮЧЕНО!");
    Serial.println();
    Serial.println("Возможные причины:");
    Serial.println("  • Неверный SSID или пароль");
    Serial.println("  • WiFi сеть 5GHz (ESP32 поддерживает только 2.4GHz)");
    Serial.println("  • Сеть слишком далеко");
    Serial.println("  • WiFi скрыт (скрытый SSID)");
    Serial.println();
    Serial.println("Текущий статус WiFi: " + getWiFiStatus());
  }
}

void loop() {
  // Переподключение каждые 10 секунд если нет подключения
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println();
    Serial.println("🔄 Попытка переподключения через 5 секунд...");
    delay(5000);
    WiFi.reconnect();
  } else {
    delay(10000);
  }
}

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

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

String getSignalStrength(int rssi) {
  if (rssi >= -50) return "Отличный 🔥";
  if (rssi >= -60) return "Хороший 👍";
  if (rssi >= -70) return "Средний 👌";
  if (rssi >= -80) return "Плохой 👎";
  return "Очень плохой 💀";
}

void testServerConnection() {
  Serial.println();
  Serial.println("🌐 Проверка сервера 192.168.1.102:8000...");
  
  WiFiClient client;
  int port = 8000;
  IPAddress serverIP(192, 168, 1, 102);
  
  Serial.print("   Подключение к ");
  Serial.print(serverIP);
  Serial.print(":");
  Serial.println(port);
  
  if (client.connect(serverIP, port)) {
    Serial.println("   ✅ Сервер доступен!");
    client.println("GET /health HTTP/1.1");
    client.println("Host: 192.168.1.102:8000");
    client.println("Connection: close");
    client.println();
    
    // Чтение ответа
    unsigned long timeout = millis();
    while (client.available() == 0) {
      if (millis() - timeout > 5000) {
        Serial.println("   ⏱️ Таймаут ответа");
        client.stop();
        return;
      }
    }
    
    // Вывод первой строки ответа
    String line = client.readStringUntil('\n');
    Serial.println("   Ответ: " + line);
    
    client.stop();
  } else {
    Serial.println("   ❌ Сервер недоступен!");
    Serial.println("   Проверьте что сервер запущен:");
    Serial.println("   cd backend && python -m uvicorn main:app --host 0.0.0.0 --port 8000");
  }
  
  Serial.println();
}
