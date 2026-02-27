import asyncio
import logging
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import Command
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton
from config import config
from database import (
    get_all_fields, get_latest_telemetry, get_fields_needing_alert, 
    mark_alert_sent, get_user_by_telegram_id, sync_telegram_id, 
    get_fields_by_telegram_id
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

bot = Bot(token=config.TELEGRAM_BOT_TOKEN)
dp = Dispatcher()

async def set_commands(bot: Bot):
    commands = [
        types.BotCommand(command="start", description="Boshlash / Запустить"),
        types.BotCommand(command="help", description="Yordam / Помощь"),
        types.BotCommand(command="status", description="Maydonlar holati / Статус полей"),
        types.BotCommand(command="settings", description="Sozlamalar / Настройки")
    ]
    await bot.set_my_commands(commands)
    logger.info("Bot commands registered in Telegram menu")

def get_main_keyboard(lang="uz"):
    if lang == "ru":
        keyboard = [
            [KeyboardButton(text="🚜 Мои поля"), KeyboardButton(text="📊 Отчёты")],
            [KeyboardButton(text="⚙️ Настройки"), KeyboardButton(text="📞 Поддержка")],
            [KeyboardButton(text="💳 Оплата")]
        ]
    else:
        keyboard = [
            [KeyboardButton(text="🚜 Mening maydonlarim"), KeyboardButton(text="📊 Hisobotlar")],
            [KeyboardButton(text="⚙️ Sozlamalar"), KeyboardButton(text="📞 Yordam")],
            [KeyboardButton(text="💳 To'lov")]
        ]
    return ReplyKeyboardMarkup(keyboard=keyboard, resize_keyboard=True)

def get_registration_keyboard(lang="uz"):
    text = "📲 Telefon raqamni yuborish" if lang == "uz" else "📲 Отправить номер телефона"
    keyboard = [
        [KeyboardButton(text=text, request_contact=True)]
    ]
    return ReplyKeyboardMarkup(keyboard=keyboard, resize_keyboard=True, one_time_keyboard=True)

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    user = await get_user_by_telegram_id(message.from_user.id)
    if not user:
        await message.answer(
            "Assalomu alaykum! 🤝\n"
            "Aqlli Dala botiga xush kelibsiz.\n\n"
            "Ma'lumotlaringizni ko'rish uchun iltimos, telefon raqamingizni yuboring (pastdagi tugmani bosing).",
            reply_markup=get_registration_keyboard("uz")
        )
    else:
        await message.answer(
            f"Xush kelibsiz, {user[0]}! 👋\n\n"
            "Maydonlaringiz holatini ko'rish uchun quyidagi tugmalardan foydalaning:",
            reply_markup=get_main_keyboard("uz")
        )

@dp.message(F.contact)
async def handle_contact(message: types.Message):
    phone = message.contact.phone_number
    # Normalize phone: ensure it starts with +
    if not phone.startswith("+"):
        phone = "+" + phone
    
    # Try to sync with existing user from landing page
    success = await sync_telegram_id(phone, message.from_user.id, message.from_user.username)
    if success:
        user = await get_user_by_telegram_id(message.from_user.id)
        await message.answer(
            f"Rahmat, {user[0]}! ✅\nAkkauntingiz muvaffaqiyatli bog'landi.",
            reply_markup=get_main_keyboard("uz")
        )
    else:
        await message.answer(
            "Kechirasiz, bu raqam tizimda topilmadi. ❌\n"
            "Avval aqllidala.uz saytida ro'yxatdan o'ting yoki qo'llab-quvvatlash xizmatiga murojaat qiling."
        )

@dp.message(Command("help"))
async def cmd_help(message: types.Message):
    await message.answer(
        "📖 Yordam:\n\n"
        "/start - Botni qayta ishga tushirish\n"
        "/status - Barcha maydonlar holati\n"
        "/settings - Sozlamalarni o'zgartirish\n\n"
        "Qo'llab-quvvatlash: @AqlliDala_Support"
    )

@dp.message(F.text == "🚜 Mening maydonlarim")
@dp.message(F.text == "🚜 Мои поля")
async def show_fields(message: types.Message):
    fields = await get_fields_by_telegram_id(message.from_user.id)
    if not fields:
        await message.answer(
            "⚠️ Sizda hali bog'langan maydonlar yo'q.\n"
            "Yangi maydon qo'shish uchun biz bilan bog'laning."
        )
        return
    
    text = "🚜 Maydonlaringiz holati:\n\n"
    for field in fields:
        telemetry = await get_latest_telemetry(field[0])
        if telemetry:
            status = "🟢" if telemetry[0] >= config.MOISTURE_THRESHOLD else "🔴"
            text += f"{status} <b>{field[0]}</b> ({field[1]})\n"
            text += f"   Namlik: {telemetry[0]}% | Harorat: {telemetry[1]}°C\n"
            text += f"   Batareya: {telemetry[2]}%\n\n"
        else:
            text += f"⚪ <b>{field[0]}</b> ({field[1]}) - Ma'lumot yo'q\n\n"
    
    await message.answer(text, parse_mode="HTML")

@dp.message(F.text == "📊 Hisobotlar")
async def show_reports(message: types.Message):
    await message.answer(
        "📊 Hisobotlar bo'limi\n\n"
        "Tez orada qo'shiladi:\n"
        "• Haftalik hisobot\n"
        "• Oylik hisobot\n"
        "• Tejamkorlik statistikasi"
    )

@dp.message(F.text == "⚙️ Sozlamalar")
async def show_settings(message: types.Message):
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🌡 Namlik chegarasi", callback_data="set_threshold")],
        [InlineKeyboardButton(text="🌐 Til / Язык", callback_data="change_lang")],
        [InlineKeyboardButton(text="🔙 Orqaga", callback_data="back_main")]
    ])
    await message.answer("⚙️ Sozlamalar", reply_markup=keyboard)

