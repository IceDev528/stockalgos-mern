{
  /* (2019-06-07) - This is the config file that outlines the functions used
    for passport. Passport is a library used to authenticate.
  */
}
'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log(username, password)
      User.findOne({
        email: username
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Account with this email doesn't exist."
          });
        } else if (user.status !== "Active") {
          return done(null, false, {
            message: "Account is inactive."
          });
        }
        else if (user.emailVerificationToken !== undefined && user.emailVerificationToken !== null) {
          return done(null, false, {
            message: "Please click the link in the confirmation email."
          });
        }
        User.verifyPassword(password, user.password, function(err, status) {
          if (err)
            throw err;
          if (status) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Your Password doesn't match an email address you've entered."
            });
          }
        })
      });
    }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
