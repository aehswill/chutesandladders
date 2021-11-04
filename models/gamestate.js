const mongoose = require('mongoose');
const Player = require('./player');

/**
 * gamestate shcema
 * 
 * i dont think im importing Player correctly
 * 
 */
const gamestateSchema = mongoose.Schema({
    active_trivia_question: String,
    player_trivia_answer: String,
    active_player: Player
});

const Gamestate = mongoose.model('Gamestate', gamestateSchema);

module.exports = Gamestate;