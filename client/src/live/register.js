import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import URL from 'url-parse';

import { AppContext } from '../App'
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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

class Register_Container extends React.Component {
  constructor(props) {
    super(props);
  }
  static contextType = AppContext;
  render() {
    return (
      <Register
        {...this.props}
        {...this.context} />
    )
  }
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: new URL(window.location.href, true),
      name:"",
      email:"",
      password:""

    }
  }

handleChange = (e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

handle_user_registration = (e) => {
  e.preventDefault()
  axios.post('/create_user',{
    name:this.state.name,
    email:this.state.email,
    password:this.state.password
  }).then((response)=>{
    console.log(response)
    if (response.data.status ==="success"){
      this.props.persistUser(response.data.data)
    }

  })
}


  render() {
    return (

      <React.Fragment>
        <h1>Registration</h1>
        <TextField
          id="outlined-basic"
          name='name'
          label="Name"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.name}
        />
        <TextField
          id="outlined-basic"
          name='email'
          label="Email"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.email}
        />
        <TextField
          id="outlined-basic"
          name='password'
          label="Password"
          type="password"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.password}
        />
        <Button
           variant="contained"
           color="primary"
           onClick={this.handle_user_registration}
         >
         Sign Up
       </Button>
      </React.Fragment>
    )
  }
}
Register_Container.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Register_Container);
