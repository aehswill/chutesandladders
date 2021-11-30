const mongoose = require('mongoose');

/**
 * leaderboard record shcema
 *      - player
 */
const leaderboardRecordSchema = mongoose.Schema({
    player: {
        player_uid: String,
        nickname: String, 
        isRobot: Boolean,
        isHost: Boolean,
        color: String,
        total_points: Number,
        speed_points: Number,
        trivia_points: Number,
    },
    score_ranking: Number,
    speed_ranking: Number,
    trivia_ranking: Number

});

//create model and export
const LeaderboardRecord = mongoose.model('LeaderboardRecord', leaderboardRecordSchema);
module.exports = LeaderboardRecord;