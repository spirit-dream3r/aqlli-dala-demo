@echo off
REM Запуск backend сервера Aqlli Dala

echo ╔════════════════════════════════════════════╗
echo ║      Aqlli Dala Backend Server             ║
echo ║      Запуск сервера (SQLite)               ║
echo ╚════════════════════════════════════════════╝
echo.

REM Переход в папку backend
cd /d "%~dp0"

REM Проверка Python
echo [1/4] Проверка Python...
python --version
if errorlevel 1 (
    echo ❌ Python не найден! Установите Python 3.10+
    pause
    exit /b 1
)
echo ✅ Python найден
echo.

REM Установка зависимостей
echo [2/4] Установка зависимостей...
pip install -r requirements.txt -q
echo ✅ Зависимости установлены
echo.

REM Инициализация базы данных
echo [3/4] Инициализация базы данных...
echo ✅ База данных: aqlli_dala.db
echo.

REM Запуск сервера
echo [4/4] Запуск сервера...
echo.
echo ═══════════════════════════════════════════
echo 🌐 Сервер доступен по адресу:
echo    http://localhost:8000
echo    http://192.168.1.100:8000 (для ESP32)
echo.
echo 📚 API Docs: http://localhost:8000/docs
echo ═══════════════════════════════════════════
echo.
echo Нажмите Ctrl+C для остановки сервера
echo.

REM Запуск uvicorn
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
