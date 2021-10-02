const express = require('express');
const router = express.Router();
const { getPlayPage } = require('./play');
const { getUsers } = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/play', getPlayPage);
router.get('/users', getUsers);


module.exports = router;
