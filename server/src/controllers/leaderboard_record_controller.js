const LeaderboardRecordData = require('../models/leaderboard_record');
const LobbyData = require('../models/lobby');
/**
 * Leaderboard Controller
 * 
 * functions 
 *      -add scores
 *      -get scores
 */

/**
 * add scores
 */
const add_scores = (req, res) => {
    /**
     * create a new record
     * 
     * save it to the db and return the record
     */
    const lobby = req.body;

    // console.log(newLobby.players)
    lobby.players.forEach(async (player) => {
        if(player.isRobot == false){
            const newRecord = new LeaderboardRecordData({
                player_name: player.nickname, 
                total_score: player.total_points,
                speed_score: player.speed_points,
                trivia_score: player.trivia_points
            });
            add_scores_helper()
        }
    })
}

const add_scores_helper = async (record, res) => {
    const newRecord = new LeaderboardRecordData(record);
    await newRecord.save()
    .then(() => {
        res.status(201);
    })
    .catch ((error) => {
        res.status(409).json({
            message: error.message
        })
    });
    
}

/**
 * get scores
 */
const get_scores = async(req, res) => {
    /**
     * search for all records in the db and return them all
     */
    await LeaderboardRecordData.find()
    .then((records) => {
        res.status(200).json(records);
    })
    .catch ((error) => {
        res.status(404).json({
            message: error.message
        })
    });
}

module.exports = {
    add_scores,
    get_scores,
};