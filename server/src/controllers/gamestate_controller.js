const axios = require('axios');

const LobbyData = require('../models/lobby');
/**
 * gamestate controller
 * 
 * functions
 *      -get active player
 *      -get active trivia question
 *      -get gamestate
 *      -update gamestate
 *      -get players
 *      -update position
 *      -update scores
 *      -get trivia
 *      -get messages
 *      -update messages
 *      -get next player
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

/**
 * get players
 * 
 */
const get_players = async(req, res) => {
    /**
     * find the lobby to get the players from
     * then return the players and isTurn for each player
     */
    const lobby_id = req.params.id;
    await LobbyData.findOne({'id': lobby_id})
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
}

/**
 * update position
 * 
 */
const update_position = async(req, res) => {
    /**
     * find the loby
     * find the player to update and update the position
     * 
     * return all the player and isTurn for all players
     */
    const lobby_id = req.params.id;
    await LobbyData.findOne({'id': lobby_id})
    .then(async (lobby) => {
        var updatedPlayer = lobby.players.find(player=>player.player_uid === req.body.player_uid)
        lobby.players.map(player=>{
            if(player.player_uid === req.body.player_uid){
                player.position = req.body.position;
            }
            return player;
        })
        await LobbyData.updateOne({'id': lobby_id}, lobby, {new: true})
        await LobbyData.findOne({'id': lobby_id})
        .then((lobby) => {
            console.log(lobby);
            const players = lobby.players.map(player=>{
                return({
                    'player': player, 
                    'isTurn': (lobby.gamestate.active_player_uid === player.player_uid)
                })
            })
            res.status(200).json(players);
        })
        .catch(error=>{
            res.status(403).json({message:error.message});
        })
    })
    .catch(error=>{
        res.status(404).json({message:error.message});
    })


    //player list
    
        
}

/**
 * update scores
 * 
 */
const update_scores = async(req, res) => {
    /**
     * find the lobby to update
     * 
     * update the scores for each player in the lobby
     * update the whole lobby
     * return the lobby
     */
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
        await LobbyData.findOne({'id': lobby_id})
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

/**
 * get trivia
 * 
 */
const get_trivia = async(req, res) => {
    /**
     * find lobby
     * 
     * get a trivia question from the open trivia api
     * format the question and return it
     */
    const lobby_id = req.params.id;
    await LobbyData.findOne({'id': lobby_id})
    .then((lobby) => {
        axios.get(`https://opentdb.com/api.php?amount=1&difficulty=${lobby.difficulty}&type=boolean`)
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

/**
 * get messages
 */
const get_messages = async(req, res) => {
    /**
     * find the lobby
     * return the lobby's gamestate's mesage array
     */
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

/**
 * update messages
 * 
 */
const update_messages = async(req, res) => {
    /**
     * find the lobby and update the lobby's gamestate's messages array
     * return the message array
     */
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

/**
 * get next player
 * 
 */
const get_next_player = async(req, res) => {
    /**
     * find the lobby
     * find the index of the current player
     * set the gamestate's active_player_uid to the uid of the next player
     * increment the turn counter
     * update the lobby
     *  return all the player and isTurn for all players
     */
    const lobby_id = req.params.id;
    await LobbyData.findOne({'id': lobby_id})
    .then(async(lobby) => {
        let indexOfCurrent;
        lobby.players.forEach(player => {
            if(player.player_uid === lobby.gamestate.active_player_uid)
                indexOfCurrent = lobby.players.indexOf(player);
        })
        let indexOfNext = (indexOfCurrent + 1 > 3) ? 0 : indexOfCurrent + 1;
        lobby.gamestate.active_player_uid = lobby.players[indexOfNext].player_uid;
        lobby.gamestate.turn++;
        await LobbyData.updateOne({'id': lobby_id}, lobby, {new: true})
        .then(async() => {
            await LobbyData.findOne({'id': lobby_id})
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
    update_gamestate,
    update_position,
    get_players,
    get_trivia,
    update_scores,
    get_messages,
    update_messages,
    get_next_player
}