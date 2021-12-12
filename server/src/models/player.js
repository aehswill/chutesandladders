const mongoose = require('mongoose');

/**
 * player shcema
 *      - player uid
 *      - nickname
 *      - isRobot
 *      - isHost
 *      - color
 *      - points fields
 */
const playerSchema = mongoose.Schema({
    player_uid: String,
    nickname: String,
    isRobot: Boolean,
    isHost: Boolean,
    color: String,
    total_points: Number,
    speed_points: Number,
    trivia_points: Number

});

// create model and export
const Player = mongoose.model('Player', playerSchema);
module.exports = Player;