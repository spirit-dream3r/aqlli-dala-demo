"""
Aqlli Dala Telegram Bot
Бот с FSM для регистрации, мультиязычностью и интерактивными кнопками.
"""
import asyncio
import logging
from datetime import datetime
from typing import Optional

from aiogram import Bot, Dispatcher, F, Router
from aiogram.filters import Command, StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import (
    Message, CallbackQuery, types, ReplyKeyboardMarkup, 
    KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton
)
from aiogram.enums import ParseMode

from config import settings
from database import (
    get_all_fields, get_latest_telemetry, get_fields_needing_alert,
    mark_alert_sent, get_user_by_telegram_id, sync_telegram_id,
    get_fields_by_telegram_id, register_user, update_user_language,
    get_user_by_phone
)

# ==================== LOGGING ====================
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ==================== BOT INIT ====================
bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)
dp = Dispatcher()
router = Router()
dp.include_router(router)

# ==================== TRANSLATIONS ====================
TRANSLATIONS = {
    "uz": {
        "welcome": "Assalomu alaykum! 🤝\nAqlli Dala botiga xush kelibsiz!",
        "phone_request": "Ma'lumotlaringizni ko'rish uchun iltimos, telefon raqamingizni yuboring (pastdagi tugmani bosing).",
        "send_phone": "📲 Telefon raqamni yuborish",
        "phone_not_found": "Kechirasiz, bu raqam tizimda topilmadi. ❌\nAvval aqllidala.uz saytida ro'yxatdan o'ting yoki qo'llab-quvvatlash xizmatiga murojaat qiling.",
        "account_linked": "Rahmat, {name}! ✅\nAkkauntingiz muvaffaqiyatli bog'landi.",
        "main_menu": "Maydonlaringiz holatini ko'rish uchun quyidagi tugmalardan foydalaning:",
        "my_fields": "🚜 Mening maydonlarim",
        "reports": "📊 Hisobotlar",
        "settings": "⚙️ Sozlamalar",
        "support": "📞 Yordam",
        "payment": "💳 To'lov",
        "back": "🔙 Orqaga",
        "fields_status": "🚜 Maydonlaringiz holati:",
        "no_fields": "⚠️ Sizda hali bog'langan maydonlar yo'q.\nYangi maydon qo'shish uchun biz bilan bog'laning.",
        "moisture": "Namlik",
        "temperature": "Harorat",
        "battery": "Batareya",
        "no_data": "Ma'lumot yo'q",
        "reports_coming_soon": "📊 Hisobotlar bo'limi\n\nTez orada qo'shiladi:\n• Haftalik hisobot\n• Oylik hisobot\n• Tejamkorlik statistikasi",
        "settings_title": "⚙️ Sozlamalar",
        "threshold_btn": "🌡 Namlik chegarasi",
        "lang_btn": "🌐 Til / Язык",
        "support_title": "📞 Qo'llab-quvvatlash xizmati",
        "support_info": "Telefon: +998 (__) ___ __ __\nTelegram: @AqlliDala_Support\nEmail: support@aqllidala.uz\n\nIsh vaqti: 9:00 - 18:00 (Dushanba - Shanba)",
        "payment_title": "💳 Obuna to'lovi",
        "payment_info": "Narx: 100,000 so'm / gektar / oy\n\nTo'lov usullari:\n• Click\n• Payme\n• Uzum Pay\n\nTez orada to'lov tizimi qo'shiladi.",
        "select_lang": "Tilni tanlang / Выберите язык:",
        "lang_changed": "✅ Til o'zgartirildi: {lang}",
        "help_title": "📖 Yordam:",
        "help_commands": "/start - Botni qayta ishga tushirish\n/status - Barcha maydonlar holati\n/settings - Sozlamalarni o'zgartirish\n\nQo'llab-quvvatlash: @AqlliDala_Support",
        "alert_low_moisture": "🚨 DIQQAT! Namlik past!\n\n🚜 Maydon: {field}\n💧 Namlik: {moisture}% (Norma: {threshold}% dan yuqori)\n\n✅ Tavsiya: Sug'orishni hoziroq boshlang.",
        "optimal": "Optimal",
        "low": "Past",
        "recommendation": "Tavsiya",
        "no_irrigation": "Sug'orish shart emas",
        "irrigate_now": "Hoziroq sug'oring",
        "forecast": "Prognoz",
    },
    "ru": {
        "welcome": "Здравствуйте! 🤝\nДобро пожаловать в Aqlli Dala!",
        "phone_request": "Для просмотра данных пожалуйста, отправьте номер телефона (нажмите кнопку ниже).",
        "send_phone": "📲 Отправить номер телефона",
        "phone_not_found": "К сожалению, этот номер не найден в системе. ❌\nСначала зарегистрируйтесь на aqllidala.uz или обратитесь в поддержку.",
        "account_linked": "Спасибо, {name}! ✅\nВаш аккаунт успешно привязан.",
        "main_menu": "Используйте кнопки ниже для просмотра состояния полей:",
        "my_fields": "🚜 Мои поля",
        "reports": "📊 Отчёты",
        "settings": "⚙️ Настройки",
        "support": "📞 Поддержка",
        "payment": "💳 Оплата",
        "back": "🔙 Назад",
        "fields_status": "🚜 Состояние ваших полей:",
        "no_fields": "⚠️ У вас пока нет подключенных полей.\nСвяжитесь с нами для добавления поля.",
        "moisture": "Влажность",
        "temperature": "Температура",
        "battery": "Батарея",
        "no_data": "Нет данных",
        "reports_coming_soon": "📊 Раздел отчётов\n\nСкоро будет доступно:\n• Еженедельный отчёт\n• Ежемесячный отчёт\n• Статистика экономии",
        "settings_title": "⚙️ Настройки",
        "threshold_btn": "🌡 Порог влажности",
        "lang_btn": "🌐 Til / Язык",
        "support_title": "📞 Служба поддержки",
        "support_info": "Телефон: +998 (__) ___ __ __\nTelegram: @AqlliDala_Support\nEmail: support@aqllidala.uz\n\nВремя работы: 9:00 - 18:00 (Пн - Сб)",
        "payment_title": "💳 Оплата подписки",
        "payment_info": "Цена: 100,000 сум / гектар / месяц\n\nСпособы оплаты:\n• Click\n• Payme\n• Uzum Pay\n\nСкоро будет доступна онлайн-оплата.",
        "select_lang": "Tilni tanlang / Выберите язык:",
        "lang_changed": "✅ Язык изменён: {lang}",
        "help_title": "📖 Помощь:",
        "help_commands": "/start - Перезапустить бота\n/status - Состояние всех полей\n/settings - Изменить настройки\n\nПоддержка: @AqlliDala_Support",
        "alert_low_moisture": "🚨 ВНИМАНИЕ! Низкая влажность!\n\n🚜 Поле: {field}\n💧 Влажность: {moisture}% (Норма: выше {threshold}%)\n\n✅ Рекомендация: Начните полив немедленно.",
        "optimal": "Оптимально",
        "low": "Низкий",
        "recommendation": "Рекомендация",
        "no_irrigation": "Полив не требуется",
        "irrigate_now": "Поливайте сейчас",
        "forecast": "Прогноз",
    }
}


