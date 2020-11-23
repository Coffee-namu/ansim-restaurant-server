var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/login', passport.authenticate('local'), function(req, res, next) {
  res.end();
});

router.post('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.end();
  });
});

module.exports = router;
