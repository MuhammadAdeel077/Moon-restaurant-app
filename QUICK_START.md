# 🌙 Moon Restaurant - Super Admin System

## 🎉 What's Been Created

A complete super admin system has been successfully created for your Moon Restaurant Next.js application!

### ✨ Key Features

1. **Admin Dashboard** (`/admin`)
   - Manage all bookings
   - Approve/reject with custom messages
   - View available slots
   - Generate detailed reports
   - NO LOGIN REQUIRED (as requested)

2. **Automated Emails**
   - Beautiful HTML templates
   - Approval emails with confirmation
   - Rejection emails with reasons
   - Professional design

3. **Slot Management**
   - 30-day advance view
   - Real-time availability
   - Color-coded status
   - Capacity tracking

4. **Comprehensive Reports**
   - Statistics dashboard
   - Branch-wise breakdowns
   - Export to CSV/JSON
   - Recent activity log

## 📂 Files Created

### Frontend (Next.js)
```
app/
├── admin/
│   └── page.tsx                    # Main admin dashboard
├── api/
│   └── admin/
│       ├── bookings/
│       │   ├── route.ts           # Fetch bookings API
│       │   └── [id]/[action]/
│       │       └── route.ts       # Approve/reject API
│       ├── slots/
│       │   └── route.ts           # Slots API
│       └── reports/
│           └── route.ts           # Reports API

components/
└── Navbar.tsx                      # Updated with admin link

ADMIN_DOCUMENTATION.md              # Complete documentation
setup.ps1                          # Windows setup script
setup.sh                           # macOS/Linux setup script
```

### Backend (Express)
```
backend/
├── server.js                      # Complete backend with:
│                                  # - Booking management
│                                  # - Email service
 │                                  # - Slot calculation
│                                  # - Report generation
├── package.json                   # Dependencies
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
└── README.md                      # Backend documentation
```

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

**Windows (PowerShell):**
```powershell
.\setup.ps1
```

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

1. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Configure Environment Variables:**

   **Backend `.env`:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/moon-restaurant
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

   **Frontend `.env` (if needed):**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB:**
   ```bash
   mongod
   ```

5. **Start Backend Server:**
   ```bash
   cd backend
   npm start
   ```

6. **Start Frontend:**
   ```bash
   npm run dev
   ```

7. **Access Admin Dashboard:**
   ```
   http://localhost:3000/admin
   ```

## 🔑 Email Setup (Gmail)

To send automated emails:

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to: **Security** > **2-Step Verification**
3. Enable 2-Step Verification if not already enabled
4. Go to: **Security** > **App passwords**
5. Create a new app password for "Mail"
6. Copy the 16-character password
7. Use this in your `.env` file as `EMAIL_PASSWORD`

## 📱 Admin Dashboard Features

### Bookings Tab
- **Search & Filter**: Find bookings by name, email, phone, or status
- **Approve Bookings**: Add custom confirmation messages
- **Reject Bookings**: Provide rejection reasons
- **View Details**: See all booking information at a glance
- **Status Tracking**: Visual badges for pending/approved/rejected

### Available Slots Tab
- **30-Day View**: See all upcoming availability
- **Visual Indicators**: 
  - 🟢 Green = Plenty available (>5 spots)
  - 🟡 Yellow = Limited (1-5 spots)
  - 🔴 Red = Fully booked
- **Capacity Info**: Total, booked, and available counts
- **Progress Bars**: Quick visual reference

### Reports Tab
- **Summary Cards**: Key metrics at a glance
- **Branch Analysis**: Performance by location
- **Guest Statistics**: Total guests and averages
- **Activity Feed**: Recent booking actions
- **Export Options**: Download as CSV or JSON

## 📧 Email Templates

### Approval Email
- Celebratory gradient header
- Complete booking details
- Custom admin message
- Professional footer
- Mobile-responsive design

### Rejection Email
- Empathetic design
- Clear rejection reason
- Alternative booking link
- Contact information
- Helpful next steps

## 🔐 Security Note

⚠️ **IMPORTANT**: This admin panel has NO AUTHENTICATION as per your requirements.

**For Production**, you should add:
- Authentication system (JWT, NextAuth, etc.)
- Role-based access control
- Rate limiting
- HTTPS
- Environment-specific configurations

## 📊 Database Structure

### Booking Schema
```javascript
{
  name: String,
  email: String,
  phone: String,
  branch: String,
  date: Date,
  time: String,
  guests: Number,
  occasion: String,
  message: String,
  status: 'pending' | 'approved' | 'rejected',
  approvalNote: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Email**: Nodemailer (Gmail SMTP)
- **UI**: Responsive design, animations, modern components

## 📖 Documentation

For detailed documentation, see:
- **ADMIN_DOCUMENTATION.md** - Complete feature guide
- **backend/README.md** - Backend API documentation

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Make sure MongoDB is running
mongod

# Check connection string in backend/.env
MONGODB_URI=mongodb://localhost:27017/moon-restaurant
```

### Email Not Sending
- Verify Gmail app password is correct
- Check 2-Step Verification is enabled
- Ensure `EMAIL_USER` and `EMAIL_PASSWORD` are set
- Check firewall/antivirus blocking SMTP

### Admin Page Not Loading
- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in frontend .env
- Check browser console for errors
- Verify CORS is enabled in backend

### Port Already in Use
```bash
# Backend (port 5000)
# Kill process using port
netstat -ano | findstr :5000
taskkill /PID <process-id> /F

# Frontend (port 3000)
netstat -ano | findstr :3000
taskkill /PID <process-id> /F
```

## 🎯 Next Steps

1. ✅ Setup complete - All files created
2. 📝 Configure environment variables
3. 🗄️ Install and start MongoDB
4. 🚀 Start backend and frontend
5. 🌐 Access admin at: http://localhost:3000/admin
6. 📧 Test email functionality
7. 🎨 Customize as needed

## 📞 Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is running
4. Check backend logs for errors
5. Verify email credentials

## 🎊 Success!

Your Super Admin Dashboard is ready to use! 

- **Frontend**: Beautiful, responsive UI
- **Backend**: Robust API with email integration
- **Features**: Complete booking management
- **Reports**: Comprehensive analytics
- **No Login**: Easy access as requested

Enjoy managing your restaurant bookings! 🌙✨
