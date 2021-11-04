const express = require('express');
const router = express.Router();
const { getPlayPage } = require('./play');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chutes and Ladders' });
});

router.get('/play', getPlayPage);


module.exports = router;
