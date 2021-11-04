const leaderboardRecordData = require('../models/leaderboard_record');
/**
 * Leaderboard Controller
 * 
 * functions 
 *      -add scores
 *      -get scores
 */

/**
 * add scores
 * 
 * add each player socre to the leaderboard
 * iterate through the players and add each score to the leaderboard_record
 * 
 * parameters
 *      -list of player objects (required)
 */
const add_scores = async(req, res) => {
    console.log(req);
    // //get all the info from req
    // const record = req.body;
    // //create new record
    // const newRecord = new leaderboardRecordData(record);

    // try {
    //     await newRecord.save();
    //     res.status(201);
    // } catch (error) {
    //     res.status(409).json({
    //         message: error.message
    //     })
    // }
}

/**
 * get scores
 * 
 * get all data from the leaderboard_record
 */
const get_scores = async(req, res) => {
    try {
        const allRecords = await leaderboardRecordData.find();
        res.status(200).json(allRecords);
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}