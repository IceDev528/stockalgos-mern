'use strict'
const async = require('async')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Message = require('../../common/constant')

exports.ensureAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.json({
      status: 'redirect',
      message: 'Please Sign In',
      redirect_to: '/sign_in'
    })
  }
}

exports.authenticate_user = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      res.json({
        status: 'login error',
        message: info.message,
        redirect_to: '/sign_in'
      })
      return
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      return
    })
    res.locals.user = user
    next()
  })(req, res, next)
}

exports.fetch_user_details = function (req, res, next) {
  if (req.user !== undefined) {
    let result = {
      current_user_id: req.user._id,
      current_user_name: req.user.name,
      current_user_email: req.user.email,
      current_user_first_name: req.user.first_name
    }
    res.json({
      status: 'success',
    result})
  }
}

// destroy session function
exports.log_out = function (req, res, next) {
  if (req.user !== undefined) {
    req.logOut()
    res.json({
      status: Message.SUCCESS,
      message: Message.LOG_OUT
    })
  } else {
    res.json({ status: Message.ERROR, message: Message.SESSION_NOT_FOUND })
  }
}
