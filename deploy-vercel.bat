@echo off
echo 🚀 Deploying to Vercel...
echo.

echo 📦 Installing Vercel CLI...
npm install -g vercel

if %errorlevel% neq 0 (
    echo ❌ Failed to install Vercel CLI. Please check your internet connection.
    pause
    exit /b 1
)

echo.
echo ✅ Vercel CLI installed successfully!
echo.
echo 🔐 Logging into Vercel...
vercel login

if %errorlevel% neq 0 (
    echo ❌ Failed to login to Vercel. Please try again.
    pause
    exit /b 1
)

echo.
echo 🎯 Deploying your app...
vercel --prod

if %errorlevel% neq 0 (
    echo ❌ Deployment failed. Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo 🎉 Deployment successful!
echo.
echo 📱 Your app is now live on Vercel!
echo.
pause
