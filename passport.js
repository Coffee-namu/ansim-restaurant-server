var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var models = require('./models');

passport.use(new LocalStrategy({ session: true }, (username, password, done) => {
  models.member.findOne({ where: { username: username } })
  .then(member => {
    if (!member) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!bcrypt.compareSync(password, member.password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, member);
  })
  .catch(err => {
    if (err) {
      return done(err);
    }
  });
}));

passport.serializeUser((member, done) => {
  done(null, member.member_id);
});

passport.deserializeUser((member_id, done) => {
  models.member.findByPk(member_id).then(member => {
    done(null, member);
  });
});

module.exports = passport;
