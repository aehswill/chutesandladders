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
 */
 const create_lobby = async(req, res) => {
    /**
     * create a new lobby
     * 
     * seach for the new lobby in the db unsing the new lobby id
     * if a lobby is found
     *      return a 409
     * else
     *      save and return the new lobby
     */
    const lobby = req.body;

    const newLobby = new LobbyData(lobby);

    await LobbyData.findOne({'id' : newLobby.id})
    .then(async(found_lobby) => {
        if(found_lobby){
            res.status(409).josn({
                message: error.message
            });
        }
        await newLobby.save()
        .then(() => {
            res.status(201).json(newLobby);
        })
        .catch ((error) => {
            res.status(409).json({
                message: error.message
            });
        });
    })
    .catch ((error) => {
        res.status(409).json({
            message: error.message
        });
    });
}

/**
 * delete lobby
 */
const delete_lobby = async(req, res) => {
    /**
     * get the lobby id
     * 
     * seach the db for a lobby using the lobby id
     * 
     * if a lobby is found
     *  delete the lobby
     * else
     *  return a 404
     */
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
 */
const get_lobbies = async(req, res) => {

    /**
     * seach the db for all lobbies and return all lobbies
     */
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

/**
 * get public lobbies
 */
 const get_public_lobbies = async(req, res) => {

    /**
     * seach the db for all lobbies where isPrivate is false and return those lobbies
     */
    await LobbyData.find({ isPublic : true}).exec()
    .then((public_lobbies) => {
        res.status(200).json(public_lobbies);
    })
    .catch ((error) => {
        res.status(400).json({
            message: error.message
        });
    });
}

const get_lobby = async(req, res) => {
    /**
     * get the lobby id
     * 
     * seach the db for a lobby using the id
     * if no lobby is found
     *  send a 404
     * else
     *  return the lobby
     */
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
 */
const add_player = async(req, res) => {
    /**
     * get the lobby id
     * create a new player
     * 
     * seach the db for the lobby
     * loop through the lobby's players
     *  if a robot appears
     *      replace the robot with a human player
     *      set playerAdded to true
     * 
     * if playerAdded is true
     *  update the lobby and return the lobby
     * else 
     *  give a "lobby is full" error
     * 
     */
    const lobby_id = req.params.id;
    const newPlayer = new Player(req.body);

    await LobbyData.findOne({'id': lobby_id})
    .then(async(lobby) => {
        var playerAdded = false;
        for(var i = 0; i<lobby.players.length; i++){
            if(lobby.players[i].isRobot == true){
                lobby.players[i] = newPlayer;
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
 */
const get_players = async(req, res) => {
    /**
     * get the id
     * 
     * search the db for the lobby using the id
     * return all the players from the lobby
     */
    const lobby_id = req.params.id;
    
    await LobbyData.findOne({'id': lobby_id})
    .then((lobby) => {
        res.status(200).json(lobby.players);
    })
    .catch((error) => {
        res.status(400).json(error.message)
    });
}

/**
 * update player color
 * 
 * update the player's color variable from null to the passed color
 * there is no player color var in schema
 */
 const update_player_color = async(req, res) => {

    const lobby_id = req.params.id;
    const player_uid = req.params.uid;
     await LobbyData.findOne({'id': lobby_id})
     .then(async(lobby) => {
        const temp = lobby.players.map(player=>{
            if(player.player_uid == req.body.player_uid){
                player.color = req.body.color
            }
            return player;
        })
        lobby.players = temp;
        await LobbyData.findByIdAndUpdate(lobby._id, lobby)
        return res.status(200).json(lobby);
     })   
     .catch ((error) => {
         return res.status(400).json({
             message: error.message,
             request: error.request,
             response: error.response
         });
     });
}

const set_privacy = async(req, res) => {
    /**
     * get the lobby id
     * create a new player
     * 
     * seach the db for the lobby
     * set isPrivate to req.body
     * retutn the new lobby
     * 
     */
     const lobby_id = req.params.id;
     await LobbyData.findOne({'id': lobby_id})
     .then(async(lobby) => {
        lobby.isPublic = req.body.isPublic;
        await LobbyData.findByIdAndUpdate(lobby._id, lobby);
        return res.status(200).json(lobby);
     })   
     .catch ((error) => {
         return res.status(400).json({
             message: error.message,
             request: error.request,
             response: error.response
         });
     });
}


module.exports = {
    create_lobby,
    delete_lobby,
    get_lobbies,
    get_public_lobbies,
    get_lobby,
    add_player,
    get_players,
    set_privacy,
    update_player_color,
};
