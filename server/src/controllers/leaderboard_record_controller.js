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
 */
const add_scores = async(req, res) => {
    /**
     * create a new record
     * 
     * save it to the db and return the record
     */
    const record = req.body;
    const newRecord = new leaderboardRecordData(record);

    await newRecord.save()
    .then(() => {
        res.status(201).json(newRecord);
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
    await leaderboardRecordData.find()
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