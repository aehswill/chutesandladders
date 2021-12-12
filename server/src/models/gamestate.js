const mongoose = require('mongoose');

/**
 * gamestate shcema
 *      -active trivia question
 *      -answer to trivia question
 *      -active player
 *      -turn
 *      -hasStarted
 *      -message array
 */
const gamestateSchema = mongoose.Schema({
    hasStarted: Boolean,
    turn: Number,
    active_trivia_question: String,
    player_trivia_answer: String,
    active_player_uid: String,
    messages:[{
        message: String,    
    }]
});

// create model and export
const Gamestate = mongoose.model('Gamestate', gamestateSchema);
module.exports = Gamestate;