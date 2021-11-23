const GamestateData = require('../models/gamestate');
const LobbyData = require('../models/lobby');
const PlayerData = require('../models/player');
/**
 * gamestate controller
 * 
 * functions
 *      -get active player
 *      -get active trivia question
 *      -check player trivia answer
 */

/**
 * get active player
 * 
 * return the player from the lobby that is currently active
 */
const get_active_player = async(req, res) => {
    const lobby_id = req.params.id;

    await LobbyData.findOne({'id': lobby_id})
    .then((lobby) => {
        const player = lobby.gamestate.active_player;
        res.status(200).json(player);
    })
    .catch ((error) => {
        res.status(400).json({
            message: error.message
        });
    });
}

/**
 * get active trivia question
 * 
 * return the active trivia question from the lobby's gamestate
 */
const get_active_trivia_question = async(req, res) => {
    const lobby_id = req.params.id;
    await LobbyData.findOne({'id': lobby_id})
    .then((lobby) => {
        const question = lobby.gamestate.active_trivia_question;
        res.status(200).json(question);
    })
    .catch ((error) => {
        res.status(400).json({
            message: error.message
        });
    });
}

/**
 * check player trivia question
 * 
 * i think we can do this in the front end?
 * 
 */
const check_player_trivia_answer = (req, res) => {
    const id = req.params.id;
    const answer = req.body;
    console.log(answer)
    try {
        //we want to check the answer against the correct answer
        //but this may require a rework of the active triva question
        //part of the gamestate model
        // res.status(200).json(question);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    get_active_player,
    get_active_trivia_question,
    check_player_trivia_answer
}