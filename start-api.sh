#!/bin/bash

echo "🚀 Uruchamianie BarthFlow API Backend..."

# Sprawdź czy Node.js jest zainstalowany
if ! command -v node &> /dev/null; then
    echo "❌ Node.js nie jest zainstalowany. Zainstaluj Node.js z https://nodejs.org/"
    exit 1
fi

# Sprawdź czy npm jest zainstalowany
if ! command -v npm &> /dev/null; then
    echo "❌ npm nie jest zainstalowany. Zainstaluj npm razem z Node.js"
    exit 1
fi

# Przejdź do folderu API
cd api || exit 1

# Sprawdź czy package.json istnieje
if [ ! -f "package.json" ]; then
    echo "❌ Nie znaleziono package.json w folderze api/"
    exit 1
fi

# Zainstaluj zależności jeśli node_modules nie istnieje
if [ ! -d "node_modules" ]; then
    echo "📦 Instalowanie zależności npm..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Błąd podczas instalacji zależności"
        exit 1
    fi
fi

# Stwórz folder data jeśli nie istnieje
if [ ! -d "data" ]; then
    echo "📁 Tworzenie folderu data..."
    mkdir -p data
fi

# Sprawdź czy port 3001 jest wolny
if command -v lsof &> /dev/null; then
    if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null; then
        echo "⚠️  Port 3001 jest już używany. Zatrzymaj aplikację na tym porcie lub zmień PORT w .env"
        echo "Możesz sprawdzić co używa portu: lsof -i :3001"
        read -p "Kontynuować mimo to? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
fi

echo "🎯 Uruchamianie API na porcie 3001..."
echo "📄 Dokumentacja API: http://localhost:3001/health"
echo "🔗 Endpoint artykułów: http://localhost:3001/api/articles"
echo ""
echo "Aby zatrzymać serwer, użyj Ctrl+C"
echo ""

# Uruchom serwer
npm run dev