def t(telegram_id: int, key: str) -> str:
    """Получение перевода для пользователя"""
    # Получаем язык пользователя из БД
    user = asyncio.get_event_loop().run_until_complete(
        get_user_by_telegram_id(telegram_id)
    )
    lang = user[3] if user and len(user) > 3 else "uz"
    
    return TRANSLATIONS.get(lang, TRANSLATIONS["uz"]).get(key, key)


def get_lang(telegram_id: int) -> str:
    """Получение языка пользователя"""
    user = asyncio.get_event_loop().run_until_complete(
        get_user_by_telegram_id(telegram_id)
    )
    return user[3] if user and len(user) > 3 else "uz"


# ==================== KEYBOARDS ====================
def get_main_keyboard(lang: str = "uz") -> ReplyKeyboardMarkup:
    """Основное меню"""
    tr = TRANSLATIONS[lang]
    keyboard = [
        [KeyboardButton(text=tr["my_fields"]), KeyboardButton(text=tr["reports"])],
        [KeyboardButton(text=tr["settings"]), KeyboardButton(text=tr["support"])],
        [KeyboardButton(text=tr["payment"])]
    ]
    return ReplyKeyboardMarkup(keyboard=keyboard, resize_keyboard=True)


def get_registration_keyboard(lang: str = "uz") -> ReplyKeyboardMarkup:
    """Клавиатура для регистрации"""
    tr = TRANSLATIONS[lang]
    keyboard = [
        [KeyboardButton(text=tr["send_phone"], request_contact=True)]
    ]
    return ReplyKeyboardMarkup(
        keyboard=keyboard, 
        resize_keyboard=True, 
        one_time_keyboard=True
    )


