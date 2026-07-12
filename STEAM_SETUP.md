# Steam Status Tracker Setup

## What's New
The topbar on the left now displays your real-time Steam status instead of the static "SebOS Portfolio" text!

## How It Works
- The frontend (index.html/script.js) runs on port 3000 (via Live Server)
- A backend server (server.js) runs on port 3002 and fetches data from Steam's API
- The topbar updates every 30 seconds with your current Steam status

## Status Display
- 🟢 **Online** - You're online on Steam
- 🎮 **Playing [Game Name]** - You're currently playing a game
- 🟡 **Away** - You're marked as away
- 🔴 **Offline** / **Busy** - Offline or busy status
- 🔄 **Loading Steam...** - Initial load or error

## Running the Backend

### Option 1: Terminal
```bash
cd /workspaces/MyWebOS-Porfolio
npm start
```

### Option 2: Direct Node
```bash
cd /workspaces/MyWebOS-Porfolio
node server.js
```

The server will start on `http://localhost:3002` and will automatically use your Steam API key from the `.env` file.

## Configuration
Your Steam API key is stored in `.env` (not committed to git). If you need to change it:

1. Edit `.env` file
2. Restart the server

## Troubleshooting
- **"API key not configured"**: Make sure `.env` file exists with your STEAM_API_KEY
- **"Upgrade Required"**: Port might be in use, check `lsof -i :3002`
- **No status updates**: Check browser console for CORS or network errors

## Files Modified/Created
- ✅ `server.js` - Backend API server (NEW)
- ✅ `.env` - Configuration with your Steam API key (NEW)
- ✅ `.env.example` - Template for .env (NEW)
- ✅ `index.html` - Updated topbar element
- ✅ `script.js` - Added Steam status tracking
- ✅ `package.json` - Added npm start script and dependencies
