"""
Click SMS API integration for Uzbekistan.
Documentation: https://click.uz/api/sms
"""
import httpx
import hashlib
import time
from typing import Optional, Dict, Any, List
from config import settings


class ClickSMSException(Exception):
    """Исключение для Click SMS API"""
    pass


class ClickSMSService:
    """
    Сервис SMS уведомлений через Click.uz
    
    Для работы необходимо:
    1. Зарегистрироваться на https://click.uz
    2. Получить API ключ в личном кабинете
    3. Пополнить баланс
    """
    
    BASE_URL = "https://online.click.uz/api/v2"
    
    def __init__(
        self,
        api_key: Optional[str] = None,
        api_secret: Optional[str] = None
    ):
        self.api_key = api_key or settings.CLICK_API_KEY
        self.api_secret = api_secret or settings.CLICK_API_SECRET
        self.timeout = 30.0
    
    def _generate_sign(self, params: Dict[str, Any]) -> str:
        """
        Генерация подписи для запроса.
        
        Формула: MD5(api_key + api_secret + param1 + param2 + ... + timestamp)
        """
        sorted_params = sorted(params.items())
        param_string = ''.join([str(v) for k, v in sorted_params])
        
        sign_string = f"{self.api_key}{self.api_secret}{param_string}"
        return hashlib.md5(sign_string.encode()).hexdigest()
    
    async def send_sms(
        self,
        phone: str,
        message: str,
        sender_id: str = "AqlliDala"
    ) -> Dict[str, Any]:
        """
        Отправка SMS сообщения.
        
        Args:
            phone: Номер телефона в формате +998XXXXXXXXX
            message: Текст сообщения (до 70 символов для кириллицы)
            sender_id: Имя отправителя (должно быть зарегистрировано)
            
        Returns:
            Результат отправки
        """
        if not self.api_key or not self.api_secret:
            raise ClickSMSException("API ключи Click не настроены")
        
        # Нормализация номера
        phone = phone.replace('+', '').replace(' ', '').replace('-', '')
        
        if not phone.startswith('998'):
            phone = '998' + phone
        
        timestamp = str(int(time.time()))
        
        params = {
            'api_key': self.api_key,
            'mobile': phone,
            'text': message,
            'sender_id': sender_id,
            'timestamp': timestamp,
        }
        
        # Генерация подписи
        params['sign'] = self._generate_sign(params)
        
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(
                    f"{self.BASE_URL}/sms/send",
                    json=params,
                    headers={'Content-Type': 'application/json'}
                )
                
                result = response.json()
                
                if result.get('error_code') == 0:
                    return {
                        'success': True,
                        'message_id': result.get('message_id'),
                        'status': 'sent',
                        'cost': result.get('cost'),
                        'credits': result.get('credits'),
                    }
                else:
                    return {
                        'success': False,
                        'error_code': result.get('error_code'),
                        'error_message': result.get('error_message'),
                    }
                    
        except httpx.RequestError as e:
            raise ClickSMSException(f"Ошибка запроса: {e}")
        except Exception as e:
            raise ClickSMSException(f"Неизвестная ошибка: {e}")
    
    async def send_bulk_sms(
        self,
        recipients: List[str],
        message: str,
        sender_id: str = "AqlliDala"
    ) -> List[Dict[str, Any]]:
        """
        Массовая рассылка SMS.
        
        Args:
            recipients: Список номеров телефонов
            message: Текст сообщения
            sender_id: Имя отправителя
            
        Returns:
            Список результатов для каждого номера
        """
        results = []
        
        for phone in recipients:
            try:
                result = await self.send_sms(phone, message, sender_id)
                results.append({
                    'phone': phone,
                    **result
                })
                
                # Небольшая задержка между запросами
                await asyncio.sleep(0.1)
                
            except Exception as e:
                results.append({
                    'phone': phone,
                    'success': False,
                    'error': str(e)
                })
        
        return results
    
    async def get_balance(self) -> Optional[float]:
        """
        Получение баланса счета.
        
        Returns:
            Баланс в сумах или None при ошибке
        """
        if not self.api_key or not self.api_secret:
            return None
        
        timestamp = str(int(time.time()))
        
        params = {
            'api_key': self.api_key,
            'timestamp': timestamp,
        }
        
        params['sign'] = self._generate_sign(params)
        
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(
                    f"{self.BASE_URL}/balance",
                    json=params,
                    headers={'Content-Type': 'application/json'}
                )
                
                result = response.json()
                
                if result.get('error_code') == 0:
                    return float(result.get('balance', 0))
                    
        except Exception:
            pass
        
        return None
    
    async def get_sms_status(self, message_id: str) -> Optional[str]:
        """
        Получение статуса SMS сообщения.
        
        Статусы:
        - 0: Отправлено
        - 1: Доставлено
        - 2: Не доставлено
        - 3: Ожидает отправки
        
        Args:
            message_id: ID сообщения
            
        Returns:
            Статус сообщения
        """
        timestamp = str(int(time.time()))
        
        params = {
            'api_key': self.api_key,
            'message_id': message_id,
            'timestamp': timestamp,
        }
        
        params['sign'] = self._generate_sign(params)
        
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(
                    f"{self.BASE_URL}/sms/status",
                    json=params,
                    headers={'Content-Type': 'application/json'}
                )
                
                result = response.json()
                
                if result.get('error_code') == 0:
                    return result.get('status')
                    
        except Exception:
            pass
        
        return None


