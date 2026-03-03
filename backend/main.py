"""
Aqlli Dala API - FastAPI Backend
Основной сервер с endpoints для телеметрии, пользователей и новостей.
"""
from fastapi import FastAPI, HTTPException, Request, Header, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from datetime import datetime, timedelta
from contextlib import asynccontextmanager
import asyncio
import os
import re

# Import from local modules
from database import (
    init_db, save_telemetry, get_latest_telemetry, get_all_fields,
    add_field, save_news, get_latest_news, register_user, get_user_by_phone,
    get_telemetry_history, get_fields_by_telegram_id
)
from config import settings
from utils import (
    setup_logging, validate_phone, normalize_phone,
    RateLimiter, retry_async, get_client_ip
)
from loguru import logger

# ==================== LIFESPAN ====================
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown logic"""
    # Startup
    logger.info("🚀 Запуск Aqlli Dala API...")
    logger.info(f"📊 Окружение: {settings.ENVIRONMENT}")
    logger.info(f"🔧 Log level: {settings.LOG_LEVEL}")
    
    # Setup logging
    setup_logging()
    
    # Initialize database
    await init_db()
    logger.info("✅ База данных инициализирована")
    
    # Create media directory
    os.makedirs(settings.MEDIA_DIR, exist_ok=True)
    os.makedirs("logs", exist_ok=True)
    
    logger.info(f"📁 Media directory: {settings.MEDIA_DIR}")
    logger.info(f"🌐 Server starting on {settings.HOST}:{settings.PORT}")
    
    yield
    
    # Shutdown
    logger.info("👋 Остановка сервера...")


# ==================== APP INITIALIZATION ====================
app = FastAPI(
    title="Aqlli Dala API",
    description="IoT платформа для умного полива в Узбекистане",
    version="1.1.0",
    lifespan=lifespan
)

# ==================== INCLUDE ROUTERS ====================
# Подключение роутеров аутентификации и личного кабинета
from routers import router as auth_router, profile_router, fields_router, get_current_user

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(fields_router)

# ==================== MIDDLEWARE ====================
# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== RATE LIMITER ====================
# Простой rate limiter для защиты от спама
lead_rate_limiter = RateLimiter(
    max_requests=settings.RATE_LIMIT_PER_MINUTE,
    window_seconds=60
)


# ==================== RATE LIMIT DEPENDENCY ====================
async def check_rate_limit(request: Request) -> Optional[JSONResponse]:
    """Проверка rate limiting"""
    if not settings.RATE_LIMIT_ENABLED:
        return None
    
    client_ip = get_client_ip(dict(request.headers), request.client)
    is_allowed, retry_after = lead_rate_limiter.is_allowed(client_ip)
    
    if not is_allowed:
        logger.warning(f"⚠️ Rate limit exceeded for IP: {client_ip}")
        raise HTTPException(
            status_code=429,
            detail={
                "error": "Слишком много запросов",
                "retry_after": retry_after,
                "message": f"Повторите через {retry_after} секунд"
            }
        )
    
    return None


# ==================== PYDANTIC MODELS ====================
class TelemetryData(BaseModel):
    field_id: str = Field(..., min_length=1, max_length=255)
    moisture: int = Field(..., ge=0, le=100)
    temperature: float = Field(default=0.0, ge=-50, le=70)
    battery: int = Field(default=100, ge=0, le=100)


class FieldData(BaseModel):
    field_name: str = Field(..., min_length=1, max_length=255)
    crop_type: str = Field(default="unknown", max_length=100)
    owner_phone: Optional[str] = Field(default=None, max_length=20)
    latitude: Optional[float] = Field(default=None, ge=-90, le=90)
    longitude: Optional[float] = Field(default=None, ge=-180, le=180)
    area_hectares: Optional[float] = Field(default=1.0, gt=0)
    
    @field_validator('owner_phone')
    @classmethod
    def validate_phone(cls, v: Optional[str]) -> Optional[str]:
        if v:
            normalized = normalize_phone(v)
            if not normalized:
                raise ValueError("Неверный формат номера телефона")
            return normalized
        return v


class SyncData(BaseModel):
    phone_number: str = Field(..., min_length=1)
    telegram_id: int = Field(..., gt=0)
    username: Optional[str] = Field(default=None, max_length=255)
    
    @field_validator('phone_number')
    @classmethod
    def validate_phone(cls, v: str) -> str:
        normalized = normalize_phone(v)
        if not normalized:
            raise ValueError("Неверный формат номера телефона")
        return normalized


class LeadData(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    contact: str = Field(..., min_length=1)
    region: Optional[str] = Field(default=None, max_length=255)
    message: Optional[str] = Field(default=None, max_length=1000)
    
    @field_validator('contact')
    @classmethod
    def validate_contact(cls, v: str) -> str:
        # Проверяем, что это телефон или email
        normalized = normalize_phone(v)
        if normalized:
            return normalized
        
        # Проверка email
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if re.match(email_pattern, v):
            return v
        
        raise ValueError("Контакт должен быть телефоном (+998...) или email")


class LeadResponse(BaseModel):
    ok: bool
    message: str
    lead_id: Optional[int] = None


class TelemetryResponse(BaseModel):
    field_id: str
    moisture: int
    temperature: float
    battery: int
    timestamp: str


class HealthResponse(BaseModel):
    status: str
    timestamp: float
    version: str
    environment: str


# ==================== ROUTES ====================

@app.get("/", tags=["Main"])
async def root():
    """Корневой endpoint - статус API"""
    logger.info("Root endpoint accessed")
    return {
        "message": "Aqlli Dala API работает",
        "status": "online",
        "version": "1.0.0"
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Healthcheck endpoint для мониторинга"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().timestamp(),
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT
    }


@app.post("/api/telemetry", tags=["Telemetry"])
async def receive_telemetry(data: TelemetryData):
    """
    Получение данных телеметрии от IoT устройств.
    
    - **field_id**: Идентификатор поля
    - **moisture**: Влажность почвы (%)
    - **temperature**: Температура (°C)
    - **battery**: Уровень батареи (%)
    """
    logger.info(f"📡 Получена телеметрия от поля {data.field_id}")
    logger.debug(f"Данные: moisture={data.moisture}%, temp={data.temperature}°C, battery={data.battery}%")
    
    try:
        success = await save_telemetry(
            field_id=data.field_id,
            moisture=data.moisture,
            temperature=data.temperature,
            battery=data.battery
        )
        
        if not success:
            logger.error("❌ Ошибка сохранения телеметрии")
            raise HTTPException(status_code=500, detail="Failed to save telemetry")
        
        # Проверка на низкую влажность
        if data.moisture < settings.MOISTURE_THRESHOLD:
            logger.warning(f"⚠️ Низкая влажность на поле {data.field_id}: {data.moisture}%")
        
        return {
            "status": "success",
            "message": "Данные получены и сохранены",
            "field_id": data.field_id
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Unexpected error in receive_telemetry: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@app.get("/api/telemetry/{field_id}", response_model=TelemetryResponse, tags=["Telemetry"])
async def get_field_telemetry(field_id: str):
    """Получение последней телеметрии для конкретного поля"""
    logger.info(f"📊 Запрос телеметрии для поля {field_id}")
    
    data = await get_latest_telemetry(field_id)
    
    if not data:
        logger.warning(f"⚠️ Телеметрия для поля {field_id} не найдена")
        raise HTTPException(
            status_code=404,
            detail={
                "error": "Данные не найдены",
                "field_id": field_id
            }
        )
    
    return {
        "field_id": field_id,
        "moisture": data[0],
        "temperature": data[1],
        "battery": data[2],
        "timestamp": data[3].isoformat() if data[3] else None
    }


@app.get("/api/telemetry/{field_id}/history", tags=["Telemetry"])
async def get_field_telemetry_history(
    field_id: str,
    hours: int = 24,
    limit: int = 100
):
    """
    Получение истории телеметрии за последние N часов.
    
    - **field_id**: Идентификатор поля
    - **hours**: Период в часах (1-720)
    - **limit**: Максимальное количество записей
    """
    hours = min(max(hours, 1), 720)  # 1-720 hours
    limit = min(max(limit, 1), 1000)  # 1-1000 records
    
    logger.info(f"📈 Запрос истории для поля {field_id} за {hours}ч")
    
    history = await get_telemetry_history(field_id, hours)
    
    if not history:
        return {
            "field_id": field_id,
            "hours": hours,
            "data": [],
            "message": "Нет данных за указанный период"
        }
    
    return {
        "field_id": field_id,
        "hours": hours,
        "count": len(history),
        "data": [
            {
                "moisture": h[0],
                "temperature": h[1],
                "battery": h[2],
                "timestamp": h[3].isoformat() if h[3] else None
            }
            for h in history[:limit]
        ]
    }


@app.post("/api/fields", tags=["Fields"])
async def add_new_field(data: FieldData):
    """
    Добавление нового поля.
    
    - **field_name**: Название поля (уникальное)
    - **crop_type**: Тип культуры
    - **owner_phone**: Телефон владельца
    - **latitude/longitude**: GPS координаты
    - **area_hectares**: Площадь в гектарах
    """
    logger.info(f"🌾 Добавление нового поля: {data.field_name}")
    
    success = await add_field(
        field_name=data.field_name,
        crop_type=data.crop_type,
        owner_phone=data.owner_phone,
        latitude=data.latitude,
        longitude=data.longitude,
        area_hectares=data.area_hectares
    )
    
    if success:
        logger.info(f"✅ Поле {data.field_name} успешно добавлено")
        return {
            "status": "success",
            "message": f"Поле {data.field_name} добавлено",
            "field_name": data.field_name
        }
    else:
        logger.warning(f"⚠️ Поле {data.field_name} уже существует")
        raise HTTPException(
            status_code=409,
            detail={
                "error": "Поле уже существует",
                "field_name": data.field_name
            }
        )


@app.get("/api/fields", tags=["Fields"])
async def list_fields():
    """Получение списка всех полей"""
    fields = await get_all_fields()
    
    return {
        "count": len(fields),
        "fields": [
            {
                "name": f[0],
                "crop": f[1],
                "owner": f[2] if len(f) > 2 else None
            }
            for f in fields
        ]
    }


@app.get("/api/fields/{telegram_id}", tags=["Fields"])
async def get_user_fields(telegram_id: int):
    """Получение полей конкретного пользователя по Telegram ID"""
    fields = await get_fields_by_telegram_id(telegram_id)
    
    if not fields:
        return {
            "telegram_id": telegram_id,
            "count": 0,
            "fields": [],
            "message": "Поля не найдены"
        }
    
    return {
        "telegram_id": telegram_id,
        "count": len(fields),
        "fields": [
            {
                "name": f[0],
                "crop": f[1],
                "threshold": f[2]
            }
            for f in fields
        ]
    }


@app.post("/api/lead", response_model=LeadResponse, tags=["Leads"])
async def receive_lead(request: Request, data: LeadData):
    """
    Получение заявки от потенциального клиента.
    
    Rate limiting: {settings.RATE_LIMIT_PER_MINUTE} запросов в минуту.
    """
    # Проверка rate limiting
    await check_rate_limit(request)
    
    logger.info(f"📨 Новая заявка от {data.name} ({data.contact})")
    
    try:
        # Нормализация телефона
        contact = normalize_phone(data.contact) or data.contact
        
        # Регистрация пользователя в БД
        user_registered = await register_user(data.name, contact)
        
        if not user_registered:
            logger.warning(f"⚠️ Не удалось зарегистрировать пользователя {contact}")
        
        # Отправка уведомления в Telegram
        try:
            from bot import bot
            
            text = (
                f"<b>🚜 Aqlli Dala — новая заявка</b>\n\n"
                f"<b>👤 Имя/хозяйство:</b> {data.name}\n"
                f"<b>📞 Контакт:</b> {contact}\n"
                f"<b>📍 Регион:</b> {data.region or '—'}\n"
                f"<b>💬 Комментарий:</b> {data.message or '—'}\n\n"
                f"<i>Время: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</i>"
            )
            
            # Отправка с retry
            await send_telegram_with_retry(bot, text)
            
        except Exception as telegram_error:
            logger.warning(f"⚠️ Telegram Notification Failed: {telegram_error}")
            # Продолжаем, так как пользователь уже сохранен в БД
        
        logger.info(f"✅ Заявка от {data.name} успешно обработана")
        
        return LeadResponse(
            ok=True,
            message="Заявка принята и сохранена в базе",
            lead_id=None
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error in receive_lead: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Внутренняя ошибка сервера",
                "message": "Попробуйте позже"
            }
        )


@retry_async(
    attempts=settings.TELEGRAM_RETRY_ATTEMPTS,
    delay=settings.TELEGRAM_RETRY_DELAY,
    exceptions=(Exception,)
)
async def send_telegram_with_retry(bot, text: str):
    """Отправка в Telegram с автоматическими повторными попытками"""
    await bot.send_message(
        chat_id=settings.TELEGRAM_CHAT_ID,
        text=text,
        parse_mode="HTML"
    )


@app.post("/api/sync_bot", tags=["Telegram"])
async def sync_bot_user(data: SyncData):
    """
    Синхронизация пользователя с Telegram ботом.
    
    Связывает phone_number с telegram_id для последующих уведомлений.
    """
    logger.info(f"🔄 Синхронизация: phone={data.phone_number}, tg_id={data.telegram_id}")
    
    from database import sync_telegram_id
    
    success = await sync_telegram_id(
        phone_number=data.phone_number,
        telegram_id=data.telegram_id,
        username=data.username
    )
    
    if success:
        logger.info(f"✅ Синхронизация успешна")
        return {"ok": True, "message": "Telegram успешно привязан"}
    else:
        logger.warning(f"⚠️ Пользователь {data.phone_number} не найден")
        raise HTTPException(
            status_code=404,
            detail={
                "error": "Пользователь не найден",
                "message": "Сначала зарегистрируйтесь на сайте"
            }
        )


@app.post("/api/telegram_webhook", tags=["Telegram"])
async def telegram_webhook(
    request: Request,
    x_telegram_bot_api_secret_token: Optional[str] = Header(
        None, alias="X-Telegram-Bot-Api-Secret-Token"
    )
):
    """
    Webhook для получения обновлений из Telegram канала.
    
    Автоматически сохраняет новости из Telegram канала на сайт.
    """
    # Валидация секретного токена
    secret = settings.TELEGRAM_WEBHOOK_SECRET
    if not secret:
        logger.error("❌ Webhook secret not configured")
        raise HTTPException(status_code=500, detail="Webhook secret not configured")
    
    if x_telegram_bot_api_secret_token != secret:
        logger.warning(f"⚠️ Invalid webhook secret from {request.client}")
        raise HTTPException(status_code=403, detail="Invalid webhook secret")
    
    body = await request.json()
    
    # Telegram sends channel_post for channel messages, message for regular
    msg = body.get("channel_post") or body.get("message")
    
    if not msg:
        logger.debug("ℹ️ No message in webhook payload")
        return {"ok": True}
    
    message_id = msg.get("message_id")
    chat = msg.get("chat") or {}
    chat_id = chat.get("id")
    text = msg.get("text") or msg.get("caption") or ""
    
    logger.info(f"📬 Получено сообщение из Telegram: message_id={message_id}")
    
    media_urls = []
    token = settings.TELEGRAM_BOT_TOKEN
    
    try:
        import httpx
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            # Photo (array) -> take the largest
            if msg.get("photo"):
                file_id = msg["photo"][-1]["file_id"]
                r = await client.get(
                    f"https://api.telegram.org/bot{token}/getFile?file_id={file_id}"
                )
                jf = r.json()
                
                if jf.get("ok"):
                    file_path = jf.get("result", {}).get("file_path")
                    if file_path:
                        file_url = f"https://api.telegram.org/file/bot{token}/{file_path}"
                        r2 = await client.get(file_url)
                        
                        os.makedirs(settings.MEDIA_DIR, exist_ok=True)
                        fname = os.path.basename(file_path)
                        full_path = os.path.join(settings.MEDIA_DIR, fname)
                        
                        with open(full_path, "wb") as f:
                            f.write(r2.content)
                        
                        media_urls.append(f"/media/{fname}")
                        logger.info(f"✅ Скачано фото: {fname}")
            
            # Document
            if msg.get("document") and not media_urls:
                file_id = msg["document"].get("file_id")
                r = await client.get(
                    f"https://api.telegram.org/bot{token}/getFile?file_id={file_id}"
                )
                jf = r.json()
                
                if jf.get("ok"):
                    file_path = jf.get("result", {}).get("file_path")
                    if file_path:
                        file_url = f"https://api.telegram.org/file/bot{token}/{file_path}"
                        r2 = await client.get(file_url)
                        
                        os.makedirs(settings.MEDIA_DIR, exist_ok=True)
                        fname = os.path.basename(file_path)
                        full_path = os.path.join(settings.MEDIA_DIR, fname)
                        
                        with open(full_path, "wb") as f:
                            f.write(r2.content)
                        
                        media_urls.append(f"/media/{fname}")
                        logger.info(f"✅ Скачан документ: {fname}")
    
    except Exception as e:
        logger.error(f"❌ Error downloading media: {e}")
    
    # Save to DB
    try:
        saved = await save_news(
            tg_message_id=message_id or 0,
            chat_id=chat_id or 0,
            title=None,
            text=text,
            media_paths=media_urls
        )
        
        if saved:
            logger.info(f"✅ Новость сохранена в БД")
        else:
            logger.warning(f"⚠️ save_news returned False")
    
    except Exception as e:
        logger.error(f"❌ Error saving news to DB: {e}")
    
    return {"ok": True}


@app.get("/api/news", tags=["News"])
async def get_news(limit: int = 10):
    """
    Получение последних новостей из Telegram канала.
    
    - **limit**: Количество новостей (1-50)
    """
    if limit < 1 or limit > 50:
        limit = 10
    
    logger.info(f"📰 Запрос новостей: limit={limit}")
    
    try:
        news = await get_latest_news(limit)
        return {
            "ok": True,
            "count": len(news),
            "news": news
        }
    except Exception as e:
        logger.error(f"❌ Error fetching news: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to fetch news"
        )


# Mount media directory for serving files
app.mount("/media", StaticFiles(directory=settings.MEDIA_DIR), name="media")


# ==================== EXCEPTION HANDLERS ====================
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    logger.warning(f"HTTP Exception: {exc.status_code} - {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail}
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": "Please try again later"
        }
    )


# ==================== REPORT ENDPOINTS ====================
@app.get("/api/reports/{field_name}/export")
async def export_field_report(
    field_name: str,
    format: str = 'pdf',
    days: int = 7,
    current_user: dict = Depends(get_current_user)
):
    """
    Экспорт отчета по полю в PDF или Excel формате.
    
    - **field_name**: Название поля
    - **format**: Формат файла (pdf или xlsx)
    - **days**: Период отчета в днях (1-365)
    """
    from fastapi.responses import Response
    from reports import generate_report
    
    days = min(max(days, 1), 365)  # 1-365 дней
    
    if format not in ['pdf', 'xlsx']:
        raise HTTPException(
            status_code=400,
            detail="Формат должен быть 'pdf' или 'xlsx'"
        )
    
    try:
        logger.info(f"📄 Генерация отчета: {field_name} ({format}, {days} дн.)")
        
        content, content_type = await generate_report(field_name, format, days)
        
        filename = f"{field_name}_report_{days}d.{format}"
        
        return Response(
            content=content,
            media_type=content_type,
            headers={
                "Content-Disposition": f"attachment; filename={filename}"
            }
        )
    except Exception as e:
        logger.error(f"Ошибка генерации отчета: {e}")
        raise HTTPException(
            status_code=500,
            detail="Ошибка при генерации отчета"
        )


# ==================== WEATHER ENDPOINTS ====================
@app.get("/api/weather")
async def get_weather(
    lat: float,
    lon: float,
    include_forecast: bool = True,
    include_recommendation: bool = False,
    moisture: float = None,
    threshold: float = 25
):
    """
    Получение данных о погоде и рекомендаций по поливу.
    
    - **lat**: Широта
    - **lon**: Долгота
    - **include_forecast**: Включить прогноз (3 дня)
    - **include_recommendation**: Включить рекомендацию по поливу
    - **moisture**: Текущая влажность почвы (для рекомендации)
    - **threshold**: Порог влажности
    """
    from weather import get_weather_data
    
    result = await get_weather_data(
        lat=lat,
        lon=lon,
        include_forecast=include_forecast,
        include_recommendation=include_recommendation,
        current_moisture=moisture,
        threshold=threshold
    )
    
    if not result.get('current'):
        raise HTTPException(
            status_code=503,
            detail="Не удалось получить данные о погоде"
        )
    
    return result


@app.get("/api/fields/{field_name}/weather")
async def get_field_weather(
    field_name: str,
    include_recommendation: bool = True,
    current_user: dict = Depends(get_current_user)
):
    """
    Погода для конкретного поля с рекомендацией по поливу.
    """
    from weather import get_weather_data
    from database import get_field_by_name, get_latest_telemetry
    
    field = await get_field_by_name(field_name)
    
    if not field or not field.latitude or not field.longitude:
        raise HTTPException(
            status_code=404,
            detail="Поле не найдено или нет координат"
        )
    
    # Получаем текущую телеметрию
    telemetry = await get_latest_telemetry(field_name)
    moisture = telemetry[0] if telemetry else None
    
    result = await get_weather_data(
        lat=field.latitude,
        lon=field.longitude,
        include_forecast=True,
        include_recommendation=include_recommendation,
        current_moisture=moisture,
        threshold=field.moisture_threshold
    )
    
    return result


# ==================== SMS ENDPOINTS ====================
@app.post("/api/sms/send-code")
async def send_sms_code(
    phone: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Отправка SMS кода подтверждения.
    """
    from sms import send_verification_sms
    import random
    
    # Генерация 6-значного кода
    code = str(random.randint(100000, 999999))
    
    # TODO: Сохранить код в кэше/БД с временем жизни 10 мин
    
    try:
        result = await send_verification_sms(phone, code)
        
        if result.get('success'):
            return {
                'ok': True,
                'message': 'Код отправлен',
                # В production не возвращаем код!
                # 'debug_code': code  # Только для тестирования
            }
        else:
            raise HTTPException(
                status_code=500,
                detail=result.get('error_message', 'Ошибка отправки SMS')
            )
    except Exception as e:
        # Для разработки возвращаем код в ответе
        return {
            'ok': True,
            'message': 'Код сгенерирован (SMS не отправлено)',
            'debug_code': code
        }


