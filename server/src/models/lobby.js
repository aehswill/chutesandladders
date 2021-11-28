const mongoose = require('mongoose');

/**
 * lobby shcema
 *      - lobby name
 *      - ID
 *      - is the lobby private or public?
 *      - player array
 *      - gamestate
 */
const lobbySchema = mongoose.Schema({
    name: String,
    id: String,
    isPublic: Boolean,
    players: [{
            player_uid: String,
            nickname: String,
            isRobot: Boolean,
            isHost: Boolean,
            total_points: Number,
            speed_points: Number,
            trivia_points: Number
        }
    ],
    gamestate: {
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
    }
});

// create model and export
const Lobby = mongoose.model('Lobby', lobbySchema);
module.exports = Lobby;