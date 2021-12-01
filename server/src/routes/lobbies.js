const express = require('express');

const router = express.Router();
const lobbyController = require('../controllers/lobby_controller');
const gamestateController = require('../controllers/gamestate_controller');

//lobby base routes
router.get('/', lobbyController.get_lobbies);
router.post('/', lobbyController.create_lobby);

//kpublic lobby routes
router.get('/public', lobbyController.get_public_lobbies);

//lobby routes for specific lobbies
router.get('/:id', lobbyController.get_lobby);
router.delete('/:id', lobbyController.delete_lobby);
router.put('/:id', lobbyController.update_property);

//lobby routes to access players in specific lobbies
router.get('/:id/players', lobbyController.get_players);
router.put('/:id/players', lobbyController.add_player);

//temporary: seems that the players collection is not linked to the lobby collection
// i e I can't update the player record in players and see the update in lobby
// this should probably go in PlayerController
router.put('/:id/players/:uid', lobbyController.update_player_color)


//gamestate routes
router.get('/:id/gamestate/', gamestateController.get_gamestate);
router.put('/:id/gamestate/', gamestateController.update_gamestate);

module.exports = router;