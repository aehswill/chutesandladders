const express = require('express');

const router = express.Router();
const playerController = require('../controllers/player_controller');
const Player = require('../models/player');

//player base route
router.post('/', playerController.create_player);

module.exports = router;