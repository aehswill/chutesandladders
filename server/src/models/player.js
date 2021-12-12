const mongoose = require('mongoose');

/**
 * player shcema
 *      - plauer uid
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
    position: Number,
    total_points: Number,
    speed_points: Number,
    trivia_points: Number

});

// create model and export
const Player = mongoose.model('Player', playerSchema);
module.exports = Player;