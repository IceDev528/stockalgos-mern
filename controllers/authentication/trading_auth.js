'use strict'

const User = require('../../models/user');
const async = require('async');
var crypto = require('crypto');
var Nodemailer = require('../../config/nodemailer');


exports.validate_trading_auth = function (req,res,next){
  User.findOne(req.user).lean().exec((err,user)=>{
    if (req.body.ib_port ===user.ib_port && req.body.ib_client_id ===user.ib_client_id && req.body.authentication_key ===user.tradingAuthToken &&Date.now()<user.tradingAuthTokenExpires){

      if (req.body.stock_signal !== undefined ||req.body.stock !== undefined){
        next()
      } else {
        res.json({
          status:"authenticated"
        })
      }

    } else {
      console.log("incorrect")
      res.json({
        status:"failed"
      })
    }
  })
}

exports.generate_authentication_tokens = function (req,res){
  let transporter = Nodemailer
  console.log(req.user._id)
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({
        _id: req.user._id
      }, function(err, user) {
        if (!user) {
          res.json({
            status: "error",
            message: "That email is not linked to an account, please try again"
          })
          return
        } else {
          let fields = {ib_client_id:user.ib_client_id,ib_port:user.ib_port}
          res.json({
            status:"success",
            user:fields
          })
        }

        user.tradingAuthToken = token;
        user.tradingAuthTokenExpires = Date.now() + (3600000*12); // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
        let email= {
          //to: user.email,
          to: "trevorbergeron@hotmail.com",
          from: "gamer5000@hotmail.ca",
          subject: 'Trading Authentication Key',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'Enter this token in the Authentication Key Field= ' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        }

      transporter.sendMail(email, function(error, info) {
                if (error) {
                  throw error;
                } else {
                  console.log("Email successfully sent!");

                }
              });
    }
  ])
}
