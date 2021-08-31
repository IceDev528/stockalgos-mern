
'use strict'
const async = require('async');
const algotrader = require('algotrader');
const IEX = algotrader.Data.IEX;
const AlphaVantage = algotrader.Data.AlphaVantage;
var moment = require('moment');
//const av = new AlphaVantage("73C4VTI1I69LO4AO");

var yahooFinance = require('yahoo-finance');
var XLSXChart = require ("xlsx-chart");
var xlsxChart = new XLSXChart ();
var _ = require('lodash');
var chalk = require('chalk');
var util = require('util');



exports.place_option_trade = function(req,res){
  console.log(req.body,"here")
    var ib = new (require('ib'))({
      clientId: req.body.ib_client_id,
      host: '127.0.0.1',
      port: req.body.ib_port
  }).on('error', function (err) {
    console.error('error --- %s', err.message);
  }).on('result', function (event, args) {
    console.log('%s --- %s', event, JSON.stringify(args));
  }).once('nextValidId', function (orderId) {
    let action='BUY'
    let stock = req.body.stock
    let contract_date = moment(req.body.contract_date).add(1, 'days').format("YYYYMMDD")
    console.log(contract_date)
    let string_date = JSON.stringify(contract_date)
    console.log(string_date)
    let strike = parseFloat(req.body.strike)
    let quantity = parseInt(req.body.volume_per_trade)
    ib.placeOrder(
      orderId,
      ib.contract.option(stock, string_date, strike, 'C'),
      ib.order.limit(action, quantity,price),

    );
    ib.reqOpenOrders();
  }).once('openOrderEnd', function () {
    setTimeout(function () {
      ib.disconnect();
    },1000)
    res.json({status:"success"})
  })

  ib.connect()
    .reqIds(2);
}
