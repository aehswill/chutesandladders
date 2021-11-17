const mongoose = require('mongoose');
const Player = require('./player')


/**
 * leaderboard record shcema
 * 
 * i dont think im importing Player correctly
 * 
 */
const leaderboardRecordSchema = mongoose.Schema({
    player: {
        player_uid: String,
        nickname: String,
        ip: String, 
        isRobot: Boolean,
        total_points: Number,
        speed_points: Number,
        trivia_points: Number,
    },
    score_ranking: Number,
    speed_ranking: Number,
    trivia_ranking: Number

});

const LeaderboardRecord = mongoose.model('LeaderboardRecord', leaderboardRecordSchema);

module.exports = LeaderboardRecord;