def get_settings_keyboard(lang: str = "uz") -> InlineKeyboardMarkup:
    """Клавиатура настроек"""
    tr = TRANSLATIONS[lang]
    keyboard = [
        [InlineKeyboardButton(text=tr["threshold_btn"], callback_data="set_threshold")],
        [InlineKeyboardButton(text=tr["lang_btn"], callback_data="change_lang")],
        [InlineKeyboardButton(text=tr["back"], callback_data="back_main")]
    ]
    return InlineKeyboardMarkup(inline_keyboard=keyboard)


def get_language_keyboard() -> InlineKeyboardMarkup:
    """Выбор языка"""
    keyboard = [
        [InlineKeyboardButton(text="O'zbekcha", callback_data="lang_uz")],
        [InlineKeyboardButton(text="Русский", callback_data="lang_ru")],
        [InlineKeyboardButton(text="English", callback_data="lang_en")]
    ]
    return InlineKeyboardMarkup(inline_keyboard=keyboard)


def get_back_keyboard(lang: str = "uz") -> InlineKeyboardMarkup:
    """Кнопка назад"""
    tr = TRANSLATIONS[lang]
    return InlineKeyboardMarkup(
        inline_keyboard=[[InlineKeyboardButton(text=tr["back"], callback_data="back_main")]]
    )


# ==================== FSM STATES ====================
class Registration(StatesGroup):
    waiting_for_phone = State()
    waiting_for_name = State()


class Settings(StatesGroup):
    waiting_for_threshold = State()


# ==================== HANDLERS ====================

@router.message(Command("start"))
async def cmd_start(message: Message, state: FSMContext):
    """Обработчик команды /start"""
    await state.clear()
    
    user = await get_user_by_telegram_id(message.from_user.id)
    lang = user[3] if user and len(user) > 3 else "uz"
    
    if not user:
        # Новый пользователь - просим зарегистрироваться
        await message.answer(
            TRANSLATIONS[lang]["welcome"],
            reply_markup=get_registration_keyboard(lang)
        )
        await message.answer(
            TRANSLATIONS[lang]["phone_request"]
        )
        await state.set_state(Registration.waiting_for_phone)
    else:
        # Существующий пользователь - показываем меню
        await message.answer(
            TRANSLATIONS[lang]["welcome"].split('\n')[0] + f", {user[0]}! 👋",
            reply_markup=get_main_keyboard(lang)
        )
        await message.answer(TRANSLATIONS[lang]["main_menu"])


