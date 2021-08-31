import React from 'react';
import axios from 'axios';

class LogOut extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('/log_out')
      .then((response) => {
        console.log(response, this.props)
        this.props.setLogOut(false)
        this.props.history.push('/login')
      })
  }

  render() {
    return (
      <div/>
    )
  }
}

export default LogOut;