import React, { PureComponent } from 'react'
import axios from 'axios'

export const AppContext = React.createContext({
  user: {
    _id: null,
    loading: true
  },
  isLoggedIn: null,
  handleLogOut: () => {
  }
})

class App extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      persistUser: (user) => {
        this.setState({
          user: {
            loading: false,
            _id: user.current_user_id,
            name: user.current_user_name,
            email: user.current_user_email
          },
          isLoggedIn: true,
          password: ''
        })
        localStorage.setItem('userId', this.state.user._id)
      },
      logOutUser: (value) => {
        this.setState({ isLoggedIn: value})
      }
    }
  }

  componentDidMount () {
    axios.get('/fetch_user_details').then((response) => {
      let data = response.data
      let isLoggedIn = false
      if (data.status === 'success') {
        this.setState({
          user: {
            loading: false,
            _id: data.result.current_user_id,
            email: data.result.current_user_email,
            name: data.result.current_user_name,
          // don't set isLoggedIn here, this trips a chain reaction to child components
          },
          isLoggedIn: true
        })
        localStorage.setItem('userId', this.state.user._id)
        isLoggedIn = true
      } else {
        this.setState({
          isLoggedIn: false
        })
        isLoggedIn = false
      }
      this.props.setLogin(isLoggedIn, this.state)
    })
  }

  render () {
    return <AppContext.Provider value={this.state}>
             {this.props.children}
           </AppContext.Provider>
  }
}

export default App
