const mongoose = require('mongoose');

/**
 * lobby shcema
 *      - lobby name
 *      - ID
 *      - is the lobby private or public?
 *      - bot difficulty
 *      - player array
 *      - gamestate
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
            total_points: Number,
            speed_points: Number,
            trivia_points: Number
        }
    ],
    gamestate: {
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
            total_points: Number,
            speed_points: Number,
            trivia_points: Number,
        },
        messages:[{
            message: String,
        }]
    }
});

// create model and export
const Lobby = mongoose.model('Lobby', lobbySchema);
module.exports = Lobby;