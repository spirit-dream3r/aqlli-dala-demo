"""
Database module with SQLAlchemy ORM and async support.
Includes proper indexes for performance optimization.
"""
import asyncio
import json
from datetime import datetime
from typing import Optional, List, Tuple
from sqlalchemy import (
    create_engine, Column, Integer, String, Float, DateTime, 
    ForeignKey, Index, text, event
)
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from sqlalchemy.future import select
from config import settings

# ==================== BASE ====================
Base = declarative_base()


# ==================== MODELS ====================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(255), nullable=False)
    phone_number = Column(String(20), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=True)  # Для JWT аутентификации
    telegram_id = Column(Integer, unique=True, index=True)
    telegram_username = Column(String(255))
    language = Column(String(5), default="uz")  # uzbek, russian, english
    is_active = Column(Integer, default=1)  # 1 = active, 0 = inactive
    is_verified = Column(Integer, default=0)  # 1 = verified via SMS, 0 = not verified
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    fields = relationship("Field", back_populates="owner", foreign_keys="Field.owner_phone", primaryjoin="User.phone_number==Field.owner_phone")

    __table_args__ = (
        Index("idx_users_phone", "phone_number"),
        Index("idx_users_telegram", "telegram_id"),
    )

    def __repr__(self):
        return f"<User(id={self.id}, name={self.full_name}, phone={self.phone_number})>"


class Field(Base):
    __tablename__ = "fields"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    field_name = Column(String(255), unique=True, nullable=False, index=True)
    crop_type = Column(String(100), default="unknown")
    owner_phone = Column(String(20), ForeignKey("users.phone_number"))
    moisture_threshold = Column(Integer, default=25)
    latitude = Column(Float, nullable=True)  # GPS координаты
    longitude = Column(Float, nullable=True)
    area_hectares = Column(Float, default=1.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    owner = relationship("User", back_populates="fields")
    telemetry = relationship("Telemetry", back_populates="field", cascade="all, delete-orphan")
    alerts = relationship("Alert", back_populates="field", cascade="all, delete-orphan")
    
    __table_args__ = (
        Index("idx_fields_name", "field_name"),
        Index("idx_fields_owner", "owner_phone"),
    )
    
    def __repr__(self):
        return f"<Field(id={self.id}, name={self.field_name}, crop={self.crop_type})>"


class Telemetry(Base):
    __tablename__ = "telemetry"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    field_id = Column(String(255), ForeignKey("fields.field_name"), nullable=False, index=True)
    moisture = Column(Integer, nullable=False)
    temperature = Column(Float, default=0.0)
    battery_level = Column(Integer, default=100)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Relationships
    field = relationship("Field", back_populates="telemetry")
    
    __table_args__ = (
        # Composite index for fast queries by field + time range
        Index("idx_telemetry_field_time", "field_id", "timestamp", postgresql_using="btree"),
        Index("idx_telemetry_timestamp", "timestamp"),
    )
    
    def __repr__(self):
        return f"<Telemetry(field={self.field_id}, moisture={self.moisture}, time={self.timestamp})>"


class Alert(Base):
    __tablename__ = "alerts"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    field_id = Column(String(255), ForeignKey("fields.field_name"), nullable=False, index=True)
    alert_type = Column(String(50), nullable=False)
    message = Column(String(1000))
    is_sent = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    field = relationship("Field", back_populates="alerts")
    
    __table_args__ = (
        Index("idx_alerts_field", "field_id"),
        Index("idx_alerts_type", "alert_type"),
    )
    
    def __repr__(self):
        return f"<Alert(id={self.id}, type={self.alert_type}, field={self.field_id})>"


class News(Base):
    __tablename__ = "news"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    tg_message_id = Column(Integer, unique=True, nullable=False, index=True)
    chat_id = Column(Integer)
    title = Column(String(500))
    text = Column(String(5000))
    media_json = Column(String(2000))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    __table_args__ = (
        Index("idx_news_message", "tg_message_id"),
        Index("idx_news_created", "created_at"),
    )
    
    def __repr__(self):
        return f"<News(id={self.id}, title={self.title})>"


# ==================== DATABASE SETUP ====================
# Convert SQLite URL for async support
def get_async_db_url() -> str:
    url = settings.DATABASE_URL
    if url.startswith("sqlite:///"):
        # aiosqlite requires sqlite+aiosqlite:///
        path = url.replace("sqlite:///", "")
        return f"sqlite+aiosqlite:///{path}"
    elif url.startswith("postgresql://"):
        # asyncpg requires postgresql+asyncpg://
        return url.replace("postgresql://", "postgresql+asyncpg://")
    return url


# Create async engine
async_engine = create_async_engine(
    get_async_db_url(),
    echo=settings.LOG_LEVEL == "DEBUG",
    pool_size=settings.DB_POOL_SIZE,
    max_overflow=20,
    pool_pre_ping=True,  # Enable connection health checks
)

# Session factory
AsyncSessionLocal = async_sessionmaker(
    async_engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)


# ==================== INITIALIZATION ====================
async def init_db():
    """Инициализация базы данных и создание таблиц"""
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # Для SQLite добавим индексы вручную (если не создалсь)
    if settings.DATABASE_URL.startswith("sqlite"):
        await create_sqlite_indexes()


async def create_sqlite_indexes():
    """Создание индексов для SQLite (не поддерживаются в CREATE TABLE)"""
    async with async_engine.begin() as conn:
        indexes = [
            "CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number)",
            "CREATE INDEX IF NOT EXISTS idx_users_telegram ON users(telegram_id)",
            "CREATE INDEX IF NOT EXISTS idx_fields_name ON fields(field_name)",
            "CREATE INDEX IF NOT EXISTS idx_fields_owner ON fields(owner_phone)",
            "CREATE INDEX IF NOT EXISTS idx_telemetry_field_time ON telemetry(field_id, timestamp)",
            "CREATE INDEX IF NOT EXISTS idx_telemetry_timestamp ON telemetry(timestamp)",
            "CREATE INDEX IF NOT EXISTS idx_alerts_field ON alerts(field_id)",
            "CREATE INDEX IF NOT EXISTS idx_alerts_type ON alerts(alert_type)",
            "CREATE INDEX IF NOT EXISTS idx_news_message ON news(tg_message_id)",
            "CREATE INDEX IF NOT EXISTS idx_news_created ON news(created_at)",
        ]
        for sql in indexes:
            await conn.execute(text(sql))


# ==================== USER OPERATIONS ====================
async def register_user(full_name: str, phone_number: str) -> bool:
    """Регистрация нового пользователя"""
    async with AsyncSessionLocal() as session:
        try:
            # Проверка на дубликат
            result = await session.execute(
                select(User).where(User.phone_number == phone_number)
            )
            existing = result.scalar_one_or_none()
            
            if existing:
                return True  # Уже существует
            
            user = User(full_name=full_name, phone_number=phone_number)
            session.add(user)
            await session.commit()
            return True
        except Exception as e:
            await session.rollback()
            print(f"Error registering user: {e}")
            return False


async def get_user_by_phone(phone_number: str) -> Optional[Tuple]:
    """Получение пользователя по телефону"""
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(User).where(User.phone_number == phone_number)
        )
        user = result.scalar_one_or_none()
        if user:
            return (user.full_name, user.phone_number, user.telegram_id, user.language)
        return None


