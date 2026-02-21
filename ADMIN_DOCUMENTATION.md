# Moon Restaurant - Super Admin Dashboard

## 🎯 Overview

This project includes a complete Super Admin Dashboard for managing restaurant bookings, sending automated approval/rejection emails, viewing available slots, and generating detailed backend reports.

## ✨ Features

### 1. **Admin Dashboard** (`/admin`)
- No login required (as per requirements)
- Modern, responsive UI with tabs for different sections
- Real-time data updates

### 2. **Booking Management**
- View all bookings with status (Pending, Approved, Rejected)
- Search bookings by name, email, or phone
- Filter by status
- Approve or reject bookings with custom messages/reasons
- View booking details including:
  - Customer information
  - Date, time, and location
  - Number of guests
  - Special occasions
  - Custom messages

### 3. **Automated Email Notifications**
- Beautiful HTML email templates
- **Approval emails** with:
  - Confirmation message
  - Complete booking details
  - Professional formatting
  - Custom admin notes
- **Rejection emails** with:
  - Polite explanation
  - Reason for rejection
  - Alternative booking link
  - Contact information

### 4. **Available Slots Display**
- Visual representation of slot availability
- 30-day advance booking view
- Multiple time slots per day
- Color-coded availability:
  - Green: Plenty available (>5 spots)
  - Yellow: Limited availability (1-5 spots)
  - Red: Fully booked
- Shows capacity, booked, and available counts
- Progress bars for quick visualization

### 5. **Detailed Backend Reports**
- **Summary Statistics:**
  - Total bookings
  - Pending/Approved/Rejected counts
  - Total guests served
  - Average party size
- **Branch-wise Breakdown:**
  - Bookings per location
- **Monthly Statistics:**
  - Trends over time
  - Guest counts
  - Approval rates
- **Recent Activity Feed:**
  - Latest booking actions
  - Timestamps
- **Export Options:**
  - Download reports as CSV
  - Download reports as JSON
  - Automated filename with date

## 🚀 Installation & Setup

### Frontend (Next.js)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create/update `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Access the admin dashboard:**
   Navigate to `http://localhost:3000/admin`

### Backend (Express + MongoDB)

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create `.env` file (use `.env.example` as reference):
   ```env
   MONGODB_URI=mongodb://localhost:27017/moon-restaurant
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

4. **Set up Gmail App Password:**
   - Go to Google Account Settings
   - Navigate to: Security > 2-Step Verification > App passwords
   - Create a new app password for "Mail"
   - Use this password in `EMAIL_PASSWORD`

5. **Install MongoDB:**
   - Download and install MongoDB Community Edition
   - Start MongoDB service:
     ```bash
     mongod
     ```

6. **Run backend server:**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

## 📋 API Endpoints

### Public Endpoints

- `POST /api/bookings` - Create new booking
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create new review

### Admin Endpoints

- `GET /api/admin/bookings` - Get all bookings
- `POST /api/admin/bookings/:id/approve` - Approve booking
- `POST /api/admin/bookings/:id/reject` - Reject booking
- `GET /api/admin/slots` - Get available slots
- `GET /api/admin/reports` - Get detailed reports

## 🎨 Admin Dashboard Navigation

The admin dashboard has three main tabs:

1. **Bookings Tab:**
   - Search and filter functionality
   - Action buttons for pending bookings
   - Status badges (color-coded)
   - Detailed view of each booking

2. **Available Slots Tab:**
   - Grid view of all time slots
   - Visual capacity indicators
   - 30-day advance view
   - Real-time availability

3. **Reports Tab:**
   - Summary cards with key metrics
   - Branch-wise breakdown
   - Monthly statistics
   - Recent activity feed
   - Export buttons (CSV/JSON)

## 📧 Email Configuration

### Gmail Setup

1. Enable 2-Step Verification on your Google Account
2. Go to Google Account > Security > App passwords
3. Select "Mail" and your device
4. Copy the generated 16-character password
5. Use this in your `.env` file as `EMAIL_PASSWORD`

### Email Templates

The system includes two professionally designed email templates:

- **Approval Email:** Celebratory design with gradient header
- **Rejection Email:** Professional yet empathetic design with clear next steps

Both templates are mobile-responsive and include:
- Restaurant branding
- Complete booking details
- Call-to-action buttons
- Footer with contact information

## 🔒 Security Notes

**No Authentication Required** (as per requirements)

⚠️ **Important:** For production use, you should:
- Add authentication middleware
- Implement role-based access control
- Use environment-specific configurations
- Secure API endpoints
- Add rate limiting
- Use HTTPS

## 📊 Database Schema

### Booking Model
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
  status: ['pending', 'approved', 'rejected'],
  approvalNote: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion (animations)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Nodemailer (email service)
- CORS

## 📱 Responsive Design

The admin dashboard is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1280px - 1919px)
- Tablet (768px - 1279px)
- Mobile (320px - 767px)

## 🎯 Usage Instructions

### Approving a Booking

1. Navigate to `/admin`
2. Click on "Bookings" tab
3. Find pending booking
4. Click "Approve" button
5. Enter confirmation message (optional)
6. Click "Confirm Approval"
7. System will:
   - Update booking status
   - Send approval email to customer
   - Refresh the list

### Rejecting a Booking

1. Navigate to `/admin`
2. Click on "Bookings" tab
3. Find pending booking
4. Click "Reject" button
5. Enter rejection reason (recommended)
6. Click "Confirm Rejection"
7. System will:
   - Update booking status
   - Send rejection email with reason
   - Refresh the list

### Viewing Slots

1. Navigate to `/admin`
2. Click on "Available Slots" tab
3. View all slots for the next 30 days
4. Color indicators show availability at a glance

### Generating Reports

1. Navigate to `/admin`
2. Click on "Reports" tab
3. View comprehensive statistics
4. Click "Download CSV" or "Download JSON" to export
5. File will download with format: `booking-report-YYYY-MM-DD.csv`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

### Backend (Railway/Heroku)
1. Push backend code to GitHub
2. Create new project on Railway
3. Add MongoDB plugin
4. Set environment variables
5. Deploy

## 📞 Support

For issues or questions:
- Check the console for error messages
- Verify environment variables are set correctly
- Ensure MongoDB is running
- Check email credentials are valid

## 📝 License

This project is private and proprietary.

---

**Built with ❤️ for Moon Restaurant**