# ==================== NOTIFICATION TEMPLATES ====================
def get_verification_code_template(code: str) -> str:
    """Шаблон SMS с кодом подтверждения"""
    return f"Aqlli Dala: Код подтверждения: {code}. Действует 10 минут."


def get_low_moisture_template(field_name: str, moisture: int) -> str:
    """Шаблон SMS о низкой влажности"""
    return f"Aqlli Dala: Тревога! Поле '{field_name}': влажность {moisture}%. Требуется полив!"


def get_weather_alert_template(field_name: str, message: str) -> str:
    """Шаблон SMS о погодных условиях"""
    return f"Aqlli Dala: Поле '{field_name}': {message}"


def get_payment_template(amount: float, balance: float) -> str:
    """Шаблон SMS об оплате"""
    return f"Aqlli Dala: Оплата {amount} сум. Баланс: {balance} сум."


# ==================== MAIN FUNCTION ====================
async def send_verification_sms(phone: str, code: str) -> Dict[str, Any]:
    """
    Отправка SMS с кодом подтверждения.
    
    Args:
        phone: Номер телефона
        code: Код подтверждения
        
    Returns:
        Результат отправки
    """
    service = ClickSMSService()
    message = get_verification_code_template(code)
    
    return await service.send_sms(phone, message)


async def send_alert_sms(
    phone: str,
    field_name: str,
    moisture: int
) -> Dict[str, Any]:
    """
    Отправка SMS тревоги о низкой влажности.
    
    Args:
        phone: Номер телефона
        field_name: Название поля
        moisture: Текущая влажность
        
    Returns:
        Результат отправки
    """
    service = ClickSMSService()
    message = get_low_moisture_template(field_name, moisture)
    
    return await service.send_sms(phone, message)


async def check_and_send_alerts(
    fields_with_low_moisture: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:
    """
    Проверка и отправка SMS тревог для всех полей с низкой влажностью.
    
    Args:
        fields_with_low_moisture: Список полей с данными:
            - field_name
            - moisture
            - owner_phone
            
    Returns:
        Список результатов отправки
    """
    results = []
    
    for field in fields_with_low_moisture:
        try:
            result = await send_alert_sms(
                field['owner_phone'],
                field['field_name'],
                field['moisture']
            )
            results.append({
                'field': field['field_name'],
                **result
            })
        except Exception as e:
            results.append({
                'field': field['field_name'],
                'success': False,
                'error': str(e)
            })
    
    return results
