@echo off
echo 🚀 Setting up Property Filter Proxy Server...
echo.

echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies. Please make sure Node.js is installed.
    echo 💡 Download Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!
echo.
echo 🎯 Starting the server...
echo.
echo 📱 Your app will be available at: http://localhost:3000/property_filter_wireframe.html
echo.
echo ⚠️  Keep this window open while using the app
echo.

npm start
