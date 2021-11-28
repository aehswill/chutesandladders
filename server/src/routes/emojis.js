const express = require('express');

const router = express.Router();

// we dont really need this file
router.get('/', (req, res) => {
  res.json(['😀', '😳', '🙄']);
});

module.exports = router;
