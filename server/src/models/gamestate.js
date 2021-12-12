const mongoose = require('mongoose');

/**
 * gamestate shcema
 *      -active trivia question
 *      -answer to trivia question
 *      -active player
 */
const gamestateSchema = mongoose.Schema({
    hasStarted: Boolean,
    turn: Number,
    active_trivia_question: String,
    player_trivia_answer: String,
    active_player: {
        player_uid: String,
        nickname: String,
        isRobot: Boolean,
        isHost: Boolean,
        color: String,
        position: Number,
        total_points: Number,
        speed_points: Number,
        trivia_points: Number,
    },
    messages:[{
        message: String,    
    }]
});

// create model and export
const Gamestate = mongoose.model('Gamestate', gamestateSchema);
module.exports = Gamestate;