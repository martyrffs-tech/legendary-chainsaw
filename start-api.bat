@echo off
echo 🚀 Uruchamianie BarthFlow API Backend...

REM Sprawdź czy Node.js jest zainstalowany
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js nie jest zainstalowany. Zainstaluj Node.js z https://nodejs.org/
    pause
    exit /b 1
)

REM Sprawdź czy npm jest zainstalowany
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm nie jest zainstalowany. Zainstaluj npm razem z Node.js
    pause
    exit /b 1
)

REM Przejdź do folderu API
cd api
if errorlevel 1 (
    echo ❌ Nie można przejść do folderu api/
    pause
    exit /b 1
)

REM Sprawdź czy package.json istnieje
if not exist "package.json" (
    echo ❌ Nie znaleziono package.json w folderze api/
    pause
    exit /b 1
)

REM Zainstaluj zależności jeśli node_modules nie istnieje
if not exist "node_modules" (
    echo 📦 Instalowanie zależności npm...
    npm install
    if errorlevel 1 (
        echo ❌ Błąd podczas instalacji zależności
        pause
        exit /b 1
    )
)

REM Stwórz folder data jeśli nie istnieje
if not exist "data" (
    echo 📁 Tworzenie folderu data...
    mkdir data
)

echo 🎯 Uruchamianie API na porcie 3001...
echo 📄 Dokumentacja API: http://localhost:3001/health
echo 🔗 Endpoint artykułów: http://localhost:3001/api/articles
echo.
echo Aby zatrzymać serwer, użyj Ctrl+C
echo.

REM Uruchom serwer
npm run dev

pause