import React from 'react';
// import PropTypes from 'prop-types';
import cookie from 'cookie';
import { Redirect } from 'react-router-dom';

import links from '../links';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      captchaKey: '',
      captchaImgSrc: '',
      username: '',
      password: '',
      captchaText: '',
      csrftoken: '',
      redirect: false,
      redirectPath: '/',
    };
    this.getLoginData = this.getLoginData.bind(this);
    this.postLoginData = this.postLoginData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    this.getLoginData();
  }

  async getLoginData() {
    await fetch(links.login, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
      crossDomain: true,
    })
      .then((res) => {
        const { csrftoken } = cookie.parse(document.cookie);
        this.setState({ csrftoken });
        return res.json();
      })
      .then((data) => {
        this.setState({
          captchaKey: data.captcha_key,
          captchaImgSrc: `${links.backendURL}${data.captcha_image}`,
        });
      });
  }

  async postLoginData() {
    const {
      username,
      password,
      captchaKey,
      captchaText,
      csrftoken,
    } = this.state;
    const body = JSON.stringify({
      username,
      password,
      captchaKey,
      captchaText,
    });
    await fetch(links.login, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken,
      },
      credentials: 'include',
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data['login post'] === 'success') {
          this.setState({ redirect: true });
        }
      });
  }

  handleInputChange(event) {
    const update = {};
    update[event.target.id] = event.target.value;
    this.setState(update);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSubmit();
    }
  }

  handleSubmit(event) {
    // no point reloading the page with async POST requests
    event.preventDefault();
    const { username, password, captchaText } = this.state;
    if (username === '' || password === '' || captchaText === '') {
      return;
    }
    this.postLoginData();
    // console.log('A');
  }

  handleRegister() {
    this.setState({ redirect: true, redirectPath: '/register' });
  }

  render() {
    const { redirect, redirectPath } = this.state;
    if (redirect) {
      return <Redirect to={{ pathname: redirectPath }} />;
    }
    const {
      captchaImgSrc,
      captchaKey,
      username,
      password,
      captchaText,
    } = this.state;
    return (
      <form className="login-form">
        <p className="login-username-label">Login:</p>
        <input
          id="username"
          className="login-username-input"
          type="text"
          onChange={this.handleInputChange}
          required
          value={username}
        />
        <p className="login-password-label">Password:</p>
        <input
          id="password"
          className="login-password-input"
          type="password"
          onChange={this.handleInputChange}
          required
          value={password}
        />
        <img
          className="login-captcha-image"
          alt="captcha"
          src={captchaImgSrc}
        />
        <input
          className="login-captcha-key"
          type="hidden"
          value={captchaKey}
          required
        />
        <input
          id="captchaText"
          className="login-captcha-text"
          type="text"
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          onChange={this.handleInputChange}
          required
          value={captchaText}
        />
        <button
          className="login-submit-button"
          type="submit"
          onClick={this.handleSubmit}
        >
          Log In
        </button>
        <button
          className="register-button"
          type="button"
          onClick={this.handleRegister}
        >
          Register
        </button>
      </form>
    );
  }
}

export default LoginForm;
