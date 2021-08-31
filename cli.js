/*
 * Useful helper script to quickly launch a nodel CLI/REPL interface to fire off commands.
 * The script automatically connects to the running database and loads up all the models.
 *
 * Example usage: node cli.js
 * > User.find().limit(1)
 * { .. output ... }
 *
 */

const mongoose = require('mongoose');
const db = require('./config/database')();
const _ = require('lodash');
const fs = require('fs');
const repl = require('repl');
const r = repl.start('> ');

fs.readdirSync('./models').forEach(function (file) {
  var constantName = _.upperFirst(_.camelCase(_.split(file, ".")[0]));

  Object.defineProperty(r.context, constantName, {
      configurable: false,
      enumerable: true,
    value: require('./models/' + file)
  });

  console.log("Loaded: " + constantName);
}.bind(this));



