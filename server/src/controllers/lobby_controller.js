const LobbyData = require('../models/lobby');

/**
 * Lobby Controller
 * 
 * functions 
 *      -create lobby
 *      -get lobbies
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
 const create_lobby = (req, res) => {
    //take the info from req and create a lobby
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
    console.log(req);
    // try {
    //     const allLobbies = await LobbyData.find();
    //     res.status(200).json(allLobbies);
    // } catch (error) {
    //     res.status(404).json({
    //         message: error.message
    //     });
    // }
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
    const id; //needs to be set

    try {
        const lobby = await LobbyData.findById(id);
        //add player to lobby
        res.status(200);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
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
    
    // const id;

    // try{
    //     const lobby = await LobbyData.findById(id);
    //     //send lobby players and status 200
    //     res.status(200).json(lobby.players)
    // } catch (error) {
    //     res.status(404).json({
    //         message: error.message
    //     });
    // }
}

