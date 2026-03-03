"""
Security module for JWT authentication and password hashing.
"""
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from config import settings

# ==================== PASSWORD HASHING ====================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Проверка пароля"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Хеширование пароля"""
    return pwd_context.hash(password)


# ==================== JWT TOKENS ====================
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Создание JWT access токена.
    
    Args:
        data: Данные для кодирования (обычно {"sub": user_id})
        expires_delta: Время жизни токена
        
    Returns:
        Закодированный JWT токен
    """
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=settings.JWT_EXPIRATION_HOURS)
    
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    
    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )
    
    return encoded_jwt


def create_refresh_token(data: dict) -> str:
    """
    Создание JWT refresh токена (длительный).
    
    Returns:
        Закодированный JWT токен
    """
    expires_delta = timedelta(days=7)  # 7 дней
    return create_access_token(data, expires_delta)


def decode_token(token: str) -> Optional[dict]:
    """
    Декодирование JWT токена.
    
    Args:
        token: JWT токен
        
    Returns:
        Декодированные данные или None если токен невалидный
    """
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM]
        )
        return payload
    except JWTError:
        return None


def verify_token(token: str) -> tuple[bool, Optional[dict]]:
    """
    Проверка JWT токена.
    
    Args:
        token: JWT токен
        
    Returns:
        Tuple[bool, Optional[dict]]: (успех, данные или None)
    """
    payload = decode_token(token)
    
    if not payload:
        return False, None
    
    # Проверка истечения срока
    exp = payload.get("exp")
    if not exp or datetime.utcnow() > datetime.fromtimestamp(exp):
        return False, None
    
    return True, payload
