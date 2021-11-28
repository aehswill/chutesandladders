const express = require('express');
const api = express.Router();

/**
 * make the routers and tell the app to use them
 */

// const emojiRouter = require('./routes/emojis');
const leaderboardRouter = require('./routes/leaderboard');
const lobbyRouter = require('./routes/lobbies');
const playerRouter = require('./routes/player');

api.use('/player', playerRouter);
api.use('/lobbies', lobbyRouter);
api.use('/leaderboard', leaderboardRouter);

module.exports = api;