{
  /* (2019-06-06) -This is the user schema. Judges, Opportunity Owners, referral partners, startup owners, are all created using this schema.
    Sub-vertical is only used for judges.
    This model  was created to encompass future development, not every field or value is used throughout the code.
    The code below is used for the zoho api which keeps track of registration.
  */
}
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const UserSchema = new Schema({
  name: {
    type: String
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  short_bio: {
    type: String
  },

  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },

  referrer_source: {
    type: String
  },
  password: {
    type: String
  },


  ib_client_id:Number,
  ib_port:Number,
  emailVerificationToken:String,
  emailVerificationExpires:Date,

  receive_follow_up_registration_email:{type:Boolean, default:true},

  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended', 'Deleted'],
    default: 'Active',
    required: true
  },
  created_on: {
    type: Date,
    required: true,
    default: Date.now
  },
  tradingAuthToken: String,
  tradingAuthTokenExpires: Date
});



const User = module.exports = mongoose.model('User', UserSchema);

module.exports.applyHash = function(req, res, newUser, callback) {

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if (err)
        throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
module.exports.applyHash_no_req = function( newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if (err)
        throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.verifyPassword = function(suppliedPassword, databasePassword, callback) {
  bcrypt.compare(suppliedPassword, databasePassword, function(err, status) {
    if (err)
      throw err;
    callback(null, status);
  })
};
