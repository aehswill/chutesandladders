const mongoose = require('mongoose');

/**
 * lobby shcema
 * 
 * i dont think im importing Player or Gamestate correctly
 * 
 */
// const lobbySchema = mongoose.Schema({
//     name: String,
//     id: String,
//     players: {
//         player1: {
//             player_uid: String,
//             nickname: String,
//             ip: String, 
//             isRobot: Boolean,
//             total_points: Number,
//             speed_points: Number,
//             trivia_points: Number
//         },
//         player2: {
//             player_uid: String,
//             nickname: String,
//             ip: String, 
//             isRobot: Boolean,
//             total_points: Number,
//             speed_points: Number,
//             trivia_points: Number
//         },
//         player3: {
//             player_uid: String,
//             nickname: String,
//             ip: String, 
//             isRobot: Boolean,
//             total_points: Number,
//             speed_points: Number,
//             trivia_points: Number
//         },
//         player4: {
//             player_uid: String,
//             nickname: String,
//             ip: String, 
//             isRobot: Boolean,
//             total_points: Number,
//             speed_points: Number,
//             trivia_points: Number
//         },
//     },
//     gamestate: {
//         active_trivia_question: String,
//         player_trivia_answer: String,
//         active_player: {
//             player_uid: String,
//             nickname: String,
//             ip: String, 
//             isRobot: Boolean,
//             total_points: Number,
//             speed_points: Number,
//             trivia_points: Number,
//         }
//     }
// });

const lobbySchema = mongoose.Schema({
    name: String,
    id: String,
    players: [
        {
            player_uid: String,
            nickname: String,
            ip: String, 
            isRobot: Boolean,
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
            ip: String, 
            isRobot: Boolean,
            total_points: Number,
            speed_points: Number,
            trivia_points: Number,
        }
    }
});

const Lobby = mongoose.model('Lobby', lobbySchema);
module.exports = Lobby;