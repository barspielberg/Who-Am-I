const passport = require("passport");

const User = require("../models/user");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.googleCallbackURL,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id })
        .then((user) => {
          if (user) cb(null, user);
          else {
            user = new User({ googleId: profile.id });
            return user
              .save()
              .then((user) => cb(null, user))
              .catch((err) => cb(err, null));
          }
        })
        .catch((err) => cb(err, null));
    }
  )
);
