const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboard_record_controller');

// leaderboard base routers
router.post('/', leaderboardController.add_scores);
router.get('/', leaderboardController.get_scores);


module.exports = router;
