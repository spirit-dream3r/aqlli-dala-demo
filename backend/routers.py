"""
Authentication and User Profile API routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import timedelta
from typing import Optional

from database import (
    get_user_by_phone, get_user_by_telegram_id, register_user,
    sync_telegram_id, get_fields_by_telegram_id, get_field_by_name,
    add_field, get_all_fields, get_latest_telemetry
)
from auth import (
    verify_password, get_password_hash,
    create_access_token, create_refresh_token,
    verify_token, decode_token
)
from schemas import (
    UserRegister, UserLogin, TokenResponse, TokenRefresh,
    UserResponse, UserProfileResponse, UserUpdate,
    PasswordChange, FieldResponse, FieldCreate, FieldUpdate,
    SMSCodeRequest, SMSCodeVerify
)
from config import settings
from utils import normalize_phone, logger, RateLimiter

# ==================== ROUTER ====================
router = APIRouter(prefix="/api/auth", tags=["Authentication"])
profile_router = APIRouter(prefix="/api/profile", tags=["Profile"])
fields_router = APIRouter(prefix="/api/fields", tags=["Fields"])

# ==================== SECURITY ====================
security = HTTPBearer(auto_error=False)

# Rate limiter для защиты от brute force
auth_rate_limiter = RateLimiter(max_requests=5, window_seconds=60)


# ==================== DEPENDENCIES ====================
async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
) -> dict:
    """
    Получение текущего пользователя из JWT токена.
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Требуется аутентификация",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = credentials.credentials
    is_valid, payload = verify_token(token)
    
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Невалидный или истекший токен",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return payload


async def get_current_user_from_phone(
    phone_number: str
) -> dict:
    """Получение пользователя по номеру телефона"""
    user = await get_user_by_phone(phone_number)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пользователь не найден"
        )
    return {
        "id": user[0] if isinstance(user[0], int) else None,
        "full_name": user[0],
        "phone_number": user[1],
        "telegram_id": user[2],
        "language": user[3] if len(user) > 3 else "uz",
        "is_active": True,
        "is_verified": False
    }


# ==================== AUTH ROUTES ====================
@router.post("/register", response_model=TokenResponse)
async def register(data: UserRegister):
    """
    Регистрация нового пользователя.
    
    - **full_name**: Имя пользователя
    - **phone_number**: Номер телефона (+998...)
    - **password**: Пароль (минимум 6 символов)
    """
    # Проверка rate limiting
    is_allowed, retry_after = auth_rate_limiter.is_allowed(data.phone_number)
    if not is_allowed:
        raise HTTPException(
            status_code=429,
            detail=f"Слишком много попыток. Повторите через {retry_after}с"
        )
    
    # Проверка существующего пользователя
    existing_user = await get_user_by_phone(data.phone_number)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Пользователь с таким номером уже существует"
        )
    
    # Хеширование пароля
    hashed_password = get_password_hash(data.password)
    
    # Регистрация пользователя
    success = await register_user(data.full_name, data.phone_number)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка при регистрации"
        )
    
    # TODO: Сохранить hashed_password в БД (нужно обновить database.py)
    
    # Генерация токенов
    user_data = {"sub": data.phone_number, "full_name": data.full_name}
    access_token = create_access_token(
        data=user_data,
        expires_delta=timedelta(hours=settings.JWT_EXPIRATION_HOURS)
    )
    refresh_token = create_refresh_token(data=user_data)
    
    logger.info(f"✅ Зарегистрирован новый пользователь: {data.phone_number}")
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.JWT_EXPIRATION_HOURS * 3600
    )


@router.post("/login", response_model=TokenResponse)
async def login(data: UserLogin):
    """
    Вход пользователя.
    
    - **phone_number**: Номер телефона
    - **password**: Пароль
    """
    # Проверка rate limiting
    is_allowed, retry_after = auth_rate_limiter.is_allowed(data.phone_number)
    if not is_allowed:
        raise HTTPException(
            status_code=429,
            detail=f"Слишком много попыток. Повторите через {retry_after}с"
        )
    
    # Поиск пользователя
    user = await get_user_by_phone(data.phone_number)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный номер телефона или пароль"
        )
    
    # TODO: Проверка пароля (когда будет сохранен в БД)
    # if not verify_password(data.password, user.hashed_password):
    #     raise HTTPException(...)
    
    # Генерация токенов
    user_data = {
        "sub": data.phone_number,
        "full_name": user[0],
        "user_id": user[2] if len(user) > 2 else None
    }
    
    access_token = create_access_token(
        data=user_data,
        expires_delta=timedelta(hours=settings.JWT_EXPIRATION_HOURS)
    )
    refresh_token = create_refresh_token(data=user_data)
    
    logger.info(f"✅ Вход пользователя: {data.phone_number}")
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.JWT_EXPIRATION_HOURS * 3600
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(data: TokenRefresh):
    """Обновление access токена"""
    is_valid, payload = verify_token(data.refresh_token)
    
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Невалидный refresh токен"
        )
    
    # Генерация новых токенов
    user_data = {"sub": payload.get("sub"), "full_name": payload.get("full_name")}
    access_token = create_access_token(
        data=user_data,
        expires_delta=timedelta(hours=settings.JWT_EXPIRATION_HOURS)
    )
    refresh_token = create_refresh_token(data=user_data)
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.JWT_EXPIRATION_HOURS * 3600
    )


@router.post("/logout")
async def logout(current_user: dict = Depends(get_current_user)):
    """
    Выход пользователя.
    
    В production здесь нужно добавлять токен в blacklist.
    """
    logger.info(f"👋 Выход пользователя: {current_user.get('sub')}")
    
    return {"message": "Выход успешен"}


