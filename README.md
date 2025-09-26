# Real Estate Financing Landing Page

A full-stack application for a real estate financing company with a form to collect potential client information.

## Tech Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- Formik & Yup for form handling and validation
- React DatePicker for date inputs
- Axios for API requests

### Backend
- Node.js with Express
- CORS for cross-origin requests
- Morgan for request logging
- In-memory storage (can be replaced with a database)

## Project Structure

```
/
├── client/                 # Frontend React application
│   ├── public/             # Public assets
│   └── src/                # React source code
│       ├── components/     # React components
│       ├── types/          # TypeScript type definitions
│       └── utils/          # Utility functions
└── server/                 # Backend Node.js application
    └── index.js            # Express server
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the Application

1. Start the backend server:

```bash
cd server
npm run dev
```

2. In a separate terminal, start the frontend development server:

```bash
cd client
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Deployment

This application is structured to be easily deployed to platforms like Vercel, Netlify, or Heroku.

### Frontend Deployment

The React frontend can be built with:

```bash
cd client
npm run build
```

This creates a `build` directory with optimized production files.

### Backend Deployment

The Express backend can be deployed to any Node.js hosting service.

## Features

- Responsive design (mobile-first)
- Form validation
- API endpoint for form submission
- Success/error states
- Modern UI with animations
