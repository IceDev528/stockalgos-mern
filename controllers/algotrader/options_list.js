'use strict'
const async = require('async');

const algotrader = require('algotrader');


var yahooFinance = require('yahoo-finance');
var XLSXChart = require ("xlsx-chart");
var bs = require("black-scholes");
var moment = require('moment');
var xlsxChart = new XLSXChart ();


const Data = algotrader.Data;
const Yahoo = algotrader.Data.Yahoo;
const AlphaVantage = algotrader.Data.AlphaVantage;
const av = new AlphaVantage("73C4VTI1I69LO4AO");

const IEX = algotrader.Data.IEX;


// Returns a quote object




exports.trying_option_chain =  function(req,res){
  Yahoo.getOptionsChain(req.body.stock_1).then(array => {
    res.json({status:"success", array})
  });
}

exports.get_current_stock_price= function(req,res){
IEX.getQuote(req.body.stock_1).then(quote => {
  res.json({status:"success", quote})
})
}

exports.better_option_change=function(req,res){
  let results = []
  let daily_change_arr = []
  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
yahooFinance.historical({
symbol: "^tnx",
from: req.body.start_date,
to: req.body.end_date,
period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
}, function (err, risk_free) {
  let risk_free_rate= risk_free[0].open/100
    yahooFinance.historical({
    symbol: req.body.stock_1,
    from: req.body.start_date,
    to: req.body.end_date,
    period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  }, function (err, stock_1) {
    stock_1.map((value, index)=>{
      let daily_change=(index+1<stock_1.length?((value.close- stock_1[index+1].close) / stock_1[index+1].close):0)
      daily_change_arr.push(daily_change)

      if (index+1 === stock_1.length){
        daily_change_arr.reverse()
        let average_return = (daily_change_arr.reduce((a, b) => a + b, 0))/daily_change_arr.length
        let stdev = Math.sqrt(daily_change_arr.reduce(function (sq, n) {
              return sq + Math.pow(n - average_return, 2);
          }, 0) / (daily_change_arr.length - 1));

        IEX.getQuote(req.body.stock_1).then(quote => {
          Yahoo.getOptionsChain(req.body.stock_1).then(array => {
            //console.log(array.array)
            array.array.map((option, index)=>{
              let a = moment()
              let b = moment(option.date)
              let number_days_till_expiry = b.diff(a, 'days')
              let number_years_till_expiry = number_days_till_expiry/365

            let i=0
                for (let key in option.calls){

                  let black_scholes_value = bs.blackScholes(quote.price.last, option.calls[key].strike, number_years_till_expiry, stdev, risk_free_rate, "call");
                  let calls = {...option.calls[key],breakeven:option.calls[key].strike+option.calls[key].ask, current_stock_price:quote.price.last,plus_minus:option.calls[key].strike+option.calls[key].ask-quote.price.last,black_scholes:black_scholes_value}
                  option.calls[key]=calls
                  //console.log(option.calls[key])
                  i++
                  let size=Object.size(option.calls)
                  //console.log(size, i, index, array.array.length)
                  if (size===i && ((index+1)===array.array.length)){
                    res.json({status:"success", array:array.array})
                  }
                }



              //console.log(option)
            })

          });

        })
      }

    })
  })
})




}
