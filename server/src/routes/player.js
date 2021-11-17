const express = require('express');

const router = express.Router();
const playerController = require('../controllers/player_controller');
const Player = require('../models/player');


router.post('/', playerController.create_player);
router.get('/:id/scores', playerController.get_scores)

module.exports = router;