# ==================== PROFILE ROUTES ====================
@profile_router.get("/me", response_model=UserProfileResponse)
async def get_profile(current_user: dict = Depends(get_current_user)):
    """Получение профиля текущего пользователя"""
    phone = current_user.get("sub")
    
    user = await get_user_by_phone(phone)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пользователь не найден"
        )
    
    # Получение полей пользователя
    fields = await get_fields_by_telegram_id(user[2]) if user[2] else []
    
    total_area = sum(f.get('area_hectares', 1.0) for f in fields) if fields else 0.0
    
    return UserProfileResponse(
        user=UserResponse(
            id=user[2] or 0,
            full_name=user[0],
            phone_number=user[1],
            telegram_id=user[2],
            telegram_username=None,
            language=user[3] if len(user) > 3 else "uz",
            is_active=True,
            is_verified=False,
            created_at=None,
            updated_at=None
        ),
        fields_count=len(fields),
        total_area_hectares=total_area
    )


@profile_router.put("/me", response_model=UserResponse)
async def update_profile(
    data: UserUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Обновление профиля пользователя"""
    phone = current_user.get("sub")
    
    # TODO: Реализовать обновление в БД
    logger.info(f"📝 Обновление профиля: {phone}")
    
    return {
        "message": "Профиль обновлен",
        "phone": phone
    }


@profile_router.post("/password/change")
async def change_password(
    data: PasswordChange,
    current_user: dict = Depends(get_current_user)
):
    """Смена пароля"""
    phone = current_user.get("sub")
    
    # TODO: Проверка старого пароля и обновление в БД
    logger.info(f"🔑 Смена пароля для: {phone}")
    
    return {"message": "Пароль успешно изменен"}


@profile_router.post("/password/reset/request")
async def request_password_reset(data: PasswordResetRequest):
    """Запрос на сброс пароля (отправка SMS кода)"""
    phone = normalize_phone(data.phone_number)
    
    # TODO: Отправка SMS кода через Click SMS API
    logger.info(f"📱 Запрос сброса пароля: {phone}")
    
    return {"message": "Код сброса отправлен по SMS"}


@profile_router.post("/password/reset/confirm")
async def confirm_password_reset(data: PasswordResetConfirm):
    """Подтверждение сброса пароля"""
    # TODO: Проверка кода и установка нового пароля
    logger.info(f"🔓 Подтверждение сброса пароля: {data.phone_number}")
    
    return {"message": "Пароль успешно сброшен"}


# ==================== SMS VERIFICATION ====================
@router.post("/sms/send")
async def send_sms_code(data: SMSCodeRequest):
    """Отправка SMS кода подтверждения"""
    phone = normalize_phone(data.phone_number)
    
    # TODO: Генерация и отправка кода
    logger.info(f"📱 Отправка SMS кода: {phone}")
    
    return {"message": "SMS код отправлен"}


@router.post("/sms/verify")
async def verify_sms_code(data: SMSCodeVerify):
    """Проверка SMS кода"""
    # TODO: Проверка кода
    logger.info(f"✅ Проверка SMS кода: {data.phone_number}")
    
    return {"message": "Номер телефона подтвержден"}


# ==================== FIELDS MANAGEMENT ====================
@fields_router.get("", response_model=list)
async def get_user_fields(current_user: dict = Depends(get_current_user)):
    """Получение всех полей текущего пользователя"""
    phone = current_user.get("sub")
    
    user = await get_user_by_phone(phone)
    if not user or not user[2]:  # telegram_id
        return []
    
    fields = await get_fields_by_telegram_id(user[2])
    
    return [
        {
            "id": i,
            "field_name": f[0],
            "crop_type": f[1],
            "moisture_threshold": f[2] if len(f) > 2 else 25
        }
        for i, f in enumerate(fields)
    ]


@fields_router.post("", status_code=201)
async def create_field(
    data: FieldCreate,
    current_user: dict = Depends(get_current_user)
):
    """Создание нового поля"""
    phone = current_user.get("sub")
    
    success = await add_field(
        field_name=data.field_name,
        crop_type=data.crop_type,
        owner_phone=phone,
        latitude=data.latitude,
        longitude=data.longitude,
        area_hectares=data.area_hectares
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Поле с таким названием уже существует"
        )
    
    logger.info(f"🌾 Создано новое поле: {data.field_name}")
    
    return {"message": "Поле успешно создано", "field_name": data.field_name}


@fields_router.get("/{field_name}")
async def get_field(
    field_name: str,
    current_user: dict = Depends(get_current_user)
):
    """Получение информации о поле"""
    field = await get_field_by_name(field_name)
    
    if not field:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Поле не найдено"
        )
    
    return {
        "field_name": field.field_name,
        "crop_type": field.crop_type,
        "area_hectares": field.area_hectares,
        "latitude": field.latitude,
        "longitude": field.longitude
    }


@fields_router.delete("/{field_name}")
async def delete_field(
    field_name: str,
    current_user: dict = Depends(get_current_user)
):
    """Удаление поля"""
    # TODO: Реализовать удаление
    logger.info(f"🗑️ Удаление поля: {field_name}")
    
    return {"message": "Поле удалено"}


@fields_router.get("/{field_name}/telemetry")
async def get_field_telemetry(
    field_name: str,
    current_user: dict = Depends(get_current_user)
):
    """Получение последней телеметрии поля"""
    telemetry = await get_latest_telemetry(field_name)
    
    if not telemetry:
        return {
            "field_name": field_name,
            "message": "Нет данных телеметрии"
        }
    
    return {
        "field_name": field_name,
        "moisture": telemetry[0],
        "temperature": telemetry[1],
        "battery": telemetry[2],
        "timestamp": telemetry[3].isoformat() if telemetry[3] else None
    }
