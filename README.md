# Moon Restaurant - Next.js Website

Where Taste Meets the Moonlight 🌙

## About

Premium Pakistani restaurant with two branches in Naran and Besar. This is the official website featuring online booking, location information, and customer reviews.

## Contact Information

**Naran Branch:** +92 311 2932080  
**Besar Branch:** +92 331 2241322  
**Email:** info@moonrestaurant.com  
**Hours:** Daily 11:00 AM - 11:00 PM

## Features

- 🍽️ Online group booking system
- 📍 Two branch locations (Naran & Besar)
- ⭐ Customer reviews section
- 📱 Responsive mobile-first design
- 🎨 Modern UI with Framer Motion animations
- 👨‍💼 Admin dashboard for booking management

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Notifications:** Sonner
- **Backend:** Node.js with MongoDB (Railway hosted)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Environment Variables

Create a `.env` file in the root directory:

```
NEXT_PUBLIC_API_URL=your_backend_api_url
```

## Project Structure

```
app/
├── admin/          # Admin dashboard
├── api/            # API routes
├── booking/        # Booking page
├── locations/      # Locations page
├── reviews/        # Reviews page
├── page.tsx        # Home page
└── layout.tsx      # Root layout

components/         # Reusable components
public/            # Static assets
backend/           # Backend server (Node.js/MongoDB)
```

## Deployment

The website is production-ready and configured for deployment on:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

### Backend

The backend API is hosted on Railway. Contact system administrators for backend configuration.

## Support

For technical support or inquiries:
- **Phone:** +92 311 2932080 (Naran) | +92 331 2241322 (Besar)
- **Email:** info@moonrestaurant.com

## License

© 2026 Moon Restaurant. All rights reserved.
