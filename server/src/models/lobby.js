const mongoose = require('mongoose');

/**
 * lobby shcema
 *      - lobby name
 *      - ID
 *      - is the lobby private or public?
 *      - bot difficulty
 *      - player array
 *      - gamestate
 * 
 * Requirement 3.2
 */
const lobbySchema = mongoose.Schema({
    name: String,
    id: String,
    isPublic: Boolean,
    difficulty: String,
    players: [{
            player_uid: String,
            nickname: String,
            isRobot: Boolean,
            isHost: Boolean,
            color: String,
            position: Number,
            total_points: Number,
            speed_points: Number,
            trivia_points: Number
        }
    ],
    gamestate: {
        hasStarted: Boolean,
        turn: Number,
        trivia_question: String,
        trivia_answer: String,
        player_answer: String,
        active_player_uid: String,
        messages:[{
            message: String,
        }]
    }
});

// create model and export
const Lobby = mongoose.model('Lobby', lobbySchema);
module.exports = Lobby;