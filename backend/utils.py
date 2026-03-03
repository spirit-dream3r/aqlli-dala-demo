"""
Utility modules for validation, logging, and helpers.
"""
import re
from typing import Optional, Tuple
from loguru import logger
from config import settings


# ==================== LOGGING SETUP ====================
def setup_logging():
    """Настройка логирования с Loguru"""
    logger.remove()  # Удалить стандартный обработчик
    
    # Консольный вывод
    logger.add(
        "logs/app_{time:YYYY-MM-DD}.log",
        rotation="00:00",
        retention="7 days",
        compression="zip",
        level=settings.LOG_LEVEL,
        format=settings.LOG_FORMAT,
        encoding="utf-8"
    )
    
    logger.add(
        "logs/error_{time:YYYY-MM-DD}.log",
        rotation="00:00",
        retention="30 days",
        compression="zip",
        level="ERROR",
        format=settings.LOG_FORMAT,
        encoding="utf-8"
    )
    
    return logger


# ==================== PHONE VALIDATION ====================
def validate_phone(phone: str) -> Tuple[bool, Optional[str]]:
    """
    Валидация номера телефона для Узбекистана.
    
    Args:
        phone: Номер телефона для проверки
        
    Returns:
        Tuple[bool, Optional[str]]: (успех, сообщение об ошибке или None)
    """
    if not phone:
        return False, "Номер телефона не может быть пустым"
    
    # Удаляем все нецифровые символы кроме +
    cleaned = re.sub(r'[^\d+]', '', phone)
    
    # Проверяем формат
    pattern = settings.PHONE_PATTERN
    if not re.match(pattern, cleaned):
        return False, f"Неверный формат номера. Ожидается: +998XXXXXXXXX"
    
    return True, None


def normalize_phone(phone: str) -> Optional[str]:
    """
    Нормализация номера телефона к единому формату.

    Args:
        phone: Номер телефона

    Returns:
        Нормализованный номер или None если невалидный
    """
    # Удаляем все нецифровые символы
    cleaned = re.sub(r'[^\d]', '', phone)

    # Если начинается с 8 и длина 10 цифр (8901234567) -> +998901234567
    if cleaned.startswith('8') and len(cleaned) == 10:
        cleaned = '+998' + cleaned[1:]
    # Если начинается с 998 и длина 12 цифр (998901234567) -> +998901234567
    elif len(cleaned) == 12:
        cleaned = '+' + cleaned
    # Если 10 цифр без 8 (901234567) -> +998901234567
    elif len(cleaned) == 9:
        cleaned = '+998' + cleaned

    # Финальная проверка
    is_valid, _ = validate_phone(cleaned)
    return cleaned if is_valid else None


# ==================== RATE LIMITING HELPER ====================
class RateLimiter:
    """Простой rate limiter на основе памяти"""
    
    def __init__(self, max_requests: int, window_seconds: int = 60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._requests: dict[str, list[float]] = {}
    
    def is_allowed(self, key: str) -> Tuple[bool, int]:
        """
        Проверка, разрешен ли запрос.
        
        Args:
            key: Уникальный ключ (например, IP или phone)
            
        Returns:
            Tuple[bool, int]: (разрешено, секунд до сброса)
        """
        import time
        now = time.time()
        
        if key not in self._requests:
            self._requests[key] = []
        
        # Удаляем старые запросы
        self._requests[key] = [
            ts for ts in self._requests[key]
            if now - ts < self.window_seconds
        ]
        
        if len(self._requests[key]) >= self.max_requests:
            # Вычисляем время до сброса
            oldest = min(self._requests[key])
            retry_after = int(self.window_seconds - (now - oldest)) + 1
            return False, retry_after
        
        self._requests[key].append(now)
        return True, 0


# ==================== RETRY DECORATOR ====================
from functools import wraps
import asyncio


def retry_async(attempts: int = 3, delay: int = 5, exceptions: tuple = (Exception,)):
    """
    Декоратор для автоматических повторных попыток.
    
    Args:
        attempts: Количество попыток
        delay: Задержка между попытками (секунды)
        exceptions: Типы исключений для обработки
    """
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            last_exception = None
            
            for attempt in range(1, attempts + 1):
                try:
                    return await func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    if attempt < attempts:
                        logger.warning(
                            f"Попытка {attempt}/{attempts} не удалась: {e}. "
                            f"Повтор через {delay}с..."
                        )
                        await asyncio.sleep(delay)
                    else:
                        logger.error(f"Все {attempts} попыток не удались: {e}")
            
            raise last_exception
        
        return wrapper
    return decorator


# ==================== IP ADDRESS EXTRACTOR ====================
def get_client_ip(headers: dict, client: Optional[Tuple[str, int]] = None) -> str:
    """
    Извлечение IP адреса клиента из заголовков.
    
    Args:
        headers: Заголовки запроса
        client: Информация о клиенте
        
    Returns:
        IP адрес клиента
    """
    # Проверка X-Forwarded-For (для reverse proxy)
    forwarded_for = headers.get("x-forwarded-for")
    if forwarded_for:
        # Берем первый IP из списка
        return forwarded_for.split(",")[0].strip()
    
    # Проверка X-Real-IP
    real_ip = headers.get("x-real-ip")
    if real_ip:
        return real_ip
    
    # Fallback на client host
    if client:
        return client[0]
    
    return "unknown"