@app.post("/api/sms/verify-code")
async def verify_sms_code(
    phone: str,
    code: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Проверка SMS кода.
    """
    # TODO: Проверка кода из кэша/БД
    
    # Для разработки принимаем любой 6-значный код
    if len(code) == 6 and code.isdigit():
        return {'ok': True, 'message': 'Код подтвержден'}
    else:
        raise HTTPException(
            status_code=400,
            detail="Неверный код"
        )


@app.post("/api/sms/send-alert")
async def send_sms_alert(
    field_name: str,
    message: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Отправка SMS тревоги владельцу поля.
    """
    from sms import send_alert_sms
    from database import get_field_by_name, get_user_by_phone
    
    field = await get_field_by_name(field_name)
    
    if not field or not field.owner_phone:
        raise HTTPException(
            status_code=404,
            detail="Поле не найдено"
        )
    
    try:
        result = await send_alert_sms(field.owner_phone, field_name, 0)
        
        return {
            'ok': result.get('success', False),
            'message_id': result.get('message_id'),
        }
    except Exception as e:
        # Для разработки
        return {
            'ok': True,
            'message': 'SMS сгенерировано (не отправлено)',
            'debug_info': str(e)
        }


# ==================== MAIN ====================
if __name__ == "__main__":
    import uvicorn

    logger.info(f"🚀 Starting Aqlli Dala API on {settings.HOST}:{settings.PORT}")

    uvicorn.run(
        app,
        host=settings.HOST,
        port=settings.PORT,
        log_level=settings.LOG_LEVEL.lower()
    )
