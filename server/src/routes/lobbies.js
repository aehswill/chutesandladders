const express = require('express');

const router = express.Router();
const lobbyController = require('../controllers/lobby_controller');
const gamestateController = require('../controllers/gamestate_controller');

//lobby routes
router.get('/', lobbyController.get_lobbies);
router.post('/', lobbyController.create_lobby);

router.get('/:id', lobbyController.get_lobby);
router.delete('/:id', lobbyController.delete_lobby);

router.get('/:id/players', lobbyController.get_players);
router.put('/:id/players', lobbyController.add_player);


//gamestate routes
router.get('/:id/gamestate/player', gamestateController.get_active_player);

router.get('/:id/gamestate/question', gamestateController.get_active_trivia_question);
router.post('/:id/gamestate/question', gamestateController.check_player_trivia_answer);

module.exports = router;