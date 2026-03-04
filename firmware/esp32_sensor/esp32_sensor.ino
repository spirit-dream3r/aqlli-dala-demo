#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverName = "http://your-server-ip:8000/sensor-data";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    // Mock sensor readings - replace with actual sensor logic
    float m20 = analogRead(32) / 40.95; // Example moisture at 20cm
    float m40 = analogRead(33) / 40.95; // Example moisture at 40cm
    float temp = 22.5;                  // Example temperature
    
    String url = serverName;
    url += "?device_id=ESP32_01&m20=" + String(m20) + "&m40=" + String(m40) + "&temp=" + String(temp);
    
    http.begin(url);
    int httpResponseCode = http.POST("");
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
  delay(600000); // Send data every 10 minutes
}
