const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/moon-restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Booking Schema
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  branch: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  occasion: { type: String },
  message: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  approvalNote: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

// Review Schema
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  branch: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Email Templates
const getApprovalEmailTemplate = (booking, note) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #667eea; }
        .button { display: inline-block; padding: 15px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
        </div>
        <div class="content">
          <h2>Dear ${booking.name},</h2>
          <p>Great news! Your booking has been <strong>confirmed</strong>.</p>
          ${note ? `<p><em>"${note}"</em></p>` : ''}
          
          <div class="booking-details">
            <h3>Booking Details</h3>
            <div class="detail-row">
              <span class="detail-label">Branch:</span>
              <span>${booking.branch}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span>${new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span>${booking.time}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Guests:</span>
              <span>${booking.guests} people</span>
            </div>
            ${booking.occasion ? `
            <div class="detail-row">
              <span class="detail-label">Occasion:</span>
              <span>${booking.occasion}</span>
            </div>
            ` : ''}
          </div>
          
          <p>We look forward to serving you! Please arrive 10 minutes before your reservation time.</p>
          <p>If you need to make any changes, please contact us at least 24 hours in advance.</p>
          
          <div style="text-align: center;">
            <a href="tel:${booking.phone}" class="button">Contact Us</a>
          </div>
          
          <div class="footer">
            <p>Moon Restaurant - Where Every Meal is a Celebration</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const getRejectionEmailTemplate = (booking, reason) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .reason-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .button { display: inline-block; padding: 15px 30px; background: #f5576c; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Update</h1>
        </div>
        <div class="content">
          <h2>Dear ${booking.name},</h2>
          <p>Thank you for your interest in dining with us. Unfortunately, we are unable to confirm your booking at this time.</p>
          
          ${reason ? `
          <div class="reason-box">
            <strong>Reason:</strong><br>
            ${reason}
          </div>
          ` : ''}
          
          <div class="booking-details">
            <h3>Requested Booking Details</h3>
            <p><strong>Branch:</strong> ${booking.branch}</p>
            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Guests:</strong> ${booking.guests} people</p>
          </div>
          
          <p>We would be happy to help you find an alternative date or time. Please feel free to:</p>
          <ul>
            <li>Try a different date or time slot</li>
            <li>Contact us directly for personalized assistance</li>
            <li>Check our available slots online</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/booking" class="button">Make New Booking</a>
          </div>
          
          <div class="footer">
            <p>Moon Restaurant - Where Every Meal is a Celebration</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send Email
async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: `"Moon Restaurant" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// ============ PUBLIC ROUTES ============

// Create Booking
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ success: true, data: booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create Review
app.post('/api/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.json({ success: true, data: review });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ ADMIN ROUTES ============

// Get All Bookings
app.get('/api/admin/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Approve Booking
app.post('/api/admin/bookings/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    booking.status = 'approved';
    booking.approvalNote = reason || '';
    booking.updatedAt = new Date();
    await booking.save();

    // Send approval email
    const emailSent = await sendEmail(
      booking.email,
      '🎉 Your Moon Restaurant Booking is Confirmed!',
      getApprovalEmailTemplate(booking, reason)
    );

    res.json({
      success: true,
      data: booking,
      emailSent,
    });
  } catch (error) {
    console.error('Error approving booking:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reject Booking
app.post('/api/admin/bookings/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    booking.status = 'rejected';
    booking.approvalNote = reason || '';
    booking.updatedAt = new Date();
    await booking.save();

    // Send rejection email
    const emailSent = await sendEmail(
      booking.email,
      'Moon Restaurant Booking Update',
      getRejectionEmailTemplate(booking, reason)
    );

    res.json({
      success: true,
      data: booking,
      emailSent,
    });
  } catch (error) {
    console.error('Error rejecting booking:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Available Slots
app.get('/api/admin/slots', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get next 30 days
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 30);

    // Get all bookings for the next 30 days
    const bookings = await Booking.find({
      date: { $gte: today, $lte: endDate },
      status: { $in: ['pending', 'approved'] }
    });

    // Time slots
    const timeSlots = [
      '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
      '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
    ];

    // Capacity per slot (can be adjusted)
    const capacityPerSlot = 50;

    // Calculate slots
    const slots = [];
    for (let d = new Date(today); d <= endDate; d.setDate(d.getDate() + 1)) {
      for (const time of timeSlots) {
        const dateStr = d.toISOString().split('T')[0];
        
        // Count bookings for this slot
        const slotBookings = bookings.filter(b => {
          const bookingDate = new Date(b.date).toISOString().split('T')[0];
          return bookingDate === dateStr && b.time === time;
        });

        const booked = slotBookings.reduce((sum, b) => sum + b.guests, 0);
        const available = Math.max(0, capacityPerSlot - booked);

        slots.push({
          date: new Date(d),
          time,
          capacity: capacityPerSlot,
          booked,
          available,
        });
      }
    }

    // Sort by date and time
    slots.sort((a, b) => {
      const dateCompare = new Date(a.date) - new Date(b.date);
      if (dateCompare !== 0) return dateCompare;
      return timeSlots.indexOf(a.time) - timeSlots.indexOf(b.time);
    });

    res.json({ success: true, data: slots });
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Reports
app.get('/api/admin/reports', async (req, res) => {
  try {
    const bookings = await Booking.find();

    // Summary statistics
    const summary = {
      totalBookings: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      approved: bookings.filter(b => b.status === 'approved').length,
      rejected: bookings.filter(b => b.status === 'rejected').length,
      totalGuests: bookings.reduce((sum, b) => sum + b.guests, 0),
      avgPartySize: bookings.length > 0 
        ? bookings.reduce((sum, b) => sum + b.guests, 0) / bookings.length 
        : 0,
    };

    // By branch
    const byBranch = {};
    bookings.forEach(b => {
      byBranch[b.branch] = (byBranch[b.branch] || 0) + 1;
    });

    // By status over time
    const byDate = {};
    bookings.forEach(b => {
      const date = new Date(b.date).toISOString().split('T')[0];
      if (!byDate[date]) {
        byDate[date] = { pending: 0, approved: 0, rejected: 0, total: 0 };
      }
      byDate[date][b.status]++;
      byDate[date].total++;
    });

    // Recent activity
    const recentActivity = bookings
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 20)
      .map(b => ({
        type: b.status,
        description: `${b.name} - ${b.branch} - ${new Date(b.date).toLocaleDateString()}`,
        timestamp: b.updatedAt,
      }));

    // Monthly statistics
    const monthlyStats = {};
    bookings.forEach(b => {
      const month = new Date(b.date).toISOString().substring(0, 7); // YYYY-MM
      if (!monthlyStats[month]) {
        monthlyStats[month] = {
          bookings: 0,
          guests: 0,
          approved: 0,
          rejected: 0,
        };
      }
      monthlyStats[month].bookings++;
      monthlyStats[month].guests += b.guests;
      if (b.status === 'approved') monthlyStats[month].approved++;
      if (b.status === 'rejected') monthlyStats[month].rejected++;
    });

    res.json({
      success: true,
      data: {
        summary,
        byBranch,
        byDate,
        recentActivity,
        monthlyStats,
      },
    });
  } catch (error) {
    console.error('Error generating reports:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
