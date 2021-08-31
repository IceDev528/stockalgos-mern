import React from 'react';
import PropTypes from 'prop-types';
import URL from 'url-parse';

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

class Home_Container extends React.Component {
  constructor(props) {
    super(props);
  }
  static contextType = AppContext;
  render() {
    return (
      <Home
        {...this.props}
        {...this.context} />
    )
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: new URL(window.location.href, true),
      front_code:""

    }
  }

handleChange = (e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}


  render() {
    return (

      <React.Fragment>
        <h1>Hello World</h1>
        <TextField
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        name='front_code'
        rows={4}
        onChange={this.handleChange}
        value={this.state.front_code}
        variant="outlined"
      />
      </React.Fragment>
    )
  }
}
Home_Container.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home_Container);
