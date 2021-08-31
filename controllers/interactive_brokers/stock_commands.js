
'use strict'
const async = require('async');
const algotrader = require('algotrader');
const IEX = algotrader.Data.IEX;
const AlphaVantage = algotrader.Data.AlphaVantage;
//const av = new AlphaVantage("73C4VTI1I69LO4AO");

var yahooFinance = require('yahoo-finance');
var XLSXChart = require ("xlsx-chart");
var xlsxChart = new XLSXChart ();




exports.ib_buy_func =  function (req,res){
  console.log(req.body)
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
    let quantity = parseInt(req.body.volume_per_trade)
    ib.placeOrder(
      orderId,
      ib.contract.stock(stock),
      ib.order.market(action, quantity),

    );
    ib.reqOpenOrders();
  }).once('openOrderEnd', function () {
    ib.disconnect();
    res.json({status:"success"})
  })

  ib.connect()
    .reqIds(1);
}

exports.ib_buy_then_sell_trailing_func =  function (req,res){
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
    let quantity = parseInt(req.body.volume_per_trade)
    let aux = req.body.trades_trail_by
    ib.placeOrder(
      orderId,
      ib.contract.stock(stock),
      ib.order.market(action, quantity),
 // safe, unreal value used for demo
    );
    ib.placeOrder(
      orderId+1,
      ib.contract.stock(stock),
      //Should check to see if this works
      ib.order.trailingStop("SELL", quantity, aux)  // safe, unreal value used for demo
    );
    ib.reqOpenOrders();
  }).once('openOrderEnd', function () {
    ib.disconnect();
    res.json({status:"success"})
  })

  ib.connect()
    .reqIds(1);
}

exports.ib_short_func =  function (req,res){
  console.log(req.body)
    var ib = new (require('ib'))({
      clientId: req.body.ib_client_id,
      host: '127.0.0.1',
      port: req.body.ib_port
  }).on('error', function (err) {
    console.error('error --- %s', err.message);
  }).on('result', function (event, args) {
    console.log('%s --- %s', event, JSON.stringify(args));
  }).once('nextValidId', function (orderId) {
    let action='SELL'
    let stock = req.body.stock
    let quantity = parseInt(req.body.volume_per_trade)
    ib.placeOrder(
      orderId,
      ib.contract.stock(stock),
      ib.order.market(action, quantity),

    );
    ib.reqOpenOrders();
  }).once('openOrderEnd', function () {
    ib.disconnect();
    res.json({status:"success"})
  })

  ib.connect()
    .reqIds(1);
}

exports.ib_short_then_buy_trailing_func =  function (req,res){
    var ib = new (require('ib'))({
      clientId: req.body.ib_client_id,
      host: '127.0.0.1',
      port: req.body.ib_port
  }).on('error', function (err) {
    console.error('error --- %s', err.message);
  }).on('result', function (event, args) {
    console.log('%s --- %s', event, JSON.stringify(args));
  }).once('nextValidId', function (orderId) {
    let action='SELL'
    let stock = req.body.stock
    let quantity = parseInt(req.body.volume_per_trade)
    let aux = req.body.trades_trail_by
    ib.placeOrder(
      orderId,
      ib.contract.stock(stock),
      ib.order.market(action, quantity),
 // safe, unreal value used for demo
    );
    ib.placeOrder(
      orderId+1,
      ib.contract.stock(stock),
      //Should check to see if this works
      ib.order.trailingStop("BUY", quantity, aux)  // safe, unreal value used for demo
    );
    ib.reqOpenOrders();
  }).once('openOrderEnd', function () {
    ib.disconnect();
    res.json({status:"success"})
  })

  ib.connect()
    .reqIds(1);
}

exports.exit_long_position = function (req,res) {
  var ib = new (require('ib'))({
      clientId: req.body.ib_client_id,
      host: '127.0.0.1',
      port: req.body.ib_port
  }).on('error', function (err) {
    console.error('error --- %s', err.message);
  }).on('result', function (event, args) {
    //console.log('%s --- %s', event, JSON.stringify(args));
  }).on('position', function (account, contract, pos, avgCost) {
    if (contract.symbol.toLowerCase() === req.body.stock.toLowerCase() && pos >=req.body.volume_per_trade && contract.secType ==="STK"){
      ib.reqIds(1);
      ib.on('nextValidId', function (orderId) {
        console.log("here")
        let action='SELL'
        let stock = req.body.stock
        let quantity = parseInt(req.body.volume_per_trade)
        let aux = 1
        ib.placeOrder(
          orderId,
          ib.contract.stock(stock),
          ib.order.market(action, quantity),

        );
        ib.disconnect();
      })

    } else {
      ib.disconnect();
    }
  })

  ib.connect();

  ib.reqPositions();

}

exports.exit_short_position = function (req,res) {
  var ib = new (require('ib'))({
      clientId: req.body.ib_client_id,
      host: '127.0.0.1',
      port: req.body.ib_port
  }).on('error', function (err) {
    console.error('error --- %s', err.message);
  }).on('result', function (event, args) {
    //console.log('%s --- %s', event, JSON.stringify(args));
  }).on('position', function (account, contract, pos, avgCost) {
    if (contract.symbol.toLowerCase() === req.body.stock.toLowerCase() && pos >=req.body.volume_per_trade && contract.secType ==="STK"){
      ib.reqIds(1);
      ib.on('nextValidId', function (orderId) {
        console.log("here")
        let action='BUY'
        let stock = req.body.stock
        let quantity = parseInt(req.body.volume_per_trade)
        let aux = 1
        ib.placeOrder(
          orderId,
          ib.contract.stock(stock),
          ib.order.market(action, quantity),

        );
        ib.disconnect();
      })

    } else {
      ib.disconnect();
    }
  })

  ib.connect();

  ib.reqPositions();

}
