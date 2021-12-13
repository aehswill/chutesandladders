const axios = require('axios');

const LobbyData = require('../models/lobby');
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
        let player_to_return;
        lobby.players.forEach(player => {
            if(player.player_uid === lobby.gamestate.active_player_uid)
                player_to_return = player;
        });
        res.status(200).json(player_to_return);
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
    await LobbyData.findOneAndUpdate({'id': lobby_id}, req.body, {new: true})
    .then((lobby) => {
        res.status(200).json(lobby);
    })
    .catch((error) => {
        res.status(400).json({
            message: error.message
        })
    })
}

const get_players = async(req, res) => {
    const lobby_id = req.params.id;
    await LobbyData.findOne({'id': lobby_id})
    .then(lobby=>{
        const players = lobby.players.map(player=>{
            return({
                'player': player, 
                'isTurn': (lobby.gamestate.active_player_uid === player.player_uid)
            })
        })
        res.status(200).json(players);
    })
    .catch(error=>{
        res.status(400).json({message:error.message});
    })
}

const update_position = async(req, res) => {
    const lobby_id = req.params.id;
    await LobbyData.findOne({'id': lobby_id})
    .then(lobby=>{
        //redo
        var updatedPlayer = lobby.players.find(player=>player.player_uid === req.body.player_uid)
        lobby.players = lobby.players.map(player=>{
            if(player.player_uid === req.body.player_uid){
                player.position = req.body.position
            }
        })
    })

    //player list
    await LobbyData.updateOne({'id': lobby_id}, lobby, {new: true})
    .then(lobby=>{
        const players = lobby.players.map(player=>{
            return({
                'player': player, 
                'isTurn': (lobby.gamestate.active_player_uid === player.player_uid)
            })
        })
        res.status(200).json(players);
    })
    .catch(error=>{
        res.status(400).json({message:error.message});
    })
        
}

const update_scores = async(req, res) => {
    const lobby_id = req.params.id;
    await LobbyData.findOne({'id': lobby_id})
    .then(async(lobby) => {
        lobby.players.forEach(player => {
            if(player.player_uid === req.body.player_uid){
                player.total_points = req.body.total_points;
                player.trivia_points = req.body.trivia_points;
                player.speed_points = req.body.speed_points;
            }
        });
        await LobbyData.updateOne({'id': lobby_id}, lobby, {new: true})
        .then((lobby) => {
            res.status(200).json(lobby);
        })
        .catch((error) => {
            res.status(400).json({
                message: error.message
            })
        })
    })
    .catch((error) => {
        res.status(400).json({
            message: error.message
        })
    })

}

const get_trivia = async(req, res) => {
    const lobby_id = req.params.id;
    await LobbyData.findOne({'id': lobby_id})
    .then((lobby) => {
        axios.get(`https://opentdb.com/api.php?amount=10&difficulty=${lobby.difficulty}&type=boolean`)
        .then(result=>{
            const temp = (result.data.results).map((trivia)=>{
                return ({question: trivia.question, correct_answer: trivia.correct_answer})
            })
            res.status(200).json(temp);
        })
        .catch(error=>{
            res.status(400).json({
                message: error.message
            })
        })
    })

}

const get_messages = async(req, res) => {
    const lobby_id = req.params.id;
    await LobbyData.findOne({'id': lobby_id})
    .then(async(lobby) => {
        res.status(200).json(lobby.gamestate.messages)
    })
    .catch((error) => {
        res.status(400).json({
            message: error.message
        })
    })
}

const update_messages = async(req, res) => {
    const lobby_id = req.params.id;
    await LobbyData.findOneAndUpdate({'id': lobby_id}, lobby.gamestate.messages, {new: true})
    .then(() => {
        res.status(200).json(lobby.gamestate.messages)
    })
    .catch((error) => {
        res.status(400).json({
            message: error.message
        })
    })
}

const get_next_player = async(req, res) => {
    const lobby_id = req.params.id;
    await LobbyData.findOne({'id': lobby_id})
    .then(async(lobby) => {
        let indexOfCurrent;
        lobby.players.forEach(player => {
            if(player.player_uid === lobby.gamestate.active_player_uid)
                indexOfCurrent = lobby.players.indexOf(player);
        })


        let indexOfNext = indexOfCurrent > 3 ? 0 : indexOfCurrent + 1;
        lobby.gamestate.active_player_uid = lobby.players[indexOfNext].player_uid;
        lobby.gamestate.turn++;
        await LobbyData.updateOne({'id': lobby_id}, lobby, {new: true})
        .then((lobby) => {
            const players = lobby.players.map(player=>{
                return({
                    'player': player, 
                    'isTurn': (lobby.gamestate.active_player_uid === player.player_uid)
                })
            })
            res.status(200).json(players);
        })
        .catch(error=>{
            res.status(400).json({message:error.message});
        })

    })
    .catch((error) => {
        res.status(400).json({
            message: error.message
        })
    })
}

module.exports = {
    get_active_player,
    get_gamestate,
    get_active_trivia_question,
    check_player_trivia_answer,
    update_gamestate,
    update_position,
    get_players,
    get_trivia,
    update_scores,
    get_messages,
    update_messages,
    get_next_player
}