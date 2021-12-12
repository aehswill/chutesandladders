const PlayerData = require('../models/player');

/**
 * Player Controller
 * 
 * functions 
 *      -create player
 *      -update player color
 */

/**
 * create player
 * 
 */
const create_player = async (req, res) => {
    /**
     * create a new player
     * 
     * search the db for the new player's id
     * if a record is found in the db
     *  return a 409 and do NOT save the new player
     * else
     *  save the new player and return the new player to the frontend
     */
    const newPlayer = new PlayerData(req.body);

    await PlayerData.findOne({ 'player_uid': newPlayer.player_uid })
        .then(async (found_player) => {
            if (found_player) {
                update_player(newPlayer, res);
            }
            else{
                await newPlayer.save()
                .then(() => {
                    res.status(201).json(newPlayer);
                })
                .catch((error) => {
                    res.status(409).json({
                        error_code: error.message,
                        error_message: 'Player UID apready exists'
                    });
                });
            }
        })
        .catch((error) => {
            res.status(409).json({
                error_code: error.message,
                error_message: 'Player UID apready exists'
            });
        });
}

const update_player = async(player, res)=>{
    await PlayerData.findByIdAndUpdate(player._id, player)
    .then(() =>{
        res.status(200).json(player);
    })
    .catch(error=>{
        res.status(406).json({
            message: error.message
        })
    });
}


module.exports = {
    create_player,
    update_player,
}