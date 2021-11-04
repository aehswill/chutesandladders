const mongoose = require('mongoose');
const Player = require('./player');
const Gamestate = require('./gamestate');

/**
 * lobby shcema
 * 
 * i dont think im importing Player or Gamestate correctly
 * 
 */
const lobbySchema = mongoose.Schema({
    name: String,
    id: String,
    players: {
        player1: Player,
        player2: Player,
        player3: Player,
        player4: Player
    },
    gamestate: Gamestate,
});