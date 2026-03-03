"""
Tests for phone validation and utilities
"""
import pytest
from utils import validate_phone, normalize_phone, RateLimiter


# ==================== PHONE VALIDATION ====================
def test_validate_phone_valid():
    """Тест валидации правильного номера"""
    is_valid, error = validate_phone("+998901234567")
    assert is_valid == True
    assert error is None


def test_validate_phone_invalid_format():
    """Тест валидации неправильного формата"""
    is_valid, error = validate_phone("12345")
    assert is_valid == False
    assert error is not None


def test_validate_phone_empty():
    """Тест валидации пустого номера"""
    is_valid, error = validate_phone("")
    assert is_valid == False
    assert error is not None


def test_validate_phone_wrong_country():
    """Тест валидации номера другой страны"""
    is_valid, error = validate_phone("+1234567890")
    assert is_valid == False


# ==================== PHONE NORMALIZATION ====================
def test_normalize_phone_with_plus():
    """Тест нормализации номера с +"""
    result = normalize_phone("+998901234567")
    assert result == "+998901234567"


def test_normalize_phone_without_plus():
    """Тест нормализации номера без +"""
    result = normalize_phone("998901234567")
    assert result == "+998901234567"


def test_normalize_phone_with_8():
    """Тест нормализации номера с 8"""
    result = normalize_phone("8901234567")  # 8 + 9 цифр = 10 цифр
    assert result == "+998901234567"


def test_normalize_phone_invalid():
    """Тест нормализации невалидного номера"""
    result = normalize_phone("12345")
    assert result is None


def test_normalize_phone_with_spaces():
    """Тест нормализации номера с пробелами"""
    result = normalize_phone("+998 90 123 45 67")
    assert result == "+998901234567"


# ==================== RATE LIMITER ====================
def test_rate_limiter_allows_first_requests():
    """Тест разрешения первых запросов"""
    limiter = RateLimiter(max_requests=5, window_seconds=60)
    
    for i in range(5):
        is_allowed, retry_after = limiter.is_allowed("test_user")
        assert is_allowed == True
        assert retry_after == 0


def test_rate_limiter_blocks_excess_requests():
    """Тест блокировки лишних запросов"""
    limiter = RateLimiter(max_requests=2, window_seconds=60)
    
    # Первые 2 запроса разрешены
    limiter.is_allowed("test_user")
    limiter.is_allowed("test_user")
    
    # Третий должен быть заблокирован
    is_allowed, retry_after = limiter.is_allowed("test_user")
    assert is_allowed == False
    assert retry_after > 0


def test_rate_limiter_different_keys():
    """Тест разных ключей"""
    limiter = RateLimiter(max_requests=1, window_seconds=60)
    
    # Первый пользователь
    is_allowed_1, _ = limiter.is_allowed("user1")
    assert is_allowed_1 == True
    
    # Второй пользователь (должен быть разрешен)
    is_allowed_2, _ = limiter.is_allowed("user2")
    assert is_allowed_2 == True


def test_rate_limiter_resets_after_window():
    """Тест сброса после окна времени"""
    import time
    
    limiter = RateLimiter(max_requests=1, window_seconds=1)
    
    # Первый запрос
    is_allowed, _ = limiter.is_allowed("test_user")
    assert is_allowed == True
    
    # Второй запрос (должен быть заблокирован)
    is_allowed, _ = limiter.is_allowed("test_user")
    assert is_allowed == False
    
    # Ждем окончания окна
    time.sleep(1.1)
    
    # Третий запрос (должен быть разрешен после сброса)
    is_allowed, _ = limiter.is_allowed("test_user")
    assert is_allowed == True
