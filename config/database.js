{
  /* (2019-06-07) - This is the databased file.
     It utilizes your local or production enviro depending on where the code
     is being run.
  */
}
'use strict';
//  Database options
const mongoose = require('mongoose');

module.exports = function() {
  const env_connection_url = `mongodb://${process.env.db_user}:${process.env.db_pass}@${process.env.db_env}`;
  const local_url = 'mongodb://localhost/other';
  var dbURL = process.env.db_user ? env_connection_url : local_url;

  mongoose.connect(dbURL, {
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then(() => {
    console.log("MongoDB server started at");
  });

  mongoose.connection.on('connected', function() {
    console.log("The connection to the database has been established!");
  });

  mongoose.connection.on('error', function(err) {
    console.error("ERROR: Database connection error: " + err);
  });

  mongoose.connection.on('disconnected', function() {
    console.error("ERROR: Database default connection is disconnected");
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.error("ERROR: Database default connection is disconnected due to application termination");
      process.exit(0)
    });
  });

  return mongoose;
}
