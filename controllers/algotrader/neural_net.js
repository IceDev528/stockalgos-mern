//on pause
'use strict'
const tf =require('@tensorflow/tfjs');
const async = require('async');

const algotrader = require('algotrader');


var yahooFinance = require('yahoo-finance');
var XLSXChart = require ("xlsx-chart");
var bs = require("black-scholes");
var moment = require('moment');
var fs = require('fs');
var path = require('path');


var d3 = require("d3");
const z = require("zebras")
const pd = require("node-pandas")
const pd2 = require("node-pandas")

var xlsxChart = new XLSXChart ();


const Data = algotrader.Data;
const Yahoo = algotrader.Data.Yahoo;
const AlphaVantage = algotrader.Data.AlphaVantage;
const av = new AlphaVantage("73C4VTI1I69LO4AO");

const IEX = algotrader.Data.IEX;


const model = tf.sequential();

exports.neural_net = function (req,res){

}
