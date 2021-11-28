const mongoose = require('mongoose');

/**
 * gamestate shcema
 *      -active trivia question
 *      -answer to trivia question
 *      -active player
 */
const gamestateSchema = mongoose.Schema({
    active_trivia_question: String,
    player_trivia_answer: String,
    active_player: {
        player_uid: String,
        nickname: String,
        isRobot: Boolean,
        isHost: Boolean,
        total_points: Number,
        speed_points: Number,
        trivia_points: Number,
    }
});

// create model and export
const Gamestate = mongoose.model('Gamestate', gamestateSchema);
module.exports = Gamestate;