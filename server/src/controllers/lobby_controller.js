const Lobby = require('../models/lobby');
const LobbyData = require('../models/lobby');
const Player = require('../models/player');

/**
 * Lobby Controller
 * 
 * functions 
 *      -create lobby
 *      -get lobbies
 *      -delete_lobby
 *      -add player
 *      -get players
 */

/**
 * create lobby
 * 
 * create a new instance of lobby
 *      -add single player to the player list
 *      -set lobby name
 *      -generate id
 */
 const create_lobby = async(req, res) => {
    //take the info from req and create a lobby
    const lobby = req.body;

    const newLobby = new LobbyData(lobby);
    console.log(newLobby);

    
    await newLobby.save()
    .then(() => {
        res.status(201).json(newLobby);
    })
    .catch ((error) => {
        res.status(500).josn({
            message: error.message
        });
    });
}

/**
 * delete lobby
 * 
 * delete an instance of lobby 
 */
const delete_lobby = async(req, res) => {
    const lobby_id = req.params.id;
    
    await LobbyData.findOneAndDelete({'id': lobby_id})
    .then((lobby) => {
        res.status(200);
    })
    .catch ((error) => {
        res.status(404).json({
            message: error.message
        })
    });
}

/**
 * get lobbies
 * 
 * if lobby id is passed
 *      -return the single lobby instance
 * 
 * else
 *      -return all lobby instances
 */
const get_lobbies = async(req, res) => {
    await LobbyData.find()
    .then((lobbies) => {
        res.status(200).json(lobbies);
    })
    .catch ((error) => {
        res.status(400).json({
            message: error.message
        });
    });
}

const get_lobby = async(req, res) => {
    const lobby_id = req.params.id;
    await LobbyData.findOne({'id': lobby_id})
    .then((lobby) => {
        if(lobby == null){
            res.status(404).json({
                message: error.message
            })
        }
        res.status(200).json(lobby);
    })
    .catch((error) => {
        res.status(404).json({
            message: error.message
        })
    });
}

/**
 * add player
 * 
 * parameters
 *      -player
 *      -lobby id
 * 
 * add the player to this lobby
 */
const add_player = async(req, res) => {
    const lobby_id = req.params.id;
    const newPlayer = new Player(req.body);

    await LobbyData.findOne({'id': lobby_id})
    .then(async(lobby) => {
        var playerAdded = false;
        for(var i = 0; i<lobby.players.length; i++){
            if(lobby.players[i].isRobot == true){
                lobby.players[i] = newPlayer;
                // console.log(newPlayer);
                playerAdded = true;
                break;
            }
        }
        if(playerAdded == true){
            await LobbyData.findByIdAndUpdate(lobby._id, lobby);
            return res.status(200).json(lobby);
        }
        else{
            return res.status(406).json({
                message: 'Lobby is full'
            });
        }
    })   
    .catch ((error) => {
        return res.status(400).json({
            message: error.message,
            request: error.request,
            response: error.response
        });
    });

}

/**
 * get players
 * 
 * parameters 
 *      -lobby id
 * 
 * return all players in this lobby
 */
const get_players = async(req, res) => {
    const lobby_id = req.params.id;
    
    await LobbyData.findOne({'id': lobby_id})
    .then((lobby) => {
        res.status(200).json(lobby.players);
    })
    .catch((error) => {
        res.status(400).json(error.message)
    });
}


module.exports = {
    create_lobby,
    delete_lobby,
    get_lobbies,
    get_lobby,
    add_player,
    get_players,
};
