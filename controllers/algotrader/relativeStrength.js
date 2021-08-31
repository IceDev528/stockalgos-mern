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


const IEX = algotrader.Data.IEX;


// Returns a quote object

exports.basicRelativeStrengthCalc =  function (req,res){
    av.rsi("AAPL", "daily", 14, "close").then(array => {
      // Returns an array of objects representing the RSI on each day
      array.forEach(rsi => {
          // { date: 2017-11-17T00:00:00.000Z, RSI: '57.3707' }
      });
  });
}

exports.relative_strength_with_slope =  function (req,res){
  let index = req.body.api_key_index
  let key_array = ["73C4VTI1I69LO4AO", "RGAV8MZ8U7FEY9CU", "XY4Y51QSOBW9K9KU","9NMZQTRY2U8KNL31","MBHKG4KUNXKG9735",,"UF2GAYQVSA4HO30O"]


  const calc_rsi = (index)=>{
    const av = new AlphaVantage(key_array[index]);

    av.rsi(req.body.stock_1, req.body.interval, req.body.time_period, "close").then(array => {
      if (array.length > 0){
        array.length = req.body.time_period
        array.reverse()
        let rsi_array = []
        for (let i=0;i<array.length;i++){
            array[i].RSI = parseInt(array[i].RSI);
          //  let old = rsi



          //  console.log(date2,date1)
          let async_func = async ()=>{
            if (i<array.length-1){
              let date2 = moment(array[i+1].date)
              let date1 = moment(array[i].date)
              if (req.body.interval === 'daily'){
                let x = date2.diff(date1,'days')
                let slope = (array[i+1].RSI-array[i].RSI)/(x)
                let obj = {date:array[i].date, RSI:array[i].RSI, slope:slope}
                return obj

              } else if (req.body.interval === 'weekly') {
                let x = date2.diff(date1,'weeks')
                let slope = (array[i+1].RSI-array[i].RSI)/(x)
                let obj = {date:array[i].date, RSI:array[i].RSI, slope:slope}
                return obj

              } else if (req.body.interval === 'monthly') {
                let x = date2.diff(date1,'months')
                let slope = (array[i+1].RSI-array[i].RSI)/(x)
                let obj = {date:array[i].date, RSI:array[i].RSI, slope:slope}
                return obj

              } else {
                let x = date2.diff(date1,'minutes')
                let slope = (array[i+1].RSI-array[i].RSI)/(x)

                let obj = {date:array[i].date, RSI:array[i].RSI, slope:slope}
                return obj
              }

            }else {
              let obj = {date:array[i].date, RSI:array[i].RSI}
              return obj
            }

          }

          async_func().then((obj)=>{

            if (i >0){
              if (array[i-1].RSI < 30 && array[i].RSI >30) {
                let signal = "Buy Long"
                let new_obj = {...obj,signal:signal}
                rsi_array.push(new_obj)
              } else if (array[i-1].RSI >70  && array[i].RSI <70) {
                let signal = "Buy Short"
                let new_obj = {...obj,signal:signal}
                rsi_array.push(new_obj)
              } else if (rsi_array[i-1].signal ==="Buy"||rsi_array[i-1].signal ==="Short"){
                let signal = "Hold"
                let new_obj = {...obj,signal:signal}
                rsi_array.push(new_obj)
              } else if (rsi_array[i-1].signal ==="Hold" && ((array[i-1].RSI >50  && array[i].RSI <50))) {
                let signal = "Sell Short"
                let new_obj = {...obj,signal:signal}
                rsi_array.push(new_obj)
              } else if (rsi_array[i-1].signal ==="Hold" && ((array[i-1].RSI <50  && array[i].RSI >50))) {
                let signal = "Sell Long"
                let new_obj = {...obj,signal:signal}
                rsi_array.push(new_obj)
              }

               else if (rsi_array[i-1].signal ==="Hold") {
                let signal = "Hold"
                let new_obj = {...obj,signal:signal}
                rsi_array.push(new_obj)
              }
              else {
                let signal = "Wait"
                let new_obj = {...obj,signal:signal}
                rsi_array.push(new_obj)
              }
            } else {
              let signal = "Start"
              let new_obj = {...obj,signal:signal}
              rsi_array.push(new_obj)
            }





            if (rsi_array.length ===array.length){
              res.json({
                status:"success",
                data:rsi_array,
                index:index
              })
            }
          })


        }

      } else {
        if (index < key_array.length){
          calc_rsi(index+1)
        } else {
          calc_rsi(0)
        }

      }
      //console.log(array)
      // Returns an array of objects representing the RSI on each dayè



  });
  }
    calc_rsi(index)

}
