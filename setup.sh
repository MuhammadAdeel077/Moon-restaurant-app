#!/bin/bash

# Moon Restaurant - Quick Setup Script (macOS/Linux)

echo "========================================"
echo "Moon Restaurant - Quick Setup"
echo "========================================"
echo ""

# Check Node.js
echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js $NODE_VERSION is installed"
else
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check MongoDB
echo "Checking MongoDB installation..."
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB is installed"
else
    echo "⚠️  MongoDB not found. Please install MongoDB Community Edition."
fi

echo ""
echo "========================================"
echo "Setting up Frontend..."
echo "========================================"

# Frontend setup
if [ -f "package.json" ]; then
    echo "Installing frontend dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        echo "✅ Frontend dependencies installed"
    else
        echo "❌ Frontend installation failed"
        exit 1
    fi
else
    echo "❌ package.json not found in current directory"
    exit 1
fi

echo ""
echo "========================================"
echo "Setting up Backend..."
echo "========================================"

# Backend setup
if [ -d "backend" ]; then
    cd backend
    
    if [ -f "package.json" ]; then
        echo "Installing backend dependencies..."
        npm install
        if [ $? -eq 0 ]; then
            echo "✅ Backend dependencies installed"
        else
            echo "❌ Backend installation failed"
            cd ..
            exit 1
        fi
        
        # Create .env if it doesn't exist
        if [ ! -f ".env" ]; then
            echo "Creating .env file from template..."
            cp .env.example .env
            echo "✅ .env file created"
            echo "⚠️  Please edit backend/.env with your credentials"
        fi
    fi
    
    cd ..
else
    echo "❌ Backend folder not found"
fi

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next Steps:"
echo "1. Edit backend/.env with your MongoDB URI and Gmail credentials"
echo "2. Start MongoDB: mongod"
echo "3. Start backend: cd backend && npm start"
echo "4. Start frontend: npm run dev"
echo "5. Visit admin panel: http://localhost:3000/admin"
echo ""
echo "📚 For detailed documentation, see ADMIN_DOCUMENTATION.md"
echo ""
