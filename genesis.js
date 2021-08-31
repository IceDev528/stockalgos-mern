'use strict';

require('dotenv').config();
require('newrelic');

//  Setting up Express
const express = require('express');
const morgan = require('morgan');
const app = express();
const Sentry = require('@sentry/node');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const {URL} = require('url');
const frameguard = require('frameguard');
const favicon = require('serve-favicon');
const authMiddleware = require('./middlewares/auth');

Sentry.init({
  dsn: process.env.SENTRY_DSN
});

// The sentry request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
app.use(morgan('short'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser())
app.use(helmet());


// this should be invoked before any content is served
if (process.env.NODE_ENV === 'production') {
  app.use(authMiddleware.forceSSL);
}

// these routes actually serve content
app.use(express.static(__dirname + '/client/build'));
//app.use(favicon(__dirname + '/client/src/img/' + 'combined.png'));

//  Setting up Database
const mongoose = require('mongoose');
const db = require('./config/database')();

//  Setting up Moment.js
const moment = require('moment');

//  Setting up Node Email library
const nodemailer = require('nodemailer');

// Setup sessions
const session = require("express-session");
const store = require('./config/memory_store');
app.use(session({
  secret: 'heartbreak',
  saveUninitialized: false,
  resave: false,
  store /*cookie: { maxAge: 600000 } */
}));

// Setup Authentication Req's
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Setting up router
const router = express.Router();
const routes = require('./routes/router');

// Session handling function
// app.use(function (req, res, next) {
//   if(req.url === '/create_user' || req.url === '/sign_in') {
//     next()
//   } else {
//     if (req.isAuthenticated()) {
//       next()
//     } else {
//       res.json({
//         status: 'redirect',
//         message: 'Please Sign In',
//         redirect_to: '/sign_in'
//       })
//     }
//   }
// })

// Router
app.use('/', routes);
// The sentry error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

//  Handling 404
app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.sendFile(__dirname + '/client/build/404.html');
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({
      error: 'Not found :('
    });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found :(');
});

// HTTP server setup

//const http = require('http');
//const https = require('https');
const port = process.env.PORT || 5001;

app.listen(port, function(err) {
  if (!err) {
    console.log(`We've got a lift off on port ${port}`)
  } else {
    console.log(`Not your day! Something went wrong on port ${port}`);
    throw err;
  }
});

module.exports = app;