async def get_user_by_telegram_id(telegram_id: int) -> Optional[Tuple]:
    """Получение пользователя по Telegram ID"""
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(User).where(User.telegram_id == telegram_id)
        )
        user = result.scalar_one_or_none()
        if user:
            return (user.full_name, user.phone_number, user.telegram_id, user.language)
        return None


async def sync_telegram_id(phone_number: str, telegram_id: int, username: str = None) -> bool:
    """Синхронизация Telegram ID с пользователем"""
    async with AsyncSessionLocal() as session:
        try:
            result = await session.execute(
                select(User).where(User.phone_number == phone_number)
            )
            user = result.scalar_one_or_none()
            
            if not user:
                return False
            
            user.telegram_id = telegram_id
            user.telegram_username = username
            await session.commit()
            return True
        except Exception as e:
            await session.rollback()
            print(f"Error syncing telegram id: {e}")
            return False


async def update_user_language(telegram_id: int, language: str) -> bool:
    """Обновление языка пользователя"""
    async with AsyncSessionLocal() as session:
        try:
            result = await session.execute(
                select(User).where(User.telegram_id == telegram_id)
            )
            user = result.scalar_one_or_none()
            
            if not user:
                return False
            
            user.language = language
            await session.commit()
            return True
        except Exception as e:
            await session.rollback()
            print(f"Error updating language: {e}")
            return False


# ==================== FIELD OPERATIONS ====================
async def add_field(field_name: str, crop_type: str = "unknown", 
                    owner_phone: str = None, latitude: float = None, 
                    longitude: float = None, area_hectares: float = 1.0) -> bool:
    """Добавление нового поля"""
    async with AsyncSessionLocal() as session:
        try:
            # Проверка на дубликат
            result = await session.execute(
                select(Field).where(Field.field_name == field_name)
            )
            if result.scalar_one_or_none():
                return False
            
            field = Field(
                field_name=field_name,
                crop_type=crop_type,
                owner_phone=owner_phone,
                latitude=latitude,
                longitude=longitude,
                area_hectares=area_hectares
            )
            session.add(field)
            await session.commit()
            return True
        except Exception as e:
            await session.rollback()
            print(f"Error adding field: {e}")
            return False


