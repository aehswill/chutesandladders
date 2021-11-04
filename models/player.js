const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    player_uid: String,
    nickname: String,
    ip: String, 
    isRobot: Boolean,
    total_points: Number,
    speed_points: Number,
    trivia_points: Number

});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;