# Social Media Downloader Frontend

A Next.js frontend for the Social Media Downloader application.

## Features

- Clean, responsive design
- Video information display
- Multiple download quality options
- Error handling and loading states
- Support for multiple social media platforms
- Real-time connection to backend API

## Setup

1. Install dependencies:
```bash
npm install next react react-dom
```

2. Configure environment variables:
   - Copy `.env.local` and update `NEXT_PUBLIC_API_URL` with your backend URL
   - For local development: `http://localhost:5000`
   - For production: Your deployed backend URL

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### Environment Variables

- `NEXT_PUBLIC_API_URL`: URL of the backend API

### Backend Connection

The frontend connects to the backend using the URL specified in the environment variables. Make sure:

1. The backend is running and accessible
2. CORS is properly configured in the backend
3. The API URL in `.env.local` matches your backend deployment

## API Integration

The frontend communicates with the backend through these endpoints:

- `POST /api/info`: Get video information
- `POST /api/download`: Download video files

## Deployment

You can deploy this frontend to platforms like:

- Vercel (recommended for Next.js)
- Netlify
- Railway
- Any hosting platform that supports Node.js

Remember to update the `NEXT_PUBLIC_API_URL` environment variable with your production backend URL.

## File Structure

```
yt-downloader-frontend/
├── .env.local          # Environment variables
├── pages/
│   └── index.js        # Main application page
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "13.5.6",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
}
```
