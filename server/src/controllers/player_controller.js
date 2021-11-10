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
 * create a new instance of player 
 *      if a name is passed
 *          isRobot equals false
 *          nickname equals passed name
 *          ip equals playe's ip address
 *      else
 *          is robot equals true
 *          ip equals server's ip?
 *          nickname equals 'Robot1' etc?
 * 
 * all points variables are set to 0 
 * color is null 
 */

/**
 * for now I'm just making sure that instantiating an object works
 */
const create_player = async(req, res) => {
    //get info from req
    const player_name = req.body.name;
    //create new student
    const newPlayer = new PlayerData(req.body);

    try {
        await newPlayer.save();
        res.status(201).json(newPlayer);
        
    } catch (error) {
        res.status(409).josn({
            message: error.message
        });
    }
}

/**
 * update player color
 * 
 * update the player's color variable from null to the passed color
 * there is no player color var in schema
 */
const update_player_color = (req, res) => {
    //unsure of how to implement this
}

/**
 * get scores
 * 
 * return all the score variables
 *      -total points
 *      -speed points
 *      -trivia points
 */
const get_scores = async(req, res) => {
    //get player id from req body
    const id = req.params.id;
    //send points vars back as json
    try {
        const player = await PlayerData.findById(id);
         res.status(200).json({ 
            total_points: player.total_points,
            speed_points: player.speed_points,
            trivia_points: player.trivia_points
          })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = {
    create_player,
    update_player_color,
    get_scores,
}