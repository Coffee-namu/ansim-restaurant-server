var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
// var models = require('../models');

router.get('/test', function(req, res, next) {
  res.json({ test: 'test' });
});

module.exports = router;
