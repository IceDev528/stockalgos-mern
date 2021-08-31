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



const FrontEndCodeSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }, //array, hard-coded
  code_text:{
    type:String
  }
});


const FrontEndCode = module.exports = mongoose.model('FrontEndCode', FrontEndCodeSchema);
