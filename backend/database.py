import aiosqlite
from datetime import datetime
from config import config

DB_PATH = config.DATABASE_URL.replace("sqlite:///", "")

async def init_db():
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT,
                phone_number TEXT UNIQUE,
                telegram_id INTEGER UNIQUE,
                telegram_username TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS fields (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                field_name TEXT UNIQUE,
                crop_type TEXT,
                owner_phone TEXT,
                moisture_threshold INTEGER DEFAULT 25,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        # Migration: Add owner_phone if not exists
        try:
            await db.execute("ALTER TABLE fields ADD COLUMN owner_phone TEXT")
        except:
            pass # Column already exists
        
        await db.execute("""
            CREATE TABLE IF NOT EXISTS telemetry (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                field_id TEXT,
                moisture INTEGER,
                temperature REAL,
                battery_level INTEGER,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                field_id TEXT,
                alert_type TEXT,
                message TEXT,
                is_sent INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        await db.commit()

async def add_field(field_name: str, crop_type: str = "unknown", owner_phone: str = None):
    async with aiosqlite.connect(DB_PATH) as db:
        try:
            await db.execute(
                "INSERT INTO fields (field_name, crop_type, owner_phone) VALUES (?, ?, ?)",
                (field_name, crop_type, owner_phone)
            )
            await db.commit()
            return True
        except Exception as e:
            print(f"Error adding field: {e}")
            return False

async def register_user(full_name: str, phone_number: str):
    async with aiosqlite.connect(DB_PATH) as db:
        try:
            await db.execute(
                "INSERT OR IGNORE INTO users (full_name, phone_number) VALUES (?, ?)",
                (full_name, phone_number)
            )
            await db.commit()
            return True
        except Exception as e:
            print(f"Error registering user: {e}")
            return False

async def get_user_by_phone(phone_number: str):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute(
            "SELECT full_name, phone_number, telegram_id FROM users WHERE phone_number = ?",
            (phone_number,)
        ) as cursor:
            return await cursor.fetchone()

async def get_user_by_telegram_id(telegram_id: int):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute(
            "SELECT full_name, phone_number, telegram_id FROM users WHERE telegram_id = ?",
            (telegram_id,)
        ) as cursor:
            return await cursor.fetchone()

async def sync_telegram_id(phone_number: str, telegram_id: int, username: str = None):
    async with aiosqlite.connect(DB_PATH) as db:
        try:
            await db.execute(
                "UPDATE users SET telegram_id = ?, telegram_username = ? WHERE phone_number = ?",
                (telegram_id, username, phone_number)
            )
            await db.commit()
            return True
        except Exception as e:
            print(f"Error syncing telegram id: {e}")
            return False

async def get_fields_by_telegram_id(telegram_id: int):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("""
            SELECT f.field_name, f.crop_type 
            FROM fields f
            JOIN users u ON f.owner_phone = u.phone_number
            WHERE u.telegram_id = ?
        """, (telegram_id,)) as cursor:
            return await cursor.fetchall()

async def save_telemetry(field_id: str, moisture: int, temperature: float, battery: int):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "INSERT INTO telemetry (field_id, moisture, temperature, battery_level) VALUES (?, ?, ?, ?)",
            (field_id, moisture, temperature, battery)
        )
        await db.commit()

async def get_latest_telemetry(field_id: str):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute(
            "SELECT moisture, temperature, battery_level, timestamp FROM telemetry WHERE field_id = ? ORDER BY timestamp DESC LIMIT 1",
            (field_id,)
        ) as cursor:
            row = await cursor.fetchone()
            return row

async def get_all_fields():
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT field_name, crop_type FROM fields") as cursor:
            rows = await cursor.fetchall()
            return rows

async def get_fields_needing_alert(threshold: int):
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("""
            SELECT t.field_id, t.moisture, t.timestamp
            FROM telemetry t
            INNER JOIN (
                SELECT field_id, MAX(timestamp) as max_ts
                FROM telemetry
                GROUP BY field_id
            ) latest ON t.field_id = latest.field_id AND t.timestamp = latest.max_ts
            WHERE t.moisture < ?
        """, (threshold,)) as cursor:
            rows = await cursor.fetchall()
            return rows

async def mark_alert_sent(field_id: str, alert_type: str, message: str):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "INSERT INTO alerts (field_id, alert_type, message, is_sent) VALUES (?, ?, ?, 1)",
            (field_id, alert_type, message)
        )
        await db.commit()