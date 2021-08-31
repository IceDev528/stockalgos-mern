import React from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import URL from 'url-parse';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class InteractiveBrokerLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: new URL(window.location.href, true),
      ib_client_id:"",
      ib_port:"",
      authentication_key:"",
      authenticated:""

    }
  }

handleChange = (e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

execute_trade = () =>{
  let obj = {
    ib_client_id:this.state.ib_client_id,
    ib_port:this.state.ib_port,
    authentication_key:this.state.authentication_key,
    stock:this.props.stock,
    volume_per_trade:this.props.volume_per_trade,
    trades_trail_by:this.props.trades_trail_by
  }
  if (this.props.make_trades_trail === false){
    switch (this.props.signal.signal) {
      case ("Buy Long"):
        axios.post('/buy_long',obj)
        break;
      case ("Buy Short"):
        axios.post('/buy_short',obj)
        break;
      case ("Sell Long"):
        axios.post('/exit_long_position',obj)
        break;
      case ("Sell Short"):
        axios.post('/exit_short_position',obj)
        break;
    }
  } else {
    switch (this.props.signal.signal) {
      case ("Buy Long"):
        axios.post('/buy_long_with_trail',obj)
        break;
      case ("Buy Short"):
        axios.post('/buy_short_with_trail',obj)
        break;
      case ("Sell Long"):
        axios.post('/exit_long_position',obj)
        break;
      case ("Sell Short"):
        axios.post('/exit_short_position',obj)
        break;
    }
  }
}

componentDidUpdate(){
  if (this.props.signal.signal !== "Wait" && this.props.signal.signal !== "Hold" && this.props.activate_live_trading ){
    this.execute_trade()
  }
}

authenticate  = (e)=>{
  axios.post('/authenticate_trading',{
    ib_client_id:this.state.ib_client_id,
    ib_port:this.state.ib_port,
    authentication_key:this.state.authentication_key

  }).then((response)=>{
    if (response.data.status === "authenticated"){
      this.setState({
        authenticated:true
      })
      this.props.confirm_authentication()
    } else {
      this.setState({
        authenticated:false
      })
    }
  })
}

generate_auth  = (e)=>{
  axios.post('/generate_auth_key').then((response)=>{
    this.setState({
      ib_client_id:response.data.user.ib_client_id,
      ib_port:response.data.user.ib_port,
    })
  })
}


  render() {
    return (

      <React.Fragment>
        <h1>Interactive Brokers Setup</h1>
        <Button
           variant="contained"
           color="primary"
           style={{backgroundColor:"green"}}
           onClick={this.generate_auth}
         >
         Generate
       </Button>
        <TextField
          id="outlined-basic"
          name='ib_client_id'
          label="Client Id"
          disabled
          type="number"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.ib_client_id}
        />

        <TextField
          id="outlined-basic"
          name='ib_port'
          label="Port"
          disabled
          type="number"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.ib_port}
        />
        <TextField
          id="outlined-basic"
          name='authentication_key'
          label="Authentication_key"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.authentication_key}
        />

        <Button
           variant="contained"
           color="primary"
           disabled={this.state.start}
           style={{backgroundColor:"green"}}
           onClick={this.authenticate}
         >
         Submit
       </Button>
       {this.state.authenticated === true && <p>You are now ready to trade</p>}
       {this.state.authenticated === false && <p>You entered the wrong authentication key</p>}
      </React.Fragment>
    )
  }
}

export default InteractiveBrokerLogin;
