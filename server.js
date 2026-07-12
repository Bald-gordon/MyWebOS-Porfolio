const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_USER_ID = '76561199625864095';

if (!STEAM_API_KEY) {
  console.warn('Warning: STEAM_API_KEY environment variable is not set. Steam status will not work.');
}

// Endpoint to get Steam user status
app.get('/api/steam-status', async (req, res) => {
  try {
    if (!STEAM_API_KEY) {
      return res.json({ status: 'offline', game: null, error: 'API key not configured' });
    }

    // Get player summaries (includes online status)
    const summaryResponse = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_USER_ID}`
    );
    const summaryData = await summaryResponse.json();
    
    if (!summaryData.response?.players?.[0]) {
      return res.json({ status: 'private', game: null });
    }

    const player = summaryData.response.players[0];
    
    // Map Steam state to readable status
    const stateMap = {
      0: 'offline',
      1: 'online',
      2: 'busy',
      3: 'away',
      4: 'snooze'
    };
    
    const status = stateMap[player.personastate] || 'offline';
    let game = null;

    // If online, try to get currently playing game
    if (player.gameextrainfo) {
      game = player.gameextrainfo;
    }

    // Get currently playing app ID for more details
    if (player.gameid) {
      const recentResponse = await fetch(
        `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&count=1`
      );
      const recentData = await recentResponse.json();
      
      if (recentData.response?.games?.[0]) {
        game = recentData.response.games[0].name;
      }
    }

    res.json({ 
      status,
      game,
      lastLogoff: player.lastlogoff,
      avatarUrl: player.avatarfull
    });
  } catch (error) {
    console.error('Error fetching Steam status:', error);
    res.status(500).json({ 
      status: 'error', 
      game: null,
      error: error.message 
    });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Steam Status Server running on http://localhost:${PORT}`);
  console.log('Make sure STEAM_API_KEY environment variable is set!');
});