@dp.message(F.text == "📞 Yordam")
async def show_support(message: types.Message):
    await message.answer(
        "📞 Qo'llab-quvvatlash xizmati\n\n"
        "Telefon: +998 (__) ___ __ __\n"
        "Telegram: @AqlliDala_Support\n"
        "Email: support@aqllidala.uz\n\n"
        "Ish vaqti: 9:00 - 18:00 (Dushanba - Shanba)"
    )

@dp.message(F.text == "💳 To'lov")
async def show_payment(message: types.Message):
    await message.answer(
        "💳 Obuna to'lovi\n\n"
        "Narx: 100,000 so'm / gektar / oy\n\n"
        "To'lov usullari:\n"
        "• Click\n"
        "• Payme\n"
        "• Uzum Pay\n\n"
        "Tez orada to'lov tizimi qo'shiladi."
    )

@dp.callback_query(F.data == "back_main")
async def back_to_main(callback: types.CallbackQuery):
    await callback.message.delete()
    await callback.message.answer("Bosh menyu:", reply_markup=get_main_keyboard("uz"))

async def check_alerts():
    """Фоновая задача для проверки тревог"""
    while True:
        try:
            fields = await get_fields_needing_alert(config.MOISTURE_THRESHOLD)
            for field_id, moisture, timestamp in fields:
                message = (
                    f"🚨 DIQQAT! Namlik past!\n\n"
                    f"🚜 Maydon: {field_id}\n"
                    f"💧 Namlik: {moisture}% (Norma: {config.MOISTURE_THRESHOLD}% dan yuqori)\n\n"
                    f"✅ Tavsiya: Sug'orishni hoziroq boshlang."
                )
                try:
                    await bot.send_message(config.TELEGRAM_CHAT_ID, message)
                    await mark_alert_sent(field_id, "low_moisture", message)
                    logger.info(f"Alert sent for {field_id}")
                except Exception as e:
                    logger.error(f"Failed to send alert: {e}")
            await asyncio.sleep(300)  # Проверка каждые 5 минут
        except Exception as e:
            logger.error(f"Alert check error: {e}")
            await asyncio.sleep(60)

async def main():
    await set_commands(bot)
    logger.info("Bot commands registered")
    
    # Run the background alert checker as a task
    asyncio.create_task(check_alerts())
    
    logger.info("Bot started and polling...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.info("Bot stopped")