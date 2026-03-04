/*
 * Тестовый скетч для калибровки датчиков влажности почвы v1.2
 * 
 * Используйте этот скетч для определения значений CALIBRATION_DRY и CALIBRATION_WET
 * 
 * ИНСТРУКЦИЯ:
 * 1. Загрузите скетч на ESP32-C3
 * 2. Откройте Serial Monitor (115200 бод)
 * 3. Поместите датчик в сухой воздух → запишите среднее значение (CALIBRATION_DRY)
 * 4. Поместите датчик в стакан с водой → запишите среднее значение (CALIBRATION_WET)
 * 5. Вставьте значения в основную прошивку esp32c3_soil_sensor.ino
 */

#include <driver/adc.h>

// Пины датчиков (ESP32-C3)
const int SENSOR_1_PIN = 4;  // GPIO4
const int SENSOR_2_PIN = 5;  // GPIO5

// Количество измерений для усреднения
const int SAMPLES = 20;
const int DELAY_MS = 100;

void setup() {
  Serial.begin(115200);
  
  Serial.println("\n");
  Serial.println("╔══════════════════════════════════════════════╗");
  Serial.println("║   Калибровка датчиков влажности почвы v1.2  ║");
  Serial.println("║        ESP32-C3 Super Mini                  ║");
  Serial.println("╚══════════════════════════════════════════════╝");
  Serial.println();
  
  // Инициализация ADC
  adc1_config_width(ADC_WIDTH_BIT_12);
  adc1_config_channel_atten(ADC1_CHANNEL_4, ADC_ATTEN_DB_11);
  adc1_config_channel_atten(ADC1_CHANNEL_5, ADC_ATTEN_DB_11);
  
  Serial.println("Настройки ADC: 12 бит (0-4095), аттенюация 11dB");
  Serial.println();
  Serial.println("ИНСТРУКЦИЯ ПО КАЛИБРОВКЕ:");
  Serial.println("1. Поместите оба датчика в сухой воздух");
  Serial.println("2. Дождитесь стабильных показаний");
  Serial.println("3. Запишите значение 'Сухой' для каждого датчика");
  Serial.println("4. Поместите датчики в стакан с водой");
  Serial.println("5. Дождитесь стабильных показаний");
  Serial.println("6. Запишите значение 'Вода' для каждого датчика");
  Serial.println();
  Serial.println("Эти значения используйте в основной прошивке:");
  Serial.println("  CALIBRATION_DRY = <значение в воздухе>");
  Serial.println("  CALIBRATION_WET = <значение в воде>");
  Serial.println();
  Serial.println("─────────────────────────────────────────────────");
}

void loop() {
  // Чтение датчика 1
  int sensor1_total = 0;
  for (int i = 0; i < SAMPLES; i++) {
    sensor1_total += analogRead(SENSOR_1_PIN);
    delay(DELAY_MS);
  }
  int sensor1_avg = sensor1_total / SAMPLES;
  
  // Чтение датчика 2
  int sensor2_total = 0;
  for (int i = 0; i < SAMPLES; i++) {
    sensor2_total += analogRead(SENSOR_2_PIN);
    delay(DELAY_MS);
  }
  int sensor2_avg = sensor2_total / SAMPLES;
  
  // Вывод результатов
  Serial.println("┌─────────────────────────────────────────────┐");
  Serial.println("│  Показания датчиков (ADC значения 0-4095)  │");
  Serial.println("├─────────────────────────────────────────────┤");
  Serial.print("│  Датчик 1 (GPIO4): ");
  Serial.print(sensor1_avg);
  Serial.println("                          │");
  Serial.print("│  Датчик 2 (GPIO5): ");
  Serial.print(sensor2_avg);
  Serial.println("                          │");
  Serial.println("└─────────────────────────────────────────────┘");
  Serial.println();
  
  // Рекомендации
  Serial.println("Рекомендации:");
  if (sensor1_avg > 3500) {
    Serial.println("  ⚠️  Датчик 1: Очень высокое значение (возможно обрыв)");
  } else if (sensor1_avg < 1000) {
    Serial.println("  ⚠️  Датчик 1: Очень низкое значение (возможно КЗ)");
  } else {
    Serial.println("  ✓  Датчик 1: В норме");
  }
  
  if (sensor2_avg > 3500) {
    Serial.println("  ⚠️  Датчик 2: Очень высокое значение (возможно обрыв)");
  } else if (sensor2_avg < 1000) {
    Serial.println("  ⚠️  Датчик 2: Очень низкое значение (возможно КЗ)");
  } else {
    Serial.println("  ✓  Датчик 2: В норме");
  }
  
  Serial.println();
  Serial.println("─────────────────────────────────────────────────");
  Serial.println();
  
  delay(2000); // Пауза перед следующим измерением
}
