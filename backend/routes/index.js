var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Sanity check works! This is the /api backend route.')
});

module.exports = router;
