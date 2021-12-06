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
    /**
     * get the lobby id
     * 
     * search the db for that lobby
     * then return the lobby's active player
     */
    
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
 * get gamestate
 * 
 * return the gamestate from the lobby
 */
 const get_gamestate = async(req, res) => {
    /**
     * get the lobby id
     * 
     * search the db for that lobby
     * then return the lobby's active player
     */
    
    const lobby_id = req.params.id;
    await LobbyData.findOne({'id': lobby_id})
    .then((lobby) => {
        res.status(200).json(lobby.gamestate);
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
    /**
     * get the lobby id
     * 
     * search the db for that lobby
     * then return the lobby's gamestate
     */

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

/**
 * update gamestate
 * 
 * update the lobby's gamestate and return updated gamestate
 */
 const update_gamestate = async(req, res) => {
    /**
     * get the lobby id
     * 
     * search the db for that lobby
     * then update and return the lobby's gamestate
     */
    
    const lobby_id = req.params.id;
    await LobbyData.findOne({'id': lobby_id})
    .then(async(lobby) => {
        lobby.gamestate = req.body.data.gamestate;
        await LobbyData.findByIdAndUpdate(lobby._id, lobby);
        res.status(200).json(lobby.gamestate);
    })
    .catch ((error) => {
        res.status(400).json({
            message: error.message
        });
    });
}

module.exports = {
    get_active_player,
    get_gamestate,
    get_active_trivia_question,
    check_player_trivia_answer,
    update_gamestate,
}