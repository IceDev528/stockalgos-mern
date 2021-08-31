
'use strict'
const async = require('async');
const algotrader = require('algotrader');
const IEX = algotrader.Data.IEX;
const AlphaVantage = algotrader.Data.AlphaVantage;
//const av = new AlphaVantage("73C4VTI1I69LO4AO");

var yahooFinance = require('yahoo-finance');
var XLSXChart = require ("xlsx-chart");
var xlsxChart = new XLSXChart ();

const Robinhood = algotrader.Robinhood;

exports.robinhood_buy_func = function (req,res){
  const options = {
      doNotSaveToDisk: false, // If the `save` method should not store the user login info to disk (file)
      serializedUserFile: null // File to where the serialized user login info can be saved
  };

  const myUser = new User("username", "password", options);
  myUser.authenticate()
      .then(() => {
          // User was authenticated
      })
      .catch(error => {
          // Either the request failed, or Robinhood responded with an error.
          // (Ex: you don't have internet access or your user credentials were incorrect)
      })
}
