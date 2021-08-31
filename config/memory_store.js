{
  /* (2019-06-07) - This is the config file that outlines the functions used
    for memory store. Memory Store is used to manage the cookies on the client side.
  */
}
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);

const store = new MongoStore({
  mongooseConnection: mongoose.connection
})

store.on('create', function(sessionID) {
  //console.log(`New session with an ID: ${sessionID} has been created`);
});
/*.on('touch', function(sessionID){
  console.log(`Existing session with an ID: ${sessionID} has been touched`);
}).on('update', function(sessionID){
  console.log(`Existing session with an ID: ${sessionID} has been updated`);
}).on('destroy', function(sessionID){
  console.log(`Session with an ID: ${sessionID} has been destroyed`);
});*/

module.exports = store;
