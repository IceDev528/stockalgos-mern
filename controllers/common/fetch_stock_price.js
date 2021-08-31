
'use strict'
const async = require('async');
const algotrader = require('algotrader');
const IEX = algotrader.Data.IEX;
const AlphaVantage = algotrader.Data.AlphaVantage;
//const av = new AlphaVantage("73C4VTI1I69LO4AO");

var yahooFinance = require('yahoo-finance');
var XLSXChart = require ("xlsx-chart");
var xlsxChart = new XLSXChart ();





exports.fetch_stock = function (req,res){
  let index = req.body.api_key_index
  let key_array = ["73C4VTI1I69LO4AO", "RGAV8MZ8U7FEY9CU", "XY4Y51QSOBW9K9KU","9NMZQTRY2U8KNL31","MBHKG4KUNXKG9735","UF2GAYQVSA4HO30O"]
  const av = new AlphaVantage(key_array[index+1]);

  let data = []
if (req.body.interval === "1min"||req.body.interval === "5min"||req.body.interval === "15min"||req.body.interval === "30min"||req.body.interval === "60min"){
  av.timeSeriesIntraday(req.body.stock_1, req.body.interval).then((response)=>{
    response.map((val,index)=>{
      let obj = {date:val.date, price:val.price.close}
      data.push(obj)


      if (data.length ===response.length){
        res.json({status:"success",
        data:data.slice(-req.body.time_period)
        })
      }
      //console.log(obj)
    })
  })
} else if (req.body.interval === "daily"){

  av.timeSeriesDaily(req.body.stock_1, false).then((response)=>{
    response.map((val,index)=>{
      let obj = {date:val.date, price:val.price.close}
      data.push(obj)


      if (data.length ===response.length){
          console.log("here")
        res.json({status:"success",
        data:data.slice(-req.body.time_period)
        })
      }
      //console.log(obj)
    })

  })
} else if (req.body.interval === "weekly"){
  av.timeSeriesWeekly(req.body.stock_1, req.body.interval).then((response)=>{
    response.map((val,index)=>{
      let obj = {date:val.date, price:val.price.close}
      data.push(obj)


      if (data.length ===response.length){

        res.json({status:"success",
        data:data.slice(-req.body.time_period)
        })
      }
      //console.log(obj)
    })
  })

//code this
}else if (req.body.interval === "monthly"){
  av.timeSeriesMonthly(req.body.stock_1, req.body.interval).then((response)=>{
    response.map((val,index)=>{
      let obj = {date:val.date, price:val.price.close}
      data.push(obj)


      if (data.length ===response.length){
        res.json({status:"success",
        data:data.slice(-req.body.time_period)
        })
      }
      //console.log(obj)
    })
  })

//code this
}

}