@router.message(F.contact, StateFilter(Registration.waiting_for_phone))
async def handle_contact(message: Message, state: FSMContext):
    """Обработка контакта (номер телефона)"""
    phone = message.contact.phone_number
    
    # Нормализация номера
    if not phone.startswith("+"):
        phone = "+" + phone
    
    # Пробуем найти пользователя по номеру
    user = await get_user_by_phone(phone)
    
    if user:
        # Пользователь найден - привязываем Telegram
        success = await sync_telegram_id(
            phone_number=phone,
            telegram_id=message.from_user.id,
            username=message.from_user.username
        )
        
        if success:
            lang = "uz"  # Язык по умолчанию
            await message.answer(
                TRANSLATIONS[lang]["account_linked"].format(name=user[0]),
                reply_markup=get_main_keyboard(lang)
            )
            await message.answer(TRANSLATIONS[lang]["main_menu"])
            await state.clear()
            return
    
    # Пользователь не найден - просим зарегистрироваться на сайте
    lang = "uz"
    await message.answer(TRANSLATIONS[lang]["phone_not_found"])
    await state.clear()


@router.message(F.text == "🚜 Mening maydonlarim" or F.text == "🚜 Мои поля")
async def show_fields(message: Message):
    """Показать поля пользователя"""
    lang = get_lang(message.from_user.id)
    tr = TRANSLATIONS[lang]
    
    fields = await get_fields_by_telegram_id(message.from_user.id)
    
    if not fields:
        await message.answer(tr["no_fields"])
        return
    
    text = tr["fields_status"] + "\n\n"
    
    for field_name, crop_type, threshold in fields:
        telemetry = await get_latest_telemetry(field_name)
        
        if telemetry:
            moisture, temp, battery, _ = telemetry
            status_icon = "🟢" if moisture >= threshold else "🔴"
            
            text += f"{status_icon} <b>{field_name}</b> ({crop_type})\n"
            text += f"   {tr['moisture']}: {moisture}% | {tr['temperature']}: {temp}°C\n"
            text += f"   {tr['battery']}: {battery}%\n"
            
            # Рекомендация
            if moisture >= threshold:
                text += f"   💡 {tr['recommendation']}: {tr['no_irrigation']}\n"
            else:
                text += f"   💡 {tr['recommendation']}: {tr['irrigate_now']}\n"
            
            text += "\n"
        else:
            text += f"⚪ <b>{field_name}</b> ({crop_type}) - {tr['no_data']}\n\n"
    
    await message.answer(text, parse_mode=ParseMode.HTML)


@router.message(F.text == "📊 Hisobotlar" or F.text == "📊 Отчёты")
async def show_reports(message: Message):
    """Показать отчёты"""
    lang = get_lang(message.from_user.id)
    tr = TRANSLATIONS[lang]
    
    await message.answer(tr["reports_coming_soon"])


@router.message(F.text == "⚙️ Sozlamalar" or F.text == "⚙️ Настройки")
async def show_settings(message: Message):
    """Показать настройки"""
    lang = get_lang(message.from_user.id)
    tr = TRANSLATIONS[lang]
    
    await message.answer(
        tr["settings_title"],
        reply_markup=get_settings_keyboard(lang)
    )


@router.message(F.text == "📞 Yordam" or F.text == "📞 Поддержка")
async def show_support(message: Message):
    """Показать поддержку"""
    lang = get_lang(message.from_user.id)
    tr = TRANSLATIONS[lang]
    
    await message.answer(
        f"{tr['support_title']}\n\n{tr['support_info']}"
    )


@router.message(F.text == "💳 To'lov" or F.text == "💳 Оплата")
async def show_payment(message: Message):
    """Показать оплату"""
    lang = get_lang(message.from_user.id)
    tr = TRANSLATIONS[lang]
    
    await message.answer(
        f"{tr['payment_title']}\n\n{tr['payment_info']}"
    )


@router.callback_query(F.data == "back_main")
async def back_to_main(callback: CallbackQuery):
    """Вернуться в главное меню"""
    await callback.message.delete()
    
    lang = get_lang(callback.from_user.id)
    
    await callback.message.answer(
        TRANSLATIONS[lang]["main_menu"],
        reply_markup=get_main_keyboard(lang)
    )


