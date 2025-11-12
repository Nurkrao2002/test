# HeyGen Streaming Avatar Demo

A simple web application that demonstrates HeyGen's streaming avatar SDK to show a real-time avatar on a web page.

## Features

- Real-time avatar streaming
- Interactive text-to-speech
- Start/stop session controls
- Modern, responsive UI
- Secure API key handling

## Prerequisites

- Node.js (v16 or higher)
- A HeyGen account with API access
- A HeyGen API key (free tier provides 10 credits/month)
- An interactive avatar available in your account (paid tier required for custom avatars)

## Setup Instructions

### 1. Get Your HeyGen API Key

1. Sign in to [HeyGen](https://heygen.com)
2. Go to **Settings → Subscriptions → HeyGen API**
3. Copy your API token
4. Keep it safe; never expose it in frontend code

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
HEYGEN_API_KEY=your_api_key_here
```

**Important**: Replace `your_api_key_here` with your actual HeyGen API key.

### 4. Run the Application

#### Option 1: Run both servers simultaneously
```bash
npm start
```

#### Option 2: Run servers separately

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 5. Access the Demo

Open your browser and navigate to:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Usage

1. **Start Session**: Click "Start Session" to initialize the avatar
2. **Type Message**: Enter text in the input field
3. **Speak**: Click "Speak" or press Enter to make the avatar speak
4. **End Session**: Click "End Session" to stop the avatar

## Avatar Configuration

To use a different avatar, modify the `avatarName` in `src/main.ts`:

```typescript
await avatar.createStartAvatar({
  quality: AvatarQuality.High,
  avatarName: 'Your_Avatar_ID_Here' // Replace with your avatar ID
});
```

### Available Stock Avatars

- `Wayne_20240711` (default)
- `Josh_20240711`
- `Emma_20240711`
- And more...

## Project Structure

```
/heygen-streaming-demo
├── .env                    # Environment variables (create this)
├── env.example            # Environment template
├── package.json           # Dependencies and scripts
├── server.js              # Backend Express server
├── vite.config.ts         # Vite configuration with API proxy
├── index.html             # Main HTML file
├── README.md              # This file
└── /src
    ├── main.ts            # Main application logic
    └── style.css          # Styling
```

## API Endpoints

- `GET /api/get-access-token` - Fetches a streaming token from HeyGen API

## Troubleshooting

### Common Issues

1. **"Failed to start avatar session"**
   - Check that your API key is correctly set in the `.env` file
   - Verify your HeyGen account has available credits
   - Ensure the avatar ID exists in your account

2. **CORS errors**
   - Make sure the backend server is running on port 3000
   - Check that the Vite proxy configuration is correct

3. **Video not displaying**
   - Check browser console for errors
   - Ensure your browser supports WebRTC
   - Try refreshing the page

### Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari (with limitations)
- Edge

## Development

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run server` - Start Express backend server
- `npm start` - Start both servers concurrently
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Environment Variables

- `HEYGEN_API_KEY` - Your HeyGen API key (required)
- `VITE_HEYGEN_API_KEY` - Frontend API key (optional, for direct usage)

## Security Notes

- Never commit your `.env` file to version control
- The API key is kept secure on the backend server
- Frontend communicates with backend via proxy to avoid exposing credentials

## Credits

This demo is based on the official HeyGen streaming avatar documentation and examples.

## License

MIT License - feel free to use this code for your own projects.