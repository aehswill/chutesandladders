const express = require('express');
const router = express.Router;
const lobbyController = require('../controllers/lobby_controller');

router.get('/', lobbyController.get_lobbies)
router.post('/', lobbyController.create_lobby)