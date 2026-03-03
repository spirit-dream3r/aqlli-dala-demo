@echo off
REM Установка зависимостей для Aqlli Dala Backend на Windows

echo ========================================
echo Aqlli Dala - Установка зависимостей
echo ========================================
echo.

REM Проверка наличия Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python не найден! Установите Python 3.11+
    echo Скачайте с: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo [OK] Python найден
python --version
echo.

REM Создание виртуального окружения (если нет)
if not exist "venv" (
    echo [INFO] Создание виртуального окружения...
    python -m venv venv
    echo [OK] Виртуальное окружение создано
) else (
    echo [OK] Виртуальное окружение уже существует
)
echo.

REM Активация виртуального окружения
echo [INFO] Активация виртуального окружения...
call venv\Scripts\activate.bat
echo.

REM Обновление pip
echo [INFO] Обновление pip...
python -m pip install --upgrade pip
echo.

REM Установка зависимостей
echo [INFO] Установка зависимостей из requirements.txt...
python -m pip install -r requirements.txt
echo.

echo ========================================
echo [OK] Установка завершена успешно!
echo ========================================
echo.
echo Для запуска сервера выполните:
echo   cd backend
echo   venv\Scripts\activate
echo   uvicorn main:app --reload
echo.
pause
