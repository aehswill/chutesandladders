const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboard_record_controller');

router.get('/', leaderboardController.get_scores);
router.post('/', leaderboardController.add_scores);

module.exports = router;
