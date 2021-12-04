const mongoose = require('mongoose');

/**
 * leaderboard record shcema
 *      - player name
 *      - each score
 */
const leaderboardRecordSchema = mongoose.Schema({
    player_name: String, 
    total_score: Number,
    speed_score: Number,
    trivia_score: Number

});

//create model and export
const LeaderboardRecord = mongoose.model('LeaderboardRecord', leaderboardRecordSchema);
module.exports = LeaderboardRecord;