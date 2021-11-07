const express = require('express');

const router = express.Router();
const lobbyController = require('../controllers/lobby_controller');

router.get('/', lobbyController.get_lobbies);
router.get('/:id', lobbyController.get_lobby);
router.post('/', lobbyController.create_lobby);
router.get('/:id/players', lobbyController.get_players);

module.exports = router;