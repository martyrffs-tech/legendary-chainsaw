# 🚀 BarthFlow Backend Setup

Backend API do zarządzania artykułami od agentów AI w BarthFlow.

## 📋 Wymagania

- **Node.js** v16+ 
- **npm** v8+
- **BarthFlow Frontend** (uruchomiony na porcie 3000)

## ⚡ Szybki start

### 1. Automatyczne uruchomienie

**Windows:**
```bash
# Kliknij dwukrotnie lub uruchom w cmd
start-api.bat
```

**Linux/macOS:**
```bash
# Nadaj uprawnienia wykonywania
chmod +x start-api.sh

# Uruchom skrypt
./start-api.sh
```

### 2. Manualne uruchomienie

```bash
# Przejdź do folderu API
cd api

# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev
```

Serwer będzie dostępny na: **http://localhost:3001**

## 🔗 Endpointy API

### Health Check
```
GET http://localhost:3001/health
```

### Artykuły
```
GET    /api/articles           # Lista artykułów
POST   /api/articles           # Utwórz artykuł (dla agenta AI)
GET    /api/articles/:id       # Pojedynczy artykuł
PUT    /api/articles/:id       # Aktualizuj artykuł
DELETE /api/articles/:id       # Usuń artykuł
POST   /api/articles/:id/view  # Zwiększ licznik wyświetleń
```

### Statystyki
```
GET    /api/stats              # Statystyki systemu
```

## 🤖 Integracja z agentem AI

### Python przykład
```python
import requests

# Utwórz artykuł
response = requests.post('http://localhost:3001/api/articles', json={
    "title": "Mój artykuł",
    "content": "Treść artykułu...",
    "summary": "Krótkie streszczenie",
    "tags": ["ai", "technologia"],
    "category": "technology",
    "source": "Mój AI Agent"
})

print(response.json())
```

### JavaScript/Node.js przykład
```javascript
const response = await fetch('http://localhost:3001/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: "Mój artykuł",
        content: "Treść artykułu...",
        summary: "Krótkie streszczenie",
        tags: ["ai", "technologia"],
        category: "technology",
        source: "Mój AI Agent"
    })
});

const result = await response.json();
console.log(result);
```

### cURL przykład
```bash
curl -X POST http://localhost:3001/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mój artykuł",
    "content": "Treść artykułu...",
    "summary": "Krótkie streszczenie",
    "tags": ["ai", "technologia"],
    "category": "technology",
    "source": "Mój AI Agent"
  }'
```

## 📁 Struktura danych

### Przykładowy artykuł
```json
{
  "id": "uuid-string",
  "title": "Tytuł artykułu",
  "content": "Pełna treść artykułu...",
  "summary": "Krótkie streszczenie (opcjonalne)",
  "tags": ["tag1", "tag2", "tag3"],
  "category": "technology",
  "source": "AI Agent GPT-4",
  "metadata": {
    "model": "gpt-4",
    "temperature": 0.7,
    "custom_field": "wartość"
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "status": "published",
  "views": 0
}
```

## 🧪 Przykłady i testy

### Demo skrypty
```bash
# Python demo (wymaga: pip install requests)
cd examples
python ai-agent-example.py

# Node.js demo (wymaga: npm install node-fetch readline)
cd examples
node ai-agent-example.js
```

### Testowanie API
```bash
# Sprawdź zdrowie API
curl http://localhost:3001/health

# Pobierz artykuły
curl http://localhost:3001/api/articles

# Pobierz statystyki
curl http://localhost:3001/api/stats
```

## 📊 Monitorowanie

### Logi
Serwer loguje wszystkie operacje do konsoli. W produkcji rozważ:
- Winston dla strukturalnych logów
- Morgan dla HTTP request logging
- PM2 dla zarządzania procesem

### Metryki
API dostarcza statystyki przez endpoint `/api/stats`:
- Łączna liczba artykułów
- Łączne wyświetlenia
- Kategorie i tagi
- Ostatnia aktywność

## 🔧 Konfiguracja

### Zmienne środowiskowe
Utwórz plik `.env` w folderze `api/`:
```env
PORT=3001
NODE_ENV=development
API_TITLE=BarthFlow Article API
API_VERSION=1.0.0
```

### CORS
Domyślnie API akceptuje requesty z wszystkich domen. W produkcji skonfiguruj CORS:
```javascript
const corsOptions = {
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true
};
```

## 🗄️ Przechowywanie danych

### Aktualne rozwiązanie
- Pliki JSON w folderze `api/data/`
- Artykuły: `api/data/articles.json`
- Automatyczne tworzenie i backup

### Produkcja (rekomendacje)
- **MongoDB** dla dokumentów i elastyczności
- **PostgreSQL** dla relacji i ACID
- **Redis** dla cache i sesji

## 🚀 Deployment

### Lokalne uruchomienie produkcyjne
```bash
cd api
npm start  # zamiast npm run dev
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### PM2 (rekomendowane)
```bash
# Zainstaluj PM2 globalnie
npm install -g pm2

# Uruchom aplikację
pm2 start api/server.js --name "barthflow-api"

# Monitoruj
pm2 monit

# Automatyczne uruchomienie po reboot
pm2 startup
pm2 save
```

## 🔒 Bezpieczeństwo

### Podstawowe zabezpieczenia (TODO)
- [ ] Rate limiting (express-rate-limit)
- [ ] Uwierzytelnianie (JWT)
- [ ] Walidacja inputów (Joi/express-validator)
- [ ] HTTPS w produkcji
- [ ] Helmet.js dla security headers

### Zalecenia dla agentów AI
- Używaj API keys dla identyfikacji
- Implementuj retry logic z exponential backoff
- Loguj wszystkie operacje po stronie agenta
- Monitoruj rate limits

## 📞 Wsparcie

### Rozwiązywanie problemów

**Port już używany:**
```bash
# Sprawdź co używa portu 3001
lsof -i :3001         # macOS/Linux
netstat -ano | find "3001"  # Windows

# Zatrzymaj proces lub zmień port w .env
```

**Błędy npm:**
```bash
# Wyczyść cache i reinstaluj
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**CORS errors:**
- Sprawdź czy frontend działa na http://localhost:3000
- Sprawdź konfigurację CORS w server.js
- Sprawdź czy nie ma konfliktów proxy

### Logi debugowania
```bash
# Uruchom z dodatkowymi logami
DEBUG=* npm run dev

# Tylko HTTP logi
DEBUG=express:* npm run dev
```

## 🔄 Aktualizacje

### Sprawdź aktualizacje
```bash
cd api
npm outdated
npm update
```

### Migracje danych
Przy zmianach struktury danych, stwórz skrypty migracji w `api/migrations/`.

---

**🎯 Gotowe do użycia!** 

1. ✅ Uruchom backend: `./start-api.sh` lub `start-api.bat`
2. ✅ Sprawdź frontend: http://localhost:3000 → Artykuły AI
3. ✅ Przetestuj demo: `cd examples && python ai-agent-example.py`
4. ✅ Zintegruj swojego agenta AI z API