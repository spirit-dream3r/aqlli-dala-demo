"""
Pydantic schemas for authentication and user management.
"""
from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime
from utils import normalize_phone


# ==================== AUTH SCHEMAS ====================
class UserRegister(BaseModel):
    """Схема регистрации пользователя"""
    full_name: str = Field(..., min_length=1, max_length=255)
    phone_number: str = Field(..., min_length=10, max_length=20)
    password: str = Field(..., min_length=6, max_length=128)
    
    @field_validator('phone_number')
    @classmethod
    def validate_phone(cls, v: str) -> str:
        normalized = normalize_phone(v)
        if not normalized:
            raise ValueError("Неверный формат номера телефона")
        return normalized
    
    @field_validator('password')
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 6:
            raise ValueError("Пароль должен быть не менее 6 символов")
        return v


class UserLogin(BaseModel):
    """Схема входа пользователя"""
    phone_number: str = Field(..., min_length=10, max_length=20)
    password: str = Field(..., min_length=1)
    
    @field_validator('phone_number')
    @classmethod
    def validate_phone(cls, v: str) -> str:
        normalized = normalize_phone(v)
        if not normalized:
            raise ValueError("Неверный формат номера телефона")
        return normalized


class TokenResponse(BaseModel):
    """Ответ с токенами"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int  # seconds


class TokenRefresh(BaseModel):
    """Схема обновления токена"""
    refresh_token: str = Field(..., min_length=1)


# ==================== USER SCHEMAS ====================
class UserBase(BaseModel):
    """Базовая схема пользователя"""
    full_name: str
    phone_number: str
    telegram_username: Optional[str] = None
    language: str = "uz"


class UserCreate(UserBase):
    """Схема создания пользователя"""
    password: str


class UserUpdate(BaseModel):
    """Схема обновления пользователя"""
    full_name: Optional[str] = None
    language: Optional[str] = None
    is_active: Optional[bool] = None


class UserResponse(BaseModel):
    """Ответ с данными пользователя"""
    id: int
    full_name: str
    phone_number: str
    telegram_id: Optional[int] = None
    telegram_username: Optional[str] = None
    language: str
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class UserProfileResponse(BaseModel):
    """Расширенный ответ с профилем пользователя"""
    user: UserResponse
    fields_count: int = 0
    total_area_hectares: float = 0.0


# ==================== PASSWORD SCHEMAS ====================
class PasswordChange(BaseModel):
    """Схема смены пароля"""
    old_password: str = Field(..., min_length=1)
    new_password: str = Field(..., min_length=6, max_length=128)
    
    @field_validator('new_password')
    @classmethod
    def validate_new_password(cls, v: str) -> str:
        if len(v) < 6:
            raise ValueError("Новый пароль должен быть не менее 6 символов")
        return v


class PasswordResetRequest(BaseModel):
    """Запрос на сброс пароля"""
    phone_number: str = Field(..., min_length=10, max_length=20)
    
    @field_validator('phone_number')
    @classmethod
    def validate_phone(cls, v: str) -> str:
        normalized = normalize_phone(v)
        if not normalized:
            raise ValueError("Неверный формат номера телефона")
        return normalized


class PasswordResetConfirm(BaseModel):
    """Подтверждение сброса пароля"""
    phone_number: str
    reset_code: str = Field(..., min_length=4, max_length=8)
    new_password: str = Field(..., min_length=6, max_length=128)
    
    @field_validator('new_password')
    @classmethod
    def validate_new_password(cls, v: str) -> str:
        if len(v) < 6:
            raise ValueError("Новый пароль должен быть не менее 6 символов")
        return v


# ==================== SMS VERIFICATION ====================
class SMSCodeRequest(BaseModel):
    """Запрос SMS кода"""
    phone_number: str = Field(..., min_length=10, max_length=20)
    
    @field_validator('phone_number')
    @classmethod
    def validate_phone(cls, v: str) -> str:
        normalized = normalize_phone(v)
        if not normalized:
            raise ValueError("Неверный формат номера телефона")
        return normalized


class SMSCodeVerify(BaseModel):
    """Проверка SMS кода"""
    phone_number: str
    code: str = Field(..., min_length=4, max_length=8)


# ==================== FIELD SCHEMAS ====================
class FieldResponse(BaseModel):
    """Ответ с данными поля"""
    id: int
    field_name: str
    crop_type: str
    moisture_threshold: int
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    area_hectares: float
    created_at: datetime
    
    class Config:
        from_attributes = True


class FieldCreate(BaseModel):
    """Создание поля"""
    field_name: str = Field(..., min_length=1, max_length=255)
    crop_type: str = Field(default="unknown", max_length=100)
    latitude: Optional[float] = Field(default=None, ge=-90, le=90)
    longitude: Optional[float] = Field(default=None, ge=-180, le=180)
    area_hectares: float = Field(default=1.0, gt=0)
    moisture_threshold: int = Field(default=25, ge=0, le=100)


class FieldUpdate(BaseModel):
    """Обновление поля"""
    field_name: Optional[str] = None
    crop_type: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    area_hectares: Optional[float] = None
    moisture_threshold: Optional[int] = None
