"""
Weather service integration with OpenWeatherMap API.
Provides weather data, forecasts, and evapotranspiration calculations.
"""
import httpx
from datetime import datetime, timedelta
from typing import Optional, Dict, List, Any
from config import settings


class WeatherService:
    """Сервис погоды с интеграцией OpenWeatherMap"""
    
    BASE_URL = "https://api.openweathermap.org/data/2.5"
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.OPENWEATHER_API_KEY
        self.timeout = 10.0
    
    async def get_current_weather(
        self,
        lat: float,
        lon: float
    ) -> Optional[Dict[str, Any]]:
        """
        Получение текущей погоды по координатам.
        
        Args:
            lat: Широта
            lon: Долгота
            
        Returns:
            Данные о текущей погоде или None
        """
        if not self.api_key:
            return None
        
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(
                    f"{self.BASE_URL}/weather",
                    params={
                        'lat': lat,
                        'lon': lon,
                        'appid': self.api_key,
                        'units': 'metric',
                        'lang': 'ru'
                    }
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return {
                        'temperature': data['main']['temp'],
                        'feels_like': data['main']['feels_like'],
                        'humidity': data['main']['humidity'],
                        'pressure': data['main']['pressure'],
                        'wind_speed': data['wind']['speed'],
                        'clouds': data['clouds']['all'],
                        'description': data['weather'][0]['description'],
                        'icon': data['weather'][0]['icon'],
                        'sunrise': data['sys']['sunrise'],
                        'sunset': data['sys']['sunset'],
                        'timestamp': datetime.utcnow()
                    }
        except Exception as e:
            print(f"Weather API error: {e}")
        
        return None
    
    async def get_forecast(
        self,
        lat: float,
        lon: float,
        days: int = 5
    ) -> Optional[List[Dict[str, Any]]]:
        """
        Получение прогноза погоды.
        
        Args:
            lat: Широта
            lon: Долгота
            days: Количество дней (1-5)
            
        Returns:
            Список прогнозов или None
        """
        if not self.api_key:
            return None
        
        days = min(max(days, 1), 5)  # 1-5 дней
        
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(
                    f"{self.BASE_URL}/forecast",
                    params={
                        'lat': lat,
                        'lon': lon,
                        'appid': self.api_key,
                        'units': 'metric',
                        'lang': 'ru',
                        'cnt': days * 8  # 8 измерений в день
                    }
                )
                
                if response.status_code == 200:
                    data = response.json()
                    forecasts = []
                    
                    # Группировка по дням
                    daily_data = {}
                    for item in data['list']:
                        dt = datetime.fromtimestamp(item['dt'])
                        date_key = dt.strftime('%Y-%m-%d')
                        
                        if date_key not in daily_data:
                            daily_data[date_key] = []
                        daily_data[date_key].append(item)
                    
                    # Агрегация данных по дням
                    for date_key, items in daily_data.items():
                        temps = [i['main']['temp'] for i in items]
                        humidities = [i['main']['humidity'] for i in items]
                        
                        forecasts.append({
                            'date': date_key,
                            'temp_min': min(temps),
                            'temp_max': max(temps),
                            'temp_avg': sum(temps) / len(temps),
                            'humidity': sum(humidities) / len(humidities),
                            'description': items[0]['weather'][0]['description'],
                            'icon': items[0]['weather'][0]['icon'],
                            'precipitation': self._estimate_precipitation(items),
                            'wind_speed': sum([i['wind']['speed'] for i in items]) / len(items)
                        })
                    
                    return forecasts[:days]
        except Exception as e:
            print(f"Weather forecast API error: {e}")
        
        return None
    
    def _estimate_precipitation(self, items: List[Dict]) -> float:
        """Оценка осадков на основе данных API"""
        total = 0
        for item in items:
            if 'rain' in item:
                total += item['rain'].get('3h', 0)
            if 'snow' in item:
                total += item['snow'].get('3h', 0)
        return total
    
    async def calculate_evapotranspiration(
        self,
        lat: float,
        lon: float,
        crop_coefficient: float = 1.0
    ) -> Optional[float]:
        """
        Расчет эвапотранспирации по формуле FAO-56.
        
        ETo = 0.408 * Δ * (Rn - G) + γ * (900 / (T + 273)) * u2 * (es - ea)
              Δ + γ * (1 + 0.34 * u2)
        
        Args:
            lat: Широта
            lon: Долгота
            crop_coefficient: Коэффициент культуры (Kc)
            
        Returns:
            ETo в мм/день или None
        """
        weather = await self.get_current_weather(lat, lon)
        
        if not weather:
            return None
        
        T = weather['temperature']  # Температура °C
        RH = weather['humidity']  # Влажность %
        u2 = weather['wind_speed']  # Скорость ветра м/с
        P = weather['pressure']  # Давление гПа
        
        # Упрощенный расчет
        # Давление пара насыщения (es)
        es = 0.6108 * (2.71828 ** (17.27 * T / (T + 237.3)))
        
        # Фактическое давление пара (ea)
        ea = es * (RH / 100)
        
        # Психрометрическая константа (γ)
        gamma = 0.665e-3 * P
        
        # Наклон кривой давления пара (Δ)
        delta = (4098 * es) / ((T + 237.3) ** 2)
        
        # Чистая радиация (Rn) - упрощенно
        # В реальности нужно больше данных о солнечной радиации
        Rn = 0.77 * (1 - 0.9 * (weather['clouds'] / 100)) * 15  # Примерно
        
        # Поток тепла в почве (G) - обычно мал для дневных расчетов
        G = 0
        
        # ETo по формуле Penman-Monteith
        numerator = (
            0.408 * delta * (Rn - G) +
            gamma * (900 / (T + 273)) * u2 * (es - ea)
        )
        denominator = delta + gamma * (1 + 0.34 * u2)
        
        ETo = numerator / denominator
        
        # ETc с учетом культуры
        ETc = ETo * crop_coefficient
        
        return max(0, ETc)  # Не может быть отрицательным
    
    async def get_irrigation_recommendation(
        self,
        lat: float,
        lon: float,
        current_moisture: float,
        threshold: float = 25,
        crop_coefficient: float = 1.0
    ) -> Optional[Dict[str, Any]]:
        """
        Рекомендация по поливу на основе погоды и влажности.
        
        Args:
            lat: Широта
            lon: Долгота
            current_moisture: Текущая влажность почвы %
            threshold: Порог влажности %
            crop_coefficient: Коэффициент культуры
            
        Returns:
            Рекомендация по поливу
        """
        weather = await self.get_current_weather(lat, lon)
        forecast = await self.get_forecast(lat, lon, days=3)
        eto = await self.calculate_evapotranspiration(lat, lon, crop_coefficient)
        
        if not weather or not forecast:
            return None
        
        # Анализ прогноза осадков
        total_precipitation = sum([f.get('precipitation', 0) for f in forecast])
        
        # Рекомендация
        moisture_deficit = threshold - current_moisture
        
        if current_moisture >= threshold:
            recommendation = "no_irrigation"
            message = "Полив не требуется"
            urgency = "low"
        elif moisture_deficit < 5 and total_precipitation > 5:
            recommendation = "wait"
            message = "Ожидаются осадки, можно подождать"
            urgency = "low"
        elif moisture_deficit >= 10:
            recommendation = "irrigate_now"
            message = "Требуется срочный полив"
            urgency = "high"
        else:
            recommendation = "irrigate_soon"
            message = "Рекомендуется полив в ближайшие 1-2 дня"
            urgency = "medium"
        
        return {
            'recommendation': recommendation,
            'message': message,
            'urgency': urgency,
            'current_moisture': current_moisture,
            'threshold': threshold,
            'moisture_deficit': moisture_deficit,
            'eto': eto,
            'temperature': weather['temperature'],
            'humidity': weather['humidity'],
            'precipitation_forecast': total_precipitation,
            'forecast_summary': forecast[0]['description'] if forecast else None,
            'timestamp': datetime.utcnow()
        }


# ==================== MAIN FUNCTION ====================
async def get_weather_data(
    lat: float,
    lon: float,
    include_forecast: bool = True,
    include_recommendation: bool = False,
    current_moisture: float = None,
    threshold: float = 25
) -> Dict[str, Any]:
    """
    Получение всех погодных данных.
    
    Returns:
        Комплексные данные о погоде
    """
    service = WeatherService()
    
    result = {
        'location': {'lat': lat, 'lon': lon},
        'timestamp': datetime.utcnow()
    }
    
    # Текущая погода
    current = await service.get_current_weather(lat, lon)
    result['current'] = current
    
    # Прогноз
    if include_forecast and current:
        forecast = await service.get_forecast(lat, lon)
        result['forecast'] = forecast
    
    # Рекомендация по поливу
    if include_recommendation and current_moisture is not None and current:
        recommendation = await service.get_irrigation_recommendation(
            lat, lon, current_moisture, threshold
        )
        result['recommendation'] = recommendation
    
    return result
