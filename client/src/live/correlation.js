import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import URL from 'url-parse';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Button from '@material-ui/core/Button';

import { AppContext } from '../App'
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

class Correlation_Container extends React.Component {
  constructor(props) {
    super(props);
  }
  static contextType = AppContext;
  render() {
    return (
      <Correlation
        {...this.props}
        {...this.context} />
    )
  }
}

class Correlation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: new URL(window.location.href, true),
      stock_1:"aapl",
      stock_2:"tsla",
      stock_data:[]

    }
  }

handleChange = (e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

submitStocks=(e)=>{
  e.preventDefault();
  axios.post('/get_correlation',{
    stock_1:this.state.stock_1,
    stock_2:this.state.stock_2,
  }).then((response)=>{

    this.setState({
      stock_data:response.data.data
    })
  })
}

  render() {
    return (

      <React.Fragment>
        <h1>Correlation</h1>

      <TextField
        id="outlined-basic"
        name='stock_1'
        label="Stock 1"
        variant="outlined"
        onChange={this.handleChange}
        value={this.state.stock_1}
      />
      <TextField
        id="outlined-basic"
        name='stock_2'
        label="Stock 2"
        variant="outlined"
        onChange={this.handleChange}
        value={this.state.stock_2}
      />

      <Button
         variant="contained"
         color="primary"
         onClick={this.submitStocks}
       >
       Send
     </Button>


     <LineChart
        width={1200}
        height={800}
        data={this.state.stock_data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="stock_1" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="stock_2" stroke="#82ca9d" />
      </LineChart>


      </React.Fragment>
    )
  }
}
Correlation_Container.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Correlation_Container);
