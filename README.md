# Voice Laundry Booking System

A modern, professional automated laundry booking system with voice chat capabilities built using the MERN stack (MongoDB, Express, React, Node.js).

## Features

- 🔐 **User Authentication**: Secure signup and login pages
- 📊 **Dashboard**: Beautiful dashboard with statistics and quick actions
- 🎤 **Voice Booking**: Interactive voice chat for booking laundry services
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Professional gradient design with smooth animations

## Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **Styling**: Custom CSS with modern design patterns
- **Voice Recognition**: Web Speech API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
S8/
├── src/
│   ├── pages/
│   │   ├── Login.jsx          # Login page
│   │   ├── SignUp.jsx         # Signup page
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   └── Booking.jsx        # Voice booking page
│   ├── App.jsx                # Main app component with routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## Usage

### Sign Up / Login
- Navigate to the signup page to create a new account
- Or login with existing credentials
- Authentication is currently simulated with localStorage

### Dashboard
- View your booking statistics
- Access quick actions for booking and settings
- Navigate to the booking page

### Voice Booking
- Click "Start Voice Command" to begin voice interaction
- Speak your booking requirements:
  - Service type: "wash", "dry clean", or "iron"
  - Quantity: "5 items" or "10 pieces"
  - Pickup time: "today", "tomorrow", "morning", "afternoon", "evening"
  - Confirm: "confirm booking" or "book now"
- Or manually fill in the booking form
- Submit your booking

## Browser Compatibility

Voice recognition works best in:
- Google Chrome
- Microsoft Edge
- Safari (with limitations)

## Future Enhancements

- Backend API integration
- MongoDB database connection
- Real authentication with JWT
- Payment integration
- Email notifications
- Booking history
- User profile management

## License

MIT


