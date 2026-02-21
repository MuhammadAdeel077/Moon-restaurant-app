# Moon Restaurant Backend

Backend server for Moon Restaurant with complete admin functionality.

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your credentials
# Then start the server
npm start
```

## Features

- ✅ Booking management
- ✅ Email notifications (approval/rejection)
- ✅ Slot availability calculation
- ✅ Detailed reports and analytics
- ✅ Review system
- ✅ CORS enabled for frontend integration

## Environment Setup

Required environment variables (see `.env.example`):

```env
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_app_password
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## API Documentation

### Public Routes

#### Create Booking
```
POST /api/bookings
Body: {
  name, email, phone, branch, date, time, guests, occasion, message
}
```

#### Get Reviews
```
GET /api/reviews
```

#### Create Review
```
POST /api/reviews
Body: { name, rating, comment, branch }
```

### Admin Routes

#### Get All Bookings
```
GET /api/admin/bookings
```

#### Approve Booking
```
POST /api/admin/bookings/:id/approve
Body: { reason: "Optional confirmation message" }
```

#### Reject Booking
```
POST /api/admin/bookings/:id/reject
Body: { reason: "Required rejection reason" }
```

#### Get Available Slots
```
GET /api/admin/slots
Returns: 30-day slot availability with capacity info
```

#### Get Reports
```
GET /api/admin/reports
Returns: Comprehensive analytics and statistics
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **nodemailer**: Email sending
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Email Configuration

Uses Gmail SMTP. To set up:

1. Enable 2-Step Verification in Google Account
2. Generate App Password (Google Account > Security > App passwords)
3. Use app password in EMAIL_PASSWORD variable

## Database Schema

### Booking
- name, email, phone, branch, date, time, guests
- occasion, message, status, approvalNote
- createdAt, updatedAt

### Review
- name, rating (1-5), comment, branch
- createdAt

## Development

```bash
# Start with auto-reload
npm run dev
```

## Production

Ensure all environment variables are set in your hosting platform:
- Railway
- Heroku
- DigitalOcean
- AWS

## Architecture

```
backend/
├── server.js          # Main application file
├── package.json       # Dependencies
├── .env.example       # Environment template
└── .gitignore        # Git ignore rules
```

## Support

Check logs for errors:
- MongoDB connection issues
- Email authentication failures
- CORS errors

Common solutions:
- Verify MongoDB is running
- Check Gmail app password is correct
- Ensure FRONTEND_URL matches your frontend domain
