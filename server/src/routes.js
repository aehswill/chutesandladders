const express = require('express');
const api = express.Router();

// const emojiRouter = require('./routes/emojis');
const leaderboardRouter = require('./routes/leaderboard');
const lobbyRouter = require('./routes/lobbies');
const playerRouter = require('./routes/player');

api.use('/player', playerRouter);
api.use('/lobbies', lobbyRouter);
api.use('/leaderboard', leaderboardRouter);

module.exports = api;