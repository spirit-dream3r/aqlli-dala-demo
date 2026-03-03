# 🧪 Руководство по тестированию Aqlli Dala

## ✅ Предварительные требования

1. **Backend запущен**: http://localhost:8000
2. **Frontend запущен**: http://localhost:3000
3. **Swagger UI**: http://localhost:8000/docs

---

## 📋 Чек-лист тестирования

### 1️⃣ Тест: Главная страница (Лендинг)

**URL**: http://localhost:3000

**Что проверять:**
- [ ] Отображается герой-секция с графиком влажности
- [ ] Переключатель языков RU/UZ работает
- [ ] Переключатель "Демо/Real" режимов работает
- [ ] Форма заявки отправляется (проверить в консоли backend)
- [ ] Новости загружаются (или показывается заглушка)

**Ожидаемый результат:**
```
✅ Страница загружается без ошибок
✅ Графики отображаются
✅ Форма отправляет POST /api/lead
```

---

### 2️⃣ Тест: Регистрация пользователя

**URL**: http://localhost:3000/dashboard/register

**Данные для теста:**
```
ФИО: Иван Иванов
Телефон: +998901234567
Пароль: test123
Подтверждение: test123
```

**Что проверять:**
- [ ] Форма валидируется (пароль >= 6 символов)
- [ ] При успешной регистрации возвращается токен
- [ ] Происходит редирект в `/dashboard`

**Проверка через Swagger:**
```
POST http://localhost:8000/api/auth/register
{
  "full_name": "Иван Иванов",
  "phone_number": "+998901234567",
  "password": "test123"
}

Ожидаемый ответ:
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer",
  "expires_in": 86400
}
```

---

### 3️⃣ Тест: Вход в систему

**URL**: http://localhost:3000/dashboard

**Данные:**
```
Телефон: +998901234567
Пароль: test123
```

**Что проверять:**
- [ ] Вход успешен
- [ ] Токены сохраняются в localStorage
- [ ] Открывается dashboard

---

### 4️⃣ Тест: Личный кабинет (Dashboard)

**URL**: http://localhost:3000/dashboard

**Что проверять:**
- [ ] Отображается профиль пользователя
- [ ] Показываются поля (если есть)
- [ ] Кнопка "Выйти" работает
- [ ] Статистика считается корректно

---

### 5️⃣ Тест: Создание поля

**Swagger**: http://localhost:8000/docs

**Запрос:**
```
POST /api/fields
Authorization: Bearer <ваш токен>

{
  "field_name": "Test Field 1",
  "crop_type": "Cotton",
  "latitude": 41.3115,
  "longitude": 69.2401,
  "area_hectares": 5.0,
  "moisture_threshold": 25
}
```

**Ожидаемый ответ:**
```json
{
  "message": "Поле успешно создано",
  "field_name": "Test Field 1"
}
```

---

### 6️⃣ Тест: Отправка телеметрии

**Swagger:**
```
POST /api/telemetry

{
  "field_id": "Test Field 1",
  "moisture": 28,
  "temperature": 25.5,
  "battery": 95
}
```

**Ожидаемый ответ:**
```json
{
  "status": "success",
  "message": "Данные получены и сохранены",
  "field_id": "Test Field 1"
}
```

---

### 7️⃣ Тест: Получение телеметрии

**Swagger:**
```
GET /api/telemetry/Test Field 1
```

**Ожидаемый ответ:**
```json
{
  "field_id": "Test Field 1",
  "moisture": 28,
  "temperature": 25.5,
  "battery": 95,
  "timestamp": "2024-03-04T12:00:00"
}
```

---

### 8️⃣ Тест: Экспорт отчета (PDF)

**Swagger:**
```
GET /api/reports/Test Field 1/export?format=pdf&days=7
Authorization: Bearer <токен>
```

**Ожидаемый результат:**
- [ ] Файл скачивается
- [ ] Формат: PDF
- [ ] Имя файла: `Test Field 1_report_7d.pdf`

**Для Excel:**
```
GET /api/reports/Test Field 1/export?format=xlsx&days=7
```

---

### 9️⃣ Тест: Погода для поля

**Swagger:**
```
GET /api/fields/Test Field 1/weather
Authorization: Bearer <токен>
```

**Ожидаемый ответ:**
```json
{
  "current": {
    "temperature": 22.5,
    "humidity": 65,
    "description": "ясно",
    ...
  },
  "forecast": [...],
  "recommendation": {
    "recommendation": "no_irrigation",
    "message": "Полив не требуется",
    ...
  }
}
```