async def get_fields_by_telegram_id(telegram_id: int) -> List[Tuple]:
    """Получение полей пользователя по Telegram ID"""
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(Field.field_name, Field.crop_type, Field.moisture_threshold)
            .join(User, Field.owner_phone == User.phone_number)
            .where(User.telegram_id == telegram_id)
        )
        return result.all()


async def get_all_fields() -> List[Tuple]:
    """Получение всех полей"""
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(Field.field_name, Field.crop_type, Field.owner_phone)
        )
        return result.all()


async def get_field_by_name(field_name: str) -> Optional[Field]:
    """Получение поля по имени"""
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(Field).where(Field.field_name == field_name)
        )
        return result.scalar_one_or_none()


# ==================== TELEMETRY OPERATIONS ====================
async def save_telemetry(field_id: str, moisture: int, temperature: float, 
                         battery: int) -> bool:
    """Сохранение телеметрии"""
    async with AsyncSessionLocal() as session:
        try:
            telemetry = Telemetry(
                field_id=field_id,
                moisture=moisture,
                temperature=temperature,
                battery_level=battery
            )
            session.add(telemetry)
            await session.commit()
            return True
        except Exception as e:
            await session.rollback()
            print(f"Error saving telemetry: {e}")
            return False


async def get_latest_telemetry(field_id: str) -> Optional[Tuple]:
    """Получение последней телеметрии для поля"""
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(Telemetry.moisture, Telemetry.temperature, 
                   Telemetry.battery_level, Telemetry.timestamp)
            .where(Telemetry.field_id == field_id)
            .order_by(Telemetry.timestamp.desc())
            .limit(1)
        )
        return result.one_or_none()


async def get_telemetry_history(field_id: str, hours: int = 24) -> List[Tuple]:
    """Получение истории телеметрии за последние N часов"""
    from sqlalchemy import func
    async with AsyncSessionLocal() as session:
        cutoff = datetime.utcnow() - timedelta(hours=hours)
        result = await session.execute(
            select(Telemetry.moisture, Telemetry.temperature, 
                   Telemetry.battery_level, Telemetry.timestamp)
            .where(Telemetry.field_id == field_id)
            .where(Telemetry.timestamp >= cutoff)
            .order_by(Telemetry.timestamp.asc())
        )
        return result.all()


# ==================== ALERT OPERATIONS ====================
async def get_fields_needing_alert(threshold: int) -> List[Tuple]:
    """Получение полей с низкой влажностью (требующих тревоги)"""
    async with AsyncSessionLocal() as session:
        # Подзапрос для получения последних записей
        latest_query = (
            select(Telemetry.field_id, func.max(Telemetry.timestamp).label('max_ts'))
            .group_by(Telemetry.field_id)
            .subquery()
        )
        
        result = await session.execute(
            select(Telemetry.field_id, Telemetry.moisture, Telemetry.timestamp)
            .join(latest_query, 
                  (Telemetry.field_id == latest_query.c.field_id) & 
                  (Telemetry.timestamp == latest_query.c.max_ts))
            .where(Telemetry.moisture < threshold)
        )
        return result.all()


async def mark_alert_sent(field_id: str, alert_type: str, message: str) -> bool:
    """Отметка отправленной тревоги"""
    async with AsyncSessionLocal() as session:
        try:
            alert = Alert(
                field_id=field_id,
                alert_type=alert_type,
                message=message,
                is_sent=1
            )
            session.add(alert)
            await session.commit()
            return True
        except Exception as e:
            await session.rollback()
            print(f"Error marking alert sent: {e}")
            return False


# ==================== NEWS OPERATIONS ====================
async def save_news(tg_message_id: int, chat_id: int, title: Optional[str], 
                    text: str, media_paths: List[str]) -> bool:
    """Сохранение новости из Telegram"""
    async with AsyncSessionLocal() as session:
        try:
            news = News(
                tg_message_id=tg_message_id,
                chat_id=chat_id,
                title=title,
                text=text,
                media_json=json.dumps(media_paths)
            )
            session.add(news)
            await session.commit()
            return True
        except Exception as e:
            await session.rollback()
            print(f"Error saving news: {e}")
            return False


async def get_latest_news(limit: int = 10) -> List[dict]:
    """Получение последних новостей"""
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(News.tg_message_id, News.chat_id, News.title, 
                   News.text, News.media_json, News.created_at)
            .order_by(News.created_at.desc())
            .limit(limit)
        )
        rows = result.all()
        
        news_list = []
        for r in rows:
            media = json.loads(r[4]) if r[4] else []
            news_list.append({
                "tg_message_id": r[0],
                "chat_id": r[1],
                "title": r[2],
                "text": r[3],
                "media": media,
                "created_at": r[5].isoformat() if r[5] else None
            })
        return news_list


# Импортируем timedelta для функции get_telemetry_history
from datetime import timedelta
