const PlayerData = require('../models/player');

/**
 * Player Controller
 * 
 * functions 
 *      -create player
 *      -update player color
 *      -get scores
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
                res.status(409).josn({
                    message: error.message
                });
            }
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
        })
        .catch((error) => {
            res.status(409).json({
                error_code: error.message,
                error_message: 'Player UID apready exists'
            });
        });
}

/**
 * update player color
 * 
 * update the player's color variable from null to the passed color
 * there is no player color var in schema
 */
const update_player_color = (req, res) => {
    //unsure of how to implement this
    // (TW) do we need to add color, difficulty to Player model?
    // when the player is updated, look for the lobby that contains matching playerID and put
}

/**
 * get scores
 * 
 * return all the score variables
 *      -total points
 *      -speed points
 *      -trivia points
 */
const get_scores = async (req, res) => {
   /**
    * get the id
    * 
    * find the player and return an object of
    *       -player nickname
    *       -total score
    *       -speed score
    *       -trivia score
    */

    const player_uid = req.params.id;
    await PlayerData.findOne({ 'id': player_uid })
        .then((player) => {
            res.status(200).json({
                player_name: player.nickname,
                total_points: player.total_points,
                speed_points: player.speed_points,
                trivia_points: player.trivia_points
            })
        })
        .catch((error) => {
            res.status(404).json({
                message: error.message
            })
        });
}

module.exports = {
    create_player,
    update_player_color,
    get_scores,
}