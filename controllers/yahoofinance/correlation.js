
'use strict'
const async = require('async');


var yahooFinance = require('yahoo-finance');
var XLSXChart = require ("xlsx-chart");
var xlsxChart = new XLSXChart ();



exports.stock_req_1 = function (req,res){
  let data = []
  yahooFinance.historical({
  symbol: 'USO',
  from: '2020-04-01',
  to: '2020-04-21',
  period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
}, function (err, uso) {

    yahooFinance.historical({
    symbol: 'CL=F',
    from: '2020-04-01',
    to: '2020-04-21',
    period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  }, function (err, oil) {
    data.push(uso)
    data.push(oil)
    res.json({status:"success",data})

    })

  })
}

exports.stock_req  = function (req,res){
  let data = []
  let data_2 = []
  let compare_price_changes =[]
  let days = []
  let uso_vals=[]
  let oil_vals=[]

  let excel = {}
  let uso_table ={}
  let oil_table= {}

  yahooFinance.historical({
  symbol: req.body.stock_1,
  from: '2020-04-01',
  to: '2020-04-21',
  period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
}, function (err, uso) {

    yahooFinance.historical({
    symbol: req.body.stock_2,
    from: '2020-04-01',
    to: '2020-04-21',
    period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  }, function (err, oil) {
    uso.map((value, index)=>{
      let uso_change=(index+1<uso.length?(((value.close- uso[index+1].close) / uso[index+1].close)*100):0)
      let uso_obj = {date:value.date,open:value.open, close:value.close, chg_prv:uso_change}
      let oil_change=(index+1<uso.length?(((oil[index].close- oil[index+1].close) / oil[index+1].close)*100):0)
      let oil_obj = {open:oil[index].open,close:oil[index].close, chg_prv:oil_change}

      data.push({uso_obj, oil_obj})
      data_2.push({name:value.date, stock_1:uso_change, stock_2:oil_change })

      days.push(value.date.toString())

      compare_price_changes.push({uso_change, oil_change})
      uso_vals.push({uso_change})
      oil_vals.push(oil_change)

      Object.assign(uso_table, {[value.date]:uso_change})
      Object.assign(oil_table, {[value.date]:oil_change})


      if (index+1 === uso.length){
        res.json({status:"success", data:data_2.reverse()})

      }

    })
  })
});

}

exports.export_to_excel = function (req,res){
  let data = []
  let compare_price_changes =[]
  let days = []
  let uso_vals=[]
  let oil_vals=[]

  let excel = {}
  let uso_table ={}
  let oil_table= {}

  yahooFinance.historical({
  symbol: 'USO',
  from: '2020-04-01',
  to: '2020-04-21',
  period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
}, function (err, uso) {

    yahooFinance.historical({
    symbol: 'CL=F',
    from: '2020-04-01',
    to: '2020-04-21',
    period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  }, function (err, oil) {
    uso.map((value, index)=>{
      let uso_change=(index+1<uso.length?(((value.close- uso[index+1].close) / uso[index+1].close)*100):0)
      let uso_obj = {date:value.date,open:value.open, close:value.close, chg_prv:uso_change}
      let oil_change=(index+1<uso.length?(((oil[index].close- oil[index+1].close) / oil[index+1].close)*100):0)
      let oil_obj = {open:oil[index].open,close:oil[index].close, chg_prv:oil_change}

      data.push({uso_obj, oil_obj})
      days.push(value.date.toString())

      compare_price_changes.push({uso_change, oil_change})
      uso_vals.push({uso_change})
      oil_vals.push(oil_change)

      Object.assign(uso_table, {[value.date]:uso_change})
      Object.assign(oil_table, {[value.date]:oil_change})


      if (index+1 === uso.length){
        console.log(uso_table)
        excel= {"Title 1":uso_table,"Title 2":oil_table}
        console.log(excel)
        var opts = {
          file: "chart.xlsx",
          chart: "column",
          titles: [
       "Title 1",
       "Title 2",

   ],fields:days,
          data: excel
      };
        xlsxChart.writeFile (opts, function (err) {
          console.log(err)
          console.log ("File: ", opts.file);
        });

      }

    })
  })
});

}
