import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
    TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./aqlli_dala.db")
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", 8000))
    MOISTURE_THRESHOLD = int(os.getenv("MOISTURE_THRESHOLD", 25))

config = Config()