@router.callback_query(F.data == "change_lang")
async def change_language(callback: CallbackQuery):
    """Изменить язык"""
    await callback.message.answer(
        TRANSLATIONS["uz"]["select_lang"],
        reply_markup=get_language_keyboard()
    )


@router.callback_query(F.data.startswith("lang_"))
async def set_language(callback: CallbackQuery):
    """Установить язык"""
    lang = callback.data.split("_")[1]
    
    success = await update_user_language(callback.from_user.id, lang)
    
    if success:
        tr = TRANSLATIONS.get(lang, TRANSLATIONS["uz"])
        await callback.message.answer(
            tr["lang_changed"].format(lang=lang.upper()),
            reply_markup=get_main_keyboard(lang)
        )
    else:
        await callback.answer("❌ Не удалось сохранить язык", show_alert=True)


@router.callback_query(F.data == "set_threshold")
async def set_threshold_callback(callback: CallbackQuery):
    """Установить порог влажности"""
    lang = get_lang(callback.from_user.id)
    tr = TRANSLATIONS[lang]
    
    await callback.message.answer(
        f"{tr['threshold_btn']}\n\n"
        f"Отправьте новое значение порога влажности (0-100%):\n\n"
        f"Текущее значение: {settings.MOISTURE_THRESHOLD}%"
    )


@router.message(Command("help"))
async def cmd_help(message: Message):
    """Обработчик команды /help"""
    lang = get_lang(message.from_user.id)
    tr = TRANSLATIONS[lang]
    
    await message.answer(
        f"{tr['help_title']}\n\n{tr['help_commands']}"
    )


@router.message(Command("status"))
async def cmd_status(message: Message):
    """Обработчик команды /status"""
    await show_fields(message)


@router.message(Command("settings"))
async def cmd_settings(message: Message):
    """Обработчик команды /settings"""
    await show_settings(message)


# ==================== BACKGROUND TASKS ====================
async def check_alerts():
    """Фоновая задача для проверки тревог"""
    while True:
        try:
            fields = await get_fields_needing_alert(settings.MOISTURE_THRESHOLD)
            
            for field_id, moisture, timestamp in fields:
                # Проверяем, не отправляли ли уже тревогу
                # (здесь можно добавить дополнительную логику)
                
                lang = "uz"  # Можно получить язык владельца поля
                tr = TRANSLATIONS[lang]
                
                message_text = tr["alert_low_moisture"].format(
                    field=field_id,
                    moisture=moisture,
                    threshold=settings.MOISTURE_THRESHOLD
                )
                
                try:
                    await bot.send_message(
                        chat_id=settings.TELEGRAM_CHAT_ID,
                        text=message_text
                    )
                    await mark_alert_sent(field_id, "low_moisture", message_text)
                    logger.info(f"✅ Alert sent for {field_id}")
                except Exception as e:
                    logger.error(f"❌ Failed to send alert: {e}")
            
            await asyncio.sleep(settings.ALERT_CHECK_INTERVAL)
        
        except Exception as e:
            logger.error(f"Alert check error: {e}")
            await asyncio.sleep(60)


# ==================== BOT COMMANDS ====================
async def set_commands(bot: Bot):
    """Регистрация команд бота"""
    commands = [
        types.BotCommand(command="start", description="Boshlash / Запустить"),
        types.BotCommand(command="help", description="Yordam / Помощь"),
        types.BotCommand(command="status", description="Maydonlar holati / Статус"),
        types.BotCommand(command="settings", description="Sozlamalar / Настройки")
    ]
    await bot.set_my_commands(commands)
    logger.info("✅ Bot commands registered")


# ==================== MAIN ====================
async def main():
    """Запуск бота"""
    await set_commands(bot)
    
    # Запуск фоновой задачи проверки тревог
    asyncio.create_task(check_alerts())
    
    logger.info("🤖 Bot started and polling...")
    await dp.start_polling(bot)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.info("Bot stopped")