**Примечание:** Если `OPENWEATHER_API_KEY` не настроен, погода не вернется.

---

### 🔟 Тест: Карта полей

**URL**: http://localhost:3000/dashboard/map

**Что проверять:**
- [ ] Карта загружается
- [ ] Маркеры полей отображаются
- [ ] Цвет маркера соответствует статусу:
  - 🟢 Зеленый: влажность >= 25%
  - 🟡 Желтый: 15-25%
  - 🔴 Красный: < 15%
- [ ] Клик по маркеру показывает popup
- [ ] Поиск по названию работает
- [ ] Фильтры работают

---

### 1️⃣1️⃣ Тест: SMS код (эмуляция)

**Swagger:**
```
POST /api/sms/send-code
Authorization: Bearer <токен>

Query: phone=+998901234567
```

**Ожидаемый ответ (dev режим):**
```json
{
  "ok": true,
  "message": "Код сгенерирован (SMS не отправлено)",
  "debug_code": "123456"
}
```

**Проверка кода:**
```
POST /api/sms/verify-code
Authorization: Bearer <токен>

{
  "phone": "+998901234567",
  "code": "123456"
}
```

---

### 1️⃣2️⃣ Тест: Rate Limiting

**Запросов:** 6+ раз за 1 минуту

**Swagger:**
```
POST /api/lead (отправить 6 раз подряд)
```

**Ожидаемый ответ (на 6-й раз):**
```json
{
  "error": "Слишком много запросов",
  "retry_after": 45
}
```

Status Code: **429 Too Many Requests**

---

### 1️⃣3️⃣ Тест: Валидация телефона

**Невалидные номера:**
```
POST /api/auth/register
{
  "full_name": "Тест",
  "phone_number": "12345",  // ❌ Короткий
  "password": "test123"
}

Ожидаемый ответ: 422 Validation Error
```

```
POST /api/auth/register
{
  "full_name": "Тест",
  "phone_number": "+99890123456",  // ❌ Неправильный формат
  "password": "test123"
}

Ожидаемый ответ: 422 Validation Error
```

**Валидный номер:**
```
+998901234567  ✅
```

---

### 1️⃣4️⃣ Тест: JWT Токены

**1. Получить токен:**
```
POST /api/auth/login
{
  "phone_number": "+998901234567",
  "password": "test123"
}
```

**2. Использовать токен:**
```
GET /api/profile/me
Authorization: Bearer <токен>
```

**3. Просроченный токен:**
- Подождать 24 часа или изменить `JWT_EXPIRATION_HOURS=0` в `.env`
- Запрос с старым токеном должен вернуть **401 Unauthorized**

**4. Refresh токена:**
```
POST /api/auth/refresh
{
  "refresh_token": "<ваш refresh токен>"
}
```

---

## 🐛 Отладка

### Логи Backend

```
c:\Users\dream3r\Documents\GitHub\aqlli-dala-demo\backend\logs\
├── app_2024-03-04.log    # Логи приложения
└── error_2024-03-04.log  # Ошибки
```

### Логи Frontend

Открыть DevTools (F12) → Console

### Проверка localStorage

DevTools → Application → Local Storage → http://localhost:3000

```
access_token: "eyJ..."
refresh_token: "eyJ..."
```

---

## 📊 Автоматические тесты

### Запуск тестов Backend

```powershell
cd backend
venv\Scripts\activate
pytest tests/ -v --cov=.
```

### Проверка покрытия

```powershell
pytest tests/ --cov=. --cov-report=html
# Отчет: htmlcov/index.html
```

---

## ✅ Итоговый чек-лист

| Функция | Статус | Примечание |
|---------|--------|------------|
| Регистрация | ⬜ | |
| Вход | ⬜ | |
| Профиль | ⬜ | |
| Создание поля | ⬜ | |
| Телеметрия | ⬜ | |
| Карта | ⬜ | |
| Отчеты PDF/Excel | ⬜ | |
| Погода | ⬜ | Требуется API ключ |
| SMS | ⬜ | Эмуляция в dev |
| Rate Limiting | ⬜ | |
| JWT | ⬜ | |

---

## 🎯 Критические баги

Если обнаружили:

1. **500 Internal Server Error** → Проверить `backend/logs/error_*.log`
2. **CORS ошибки** → Проверить `ALLOWED_ORIGINS` в `.env`
3. **401 Unauthorized** → Проверить токен в localStorage
4. **База данных не создается** → Удалить `aqlli_dala.db` и перезапустить

---

## 📞 Контакты для поддержки

- Telegram: @AqlliDala_Support
- Email: support@aqllidala.uz
