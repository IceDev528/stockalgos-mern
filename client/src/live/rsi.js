import React from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import URL from 'url-parse';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Button from '@material-ui/core/Button';

import { AppContext } from '../App'

import InteractiveBrokerStocks from '../components/interactive_brokers_stocks'
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: "14px",
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  formControl: {
    margin: "14px",
    minWidth: 120,
  },
});

class RSI_Container extends React.Component {
  constructor(props) {
    super(props);
  }
  static contextType = AppContext;
  render() {
    return (
      <RSI
        {...this.props}
        {...this.context} />
    )
  }
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
      {payload !== null ?
        <>
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="desc">{`${payload[0].payload.signal}`}</p>
        </>
        :
        ""
      }

      </div>
    );
  }

  return null;
};

class RSI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: new URL(window.location.href, true),
      stock_1:"aapl",
      interval:"daily",
      time_period:14,
      auto_run:true,

      stock_data:[],
      rsi_data:[],
      api_key_index:0,
      start:false,
      end:true,
      signal:"",
      volume_shares_per_trade:0,
      authenticated:false,
      activate_live_trading:false,
      make_trades_trail:false,
      trades_trail_by:0,



    }
  }

handleChange = (e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
  this.handleEnd()
}

confirm_authentication=()=>{
  this.setState({
    authenticated:true
  })

}

handleStart = (e)=>{
  this.setState({
    start:true,
    end:false
  },()=>{
    this.submitStocks()
  })

}

handleEnd = (e) =>{
  this.setState({
    start:false,
    end:true
  })
}




submitStocks=(e)=>{
  if (this.state.start===true){
    axios.post('/fetch_stock_price',{
      stock_1:this.state.stock_1,
      interval:this.state.interval,
      time_period:this.state.time_period,
      api_key_index:this.state.api_key_index
    }).then((response)=>{

      this.setState({
        stock_data:response.data.data
      })
    })

    axios.post('/get_rsi_with_slope',{
      stock_1:this.state.stock_1,
      interval:this.state.interval,
      time_period:this.state.time_period,
      api_key_index:this.state.api_key_index
    }).then((response)=>{
      console.log(response)

      this.setState({
        rsi_data:response.data.data,
        api_key_index:response.data.index,
        signal:response.data.data.slice(-1)[0]
      })

      if (this.state.start===true){
      setTimeout(this.submitStocks, 1500);
    }


    })
  }

}

handleCheck = (e)=>{
  this.setState({
    [e.target.name]: e.target.checked
  })
}

  render() {
    const classes = styles();
    return (

      <React.Fragment>
      <InteractiveBrokerStocks
        signal ={this.state.signal}
        stock = {this.state.stock_1}
        volume_per_trade={this.state.volume_shares_per_trade}
        confirm_authentication={this.confirm_authentication}
        activate_live_trading={this.state.activate_live_trading}
        make_trades_trail={this.state.make_trades_trail}
        trades_trail_by={this.state.trades_trail_by}
       />
        <h1>RSI</h1>

      <TextField
        id="outlined-basic"
        name='stock_1'
        label="Stock Symbol"
        variant="outlined"
        onChange={this.handleChange}
        value={this.state.stock_1}
      />
      <FormControl variant="outlined" style={{width:"300px"}} className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Interval</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.interval}
          name="interval"
          onChange={this.handleChange}
          label="Age"
        >

          <MenuItem value={"1min"}>1min</MenuItem>
          <MenuItem value={"5min"}>5min</MenuItem>
          <MenuItem value={"15min"}>15min</MenuItem>
          <MenuItem value={"30min"}>30min</MenuItem>
          <MenuItem value={"60min"}>60min</MenuItem>
          <MenuItem value={"daily"}>Daily</MenuItem>
          <MenuItem value={"weekly"}>Weekly</MenuItem>
          <MenuItem value={"monthly"}>Monthly</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        name='time_period'
        label="Time Period"
        variant="outlined"
        type="number"
        onChange={this.handleChange}
        value={this.state.time_period}
      />
      {this.state.activate_live_trading &&
      <TextField
        id="outlined-basic"
        name='volume_shares_per_trade'
        label="Volume of Shares per Trade"
        variant="outlined"
        type="number"
        disabled ={this.state.start}
        onChange={this.handleChange}
        value={this.state.volume_shares_per_trade}
      />
    }
    {this.state.authenticated &&
      <>
        <FormControlLabel
            control={
              <Checkbox
                checked={this.state.activate_live_trading}
                onChange={this.handleCheck}
                name="activate_live_trading"
                color="primary"
              />
            }
            label="Activate Live Trading"
          />
          <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.make_trades_trail}
                  onChange={this.handleCheck}
                  name="make_trades_trail"
                  color="primary"
                />
              }
              label="Make Trades Trail"
            />
            {this.state.make_trades_trail &&
              <TextField
                id="outlined-basic"
                name='trades_trail_by'
                label="How much do you want your trades to trail by?"
                variant="outlined"
                type="number"
                onChange={this.handleChange}
                value={this.state.trades_trail_by}
              />
            }
          </>
    }


      <Button
         variant="contained"
         color="primary"
         disabled={this.state.start}
         style={{backgroundColor:"green"}}
         onClick={this.handleStart}
       >
       Start
     </Button>

     <Button
        variant="contained"
        color="secondary"
         disabled={this.state.end}

        onClick={this.handleEnd}
      >
      End
    </Button>



     <LineChart
        width={1200}
        height={600}
        data={this.state.stock_data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>

      <LineChart
         width={1200}
         height={600}
         data={this.state.rsi_data}
         margin={{
           top: 5, right: 30, left: 20, bottom: 5,
         }}
       >
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="date"  />
         <YAxis />
         <Tooltip content={<CustomTooltip />} />
         <Legend />
         <Line type="monotone"  dataKey="RSI"  stroke="#8884d8" activeDot={{ r: 8 }}  />
       </LineChart>


      </React.Fragment>
    )
  }
}
RSI_Container.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(RSI_Container);
