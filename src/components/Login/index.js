import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMessage: ''}

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onSubmitForm = async event => {
    event.preventDefault()
    this.setState({showError: false})

    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }

    const loginAPI = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginAPI, options)

    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const jwtToken = data.jwt_token

      Cookies.set('jwt_token', jwtToken, {expires: 7})

      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({showError: true})

      const data = await response.json()
      const errorMessage = data.error_msg
      this.setState({errorMessage})
    }
  }

  render() {
    const {username, password, showError, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container-login">
        <div className="image-container">
          <img
            src="https://res.cloudinary.com/du3fq1wgm/image/upload/v1751363308/login_page_image_oqq6zy.png"
            className="login-image"
            alt="website login"
          />
        </div>
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://res.cloudinary.com/du3fq1wgm/image/upload/v1751363307/insta_share_logo_n7l2xq.png"
            className="logo-image"
            alt="website logo"
          />
          <h1 className="logo-name">Insta Share</h1>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          {showError && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}
export default Login
