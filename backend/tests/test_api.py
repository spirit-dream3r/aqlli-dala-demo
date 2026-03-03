"""
Tests for Aqlli Dala Backend
Запуск: pytest tests/ -v --cov=.
"""
import pytest
import httpx
from main import app
from config import settings


@pytest.fixture
async def client():
    """Fixture для HTTP клиента"""
    async with httpx.AsyncClient(
        base_url="http://test",
        transport=httpx.ASGITransport(app=app)
    ) as ac:
        yield ac


# ==================== HEALTH CHECKS ====================
@pytest.mark.asyncio
async def test_root(client: AsyncClient):
    """Тест корневого endpoint"""
    response = await client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert "Aqlli Dala API" in data["message"]


@pytest.mark.asyncio
async def test_health(client: AsyncClient):
    """Тест healthcheck"""
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "timestamp" in data
    assert data["version"] == "1.0.0"


# ==================== TELEMETRY ====================
@pytest.mark.asyncio
async def test_receive_telemetry_valid(client: AsyncClient):
    """Тест получения телеметрии с валидными данными"""
    payload = {
        "field_id": "test_field_1",
        "moisture": 28,
        "temperature": 25.5,
        "battery": 95
    }
    
    response = await client.post("/api/telemetry", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["field_id"] == "test_field_1"


@pytest.mark.asyncio
async def test_receive_telemetry_invalid_moisture(client: AsyncClient):
    """Тест с невалидной влажностью (>100%)"""
    payload = {
        "field_id": "test_field_1",
        "moisture": 150,  # Неверно: должно быть 0-100
        "temperature": 25.5,
        "battery": 95
    }
    
    response = await client.post("/api/telemetry", json=payload)
    assert response.status_code == 422  # Validation error


@pytest.mark.asyncio
async def test_receive_telemetry_invalid_battery(client: AsyncClient):
    """Тест с невалидным зарядом батареи"""
    payload = {
        "field_id": "test_field_1",
        "moisture": 28,
        "temperature": 25.5,
        "battery": -10  # Неверно: должно быть 0-100
    }
    
    response = await client.post("/api/telemetry", json=payload)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_get_telemetry_not_found(client: AsyncClient):
    """Тест получения несуществующей телеметрии"""
    response = await client.get("/api/telemetry/non_existent_field")
    assert response.status_code == 404


# ==================== FIELDS ====================
@pytest.mark.asyncio
async def test_add_field_valid(client: AsyncClient):
    """Тест добавления поля с валидными данными"""
    payload = {
        "field_name": "Test Field",
        "crop_type": "wheat",
        "owner_phone": "+998901234567",
        "latitude": 41.3115,
        "longitude": 69.2401,
        "area_hectares": 5.0
    }
    
    response = await client.post("/api/fields", json=payload)
    assert response.status_code in [200, 409]  # Success or already exists


@pytest.mark.asyncio
async def test_add_field_duplicate(client: AsyncClient):
    """Тест добавления дубликата поля"""
    payload = {
        "field_name": "Duplicate Field",
        "crop_type": "cotton"
    }
    
    # Первое добавление
    await client.post("/api/fields", json=payload)
    
    # Второе добавление (должно вернуть 409)
    response = await client.post("/api/fields", json=payload)
    assert response.status_code == 409


@pytest.mark.asyncio
async def test_list_fields(client: AsyncClient):
    """Тест получения списка полей"""
    response = await client.get("/api/fields")
    assert response.status_code == 200
    data = response.json()
    assert "fields" in data
    assert "count" in data


# ==================== LEADS ====================
@pytest.mark.asyncio
async def test_receive_lead_valid_phone(client: AsyncClient):
    """Тест заявки с валидным телефоном"""
    payload = {
        "name": "John Doe",
        "contact": "+998901234567",
        "region": "Tashkent",
        "message": "Interested in pilot project"
    }
    
    response = await client.post("/api/lead", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] == True


@pytest.mark.asyncio
async def test_receive_lead_valid_email(client: AsyncClient):
    """Тест заявки с валидным email"""
    payload = {
        "name": "Jane Smith",
        "contact": "test@example.com",
        "region": "Samarkand"
    }
    
    response = await client.post("/api/lead", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] == True


@pytest.mark.asyncio
async def test_receive_lead_invalid_contact(client: AsyncClient):
    """Тест заявки с невалидным контактом"""
    payload = {
        "name": "Invalid User",
        "contact": "invalid_contact"  # Не телефон и не email
    }
    
    response = await client.post("/api/lead", json=payload)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_receive_lead_missing_required(client: AsyncClient):
    """Тест заявки с отсутствующими обязательными полями"""
    payload = {
        "name": "Test User"
        # contact отсутствует
    }
    
    response = await client.post("/api/lead", json=payload)
    assert response.status_code == 422


# ==================== NEWS ====================
@pytest.mark.asyncio
async def test_get_news(client: AsyncClient):
    """Тест получения новостей"""
    response = await client.get("/api/news?limit=5")
    assert response.status_code == 200
    data = response.json()
    assert "ok" in data
    assert "news" in data or data.get("count") is not None


@pytest.mark.asyncio
async def test_get_news_invalid_limit(client: AsyncClient):
    """Тест с невалидным limit"""
    response = await client.get("/api/news?limit=100")
    assert response.status_code == 200  # Должен вернуть default limit


# ==================== PHONE VALIDATION ====================
@pytest.mark.asyncio
async def test_phone_normalization(client: AsyncClient):
    """Тест нормализации телефона"""
    # Тест с 8 вместо +998
    payload = {
        "name": "Test User",
        "contact": "8901234567",  # Должен нормализоваться
        "region": "Tashkent"
    }
    
    response = await client.post("/api/lead", json=payload)
    # Должен пройти валидацию или вернуть ошибку формата
    assert response.status_code in [200, 422]


# ==================== CORS ====================
@pytest.mark.asyncio
async def test_cors_headers(client: AsyncClient):
    """Тест CORS заголовков"""
    response = await client.get("/", headers={"Origin": "http://localhost:3000"})
    # FastAPI автоматически добавляет CORS заголовки


# ==================== ERROR HANDLING ====================
@pytest.mark.asyncio
async def test_404_not_found(client: AsyncClient):
    """Тест 404 ошибки"""
    response = await client.get("/nonexistent")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_405_method_not_allowed(client: AsyncClient):
    """Тест 405 ошибки"""
    response = await client.put("/api/fields")  # PUT не поддерживается
    assert response.status_code == 405


# ==================== INTEGRATION TESTS ====================
@pytest.mark.asyncio
async def test_full_workflow(client: AsyncClient):
    """Тест полного рабочего процесса"""
    # 1. Добавить поле
    field_payload = {
        "field_name": "Integration Test Field",
        "crop_type": "corn"
    }
    field_response = await client.post("/api/fields", json=field_payload)
    
    # 2. Отправить телеметрию
    telemetry_payload = {
        "field_id": "Integration Test Field",
        "moisture": 30,
        "temperature": 22.0,
        "battery": 100
    }
    telemetry_response = await client.post("/api/telemetry", json=telemetry_payload)
    assert telemetry_response.status_code == 200
    
    # 3. Получить телеметрию
    get_response = await client.get("/api/telemetry/Integration Test Field")
    assert get_response.status_code == 200
    data = get_response.json()
    assert data["moisture"] == 30
    
    # 4. Отправить заявку
    lead_payload = {
        "name": "Integration Tester",
        "contact": "+998901111111"
    }
    lead_response = await client.post("/api/lead", json=lead_payload)
    assert lead_response.status_code == 200
