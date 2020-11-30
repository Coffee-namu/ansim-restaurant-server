var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, payload) => {
    res.json({ member_id: payload.member_id })
  })(req, res, next)
})

router.post('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.end();
  });
});

module.exports = router;
