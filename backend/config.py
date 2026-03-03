import os
import re
from typing import Optional, List
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Конфигурация приложения с валидацией через Pydantic Settings.
    Все переменные окружения загружаются из .env файла.
    """
    
    # ==================== TELEGRAM ====================
    TELEGRAM_BOT_TOKEN: str = Field(
        ...,
        description="Telegram Bot Token от @BotFather",
        min_length=45
    )
    TELEGRAM_CHAT_ID: str = Field(
        ...,
        description="Chat ID для уведомлений (начинается с -100)",
        pattern=r"^-100\d+"
    )
    TELEGRAM_WEBHOOK_SECRET: str = Field(
        ...,
        description="Секретный токен для проверки Telegram webhook",
        min_length=8
    )
    
    # ==================== DATABASE ====================
    DATABASE_URL: str = Field(
        default="sqlite:///./aqlli_dala.db",
        description="URL базы данных (SQLite или PostgreSQL)"
    )
    DB_POOL_SIZE: int = Field(
        default=10,
        ge=1,
        le=50,
        description="Размер пула подключений к БД"
    )
    
    # ==================== SERVER ====================
    HOST: str = Field(default="0.0.0.0", description="Host для сервера")
    PORT: int = Field(default=8000, ge=1, le=65535, description="Port для сервера")
    
    # ==================== CORS ====================
    ALLOWED_ORIGINS: str = Field(
        default="http://localhost:3000,http://127.0.0.1:3000",
        description="Список разрешенных CORS origins (через запятую)"
    )
    
    @field_validator("ALLOWED_ORIGINS")
    @classmethod
    def parse_origins(cls, v: str) -> List[str]:
        return [origin.strip() for origin in v.split(",") if origin.strip()]
    
    # ==================== RATE LIMITING ====================
    RATE_LIMIT_PER_MINUTE: int = Field(
        default=5,
        ge=1,
        le=100,
        description="Лимит запросов в минуту на endpoint /api/lead"
    )
    RATE_LIMIT_ENABLED: bool = Field(
        default=True,
        description="Включить rate limiting"
    )
    
    # ==================== ALERTS ====================
    MOISTURE_THRESHOLD: int = Field(
        default=25,
        ge=0,
        le=100,
        description="Порог влажности для тревоги (%)"
    )
    ALERT_CHECK_INTERVAL: int = Field(
        default=300,
        ge=60,
        le=3600,
        description="Интервал проверки тревог (секунды)"
    )
    
    # ==================== LOGGING ====================
    LOG_LEVEL: str = Field(
        default="INFO",
        description="Уровень логирования",
        pattern="^(DEBUG|INFO|WARNING|ERROR|CRITICAL)$"
    )
    LOG_FORMAT: str = Field(
        default="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        description="Формат логов"
    )
    
    # ==================== SECURITY ====================
    JWT_SECRET_KEY: str = Field(
        default="your-secret-key-change-in-production",
        description="Секретный ключ для JWT токенов",
        min_length=32
    )
    JWT_ALGORITHM: str = Field(default="HS256", description="Алгоритм JWT")
    JWT_EXPIRATION_HOURS: int = Field(default=24, ge=1, le=168)
    
    # ==================== PHONE VALIDATION ====================
    PHONE_PATTERN: str = Field(
        default=r"^\+998\d{9}$",
        description="Regex паттерн для валидации телефонов Узбекистана"
    )
    
    # ==================== RETRY ====================
    TELEGRAM_RETRY_ATTEMPTS: int = Field(
        default=3,
        ge=1,
        le=10,
        description="Количество попыток отправки в Telegram"
    )
    TELEGRAM_RETRY_DELAY: int = Field(
        default=5,
        ge=1,
        le=60,
        description="Задержка между попытками (секунды)"
    )
    
    # ==================== FILE UPLOADS ====================
    MAX_UPLOAD_SIZE_MB: int = Field(
        default=10,
        ge=1,
        le=100,
        description="Максимальный размер загружаемых файлов (MB)"
    )
    MEDIA_DIR: str = Field(default="media", description="Директория для медиафайлов")
    
    # ==================== ENVIRONMENT ====================
    ENVIRONMENT: str = Field(
        default="development",
        description="Окружение (development/production)",
        pattern="^(development|production|testing)$"
    )
    
    # ==================== WEATHER API ====================
    OPENWEATHER_API_KEY: Optional[str] = Field(
        default=None,
        description="API ключ для OpenWeatherMap"
    )
    
    # ==================== SMS API (CLICK.UZ) ====================
    CLICK_API_KEY: Optional[str] = Field(
        default=None,
        description="API ключ для Click.uz SMS"
    )
    CLICK_API_SECRET: Optional[str] = Field(
        default=None,
        description="API секрет для Click.uz SMS"
    )
    
    @field_validator("TELEGRAM_BOT_TOKEN")
    @classmethod
    def validate_bot_token(cls, v: str) -> str:
        # Telegram bot token format: digits:digits-letters
        if not re.match(r"^\d+:[\w-]+$", v):
            raise ValueError("Неверный формат Telegram bot token")
        return v
    
    @property
    def parsed_origins(self) -> List[str]:
        """Возвращает список разрешенных origins"""
        return self.ALLOWED_ORIGINS if isinstance(self.ALLOWED_ORIGINS, list) else [self.ALLOWED_ORIGINS]
    
    @property
    def is_production(self) -> bool:
        """Проверка на production окружение"""
        return self.ENVIRONMENT == "production"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        extra = "ignore"


# Глобальный инстанс настроек
settings = Settings()
