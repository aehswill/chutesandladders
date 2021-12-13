const express = require('express');

const router = express.Router();
const lobbyController = require('../controllers/lobby_controller');
const gamestateController = require('../controllers/gamestate_controller');

//lobby base routes
router.get('/', lobbyController.get_lobbies);
router.post('/', lobbyController.create_lobby);

//public lobby routes
router.get('/public', lobbyController.get_public_lobbies);

//lobby routes for specific lobbies
router.get('/:id', lobbyController.get_lobby);
router.delete('/:id', lobbyController.delete_lobby);
router.put('/:id', lobbyController.update_property);

//lobby routes to access players in specific lobbies
router.get('/:id/players', lobbyController.get_players);
router.post('/:id/players', lobbyController.add_player);
router.put('/:id/players', lobbyController.update_player_color);


//gamestate routes
router.get('/:id/gamestate/', gamestateController.get_gamestate);
router.put('/:id/gamestate/', gamestateController.update_gamestate);
router.get('/:id/gamestate/players', gamestateController.get_players);
router.get('/:id/gamestate/trivia', gamestateController.get_trivia);
router.put('/:id/gamestate/players', gamestateController.update_position);
router.get('/:id/gamestate/next', gamestateController.get_next_player);
router.put('/:id/gamestate/scores', gamestateController.update_scores);

//message routes
router.get('/:id/gamestate/messages', gamestateController.get_messages);
router.put('/:id/gamestate/messages', gamestateController.update_messages);

module.exports = router;