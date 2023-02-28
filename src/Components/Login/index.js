import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jobby_jwt_token', jwtToken, {expires: 15})
    history.replace('/')
  }

  onFailure = errMsg => {
    this.setState({showError: true, errorMsg: errMsg})
  }

  onClickLogin = async event => {
    const {username, password} = this.state
    const userData = {username, password}
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('response=>', data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    return (
      <div className="bg-cont">
        <form className="form-cont" onSubmit={this.onClickLogin}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-img"
          />
          <div className="username-cont">
            <label htmlFor="user" className="lbl-username">
              USERNAME
            </label>
            <input
              type="text"
              onChange={this.onChangeUsername}
              className="txt-username"
              id="user"
              value={username}
              placeholder="Username"
            />
          </div>
          <div className="password-cont">
            <label htmlFor="pwd" className="lbl-password">
              PASSWORD
            </label>
            <input
              type="password"
              onChange={this.onChangePassword}
              className="txt-password"
              id="pwd"
              value={password}
              placeholder="Password"
            />
          </div>
          <div className="btn-cont">
            <button type="submit" className="btn-submit">
              Login
            </button>
          </div>
          {showError && <p className="err-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
