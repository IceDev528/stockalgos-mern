
'use strict'
const async = require('async');
const User = require('../../models/user');
var fs = require('fs');
var httpclient = require('request');

exports.test_create_file =  function(req,res){
  fs.appendFile('mynewfile1.html', '<h1>Hello content!</h1>', function (err) {
    if (err) throw err;
    console.log('Saved!');
    res.json({status:"success"})
  });
}
