# 🚀 Quick Setup Script for Moon Restaurant Admin

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Moon Restaurant - Quick Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✅ Node.js $nodeVersion is installed" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check MongoDB
Write-Host "Checking MongoDB installation..." -ForegroundColor Yellow
$mongoRunning = mongod --version 2>$null
if ($mongoRunning) {
    Write-Host "✅ MongoDB is installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  MongoDB not found. Please install MongoDB Community Edition." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up Frontend..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Frontend setup
if (Test-Path "package.json") {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "❌ Frontend installation failed" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ package.json not found in current directory" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up Backend..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Backend setup
if (Test-Path "backend") {
    Set-Location backend
    
    if (Test-Path "package.json") {
        Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
        npm install
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
        } else {
            Write-Host "❌ Backend installation failed" -ForegroundColor Red
            Set-Location ..
            exit 1
        }
        
        # Create .env if it doesn't exist
        if (-not (Test-Path ".env")) {
            Write-Host "Creating .env file from template..." -ForegroundColor Yellow
            Copy-Item ".env.example" ".env"
            Write-Host "✅ .env file created" -ForegroundColor Green
            Write-Host "⚠️  Please edit backend/.env with your credentials" -ForegroundColor Yellow
        }
    }
    
    Set-Location ..
} else {
    Write-Host "❌ Backend folder not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Edit backend/.env with your MongoDB URI and Gmail credentials" -ForegroundColor White
Write-Host "2. Start MongoDB: mongod" -ForegroundColor White
Write-Host "3. Start backend: cd backend && npm start" -ForegroundColor White
Write-Host "4. Start frontend: npm run dev" -ForegroundColor White
Write-Host "5. Visit admin panel: http://localhost:3000/admin" -ForegroundColor White
Write-Host ""
Write-Host "📚 For detailed documentation, see ADMIN_DOCUMENTATION.md" -ForegroundColor Cyan
Write-Host ""
