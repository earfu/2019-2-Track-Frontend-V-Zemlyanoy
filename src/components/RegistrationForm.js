import React from 'react';
// import PropTypes from 'prop-types';
import cookie from 'cookie';
import { Redirect } from 'react-router-dom';

import links from '../links';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: '',
      csrftoken: '',
      redirect: false,
    };
    this.getRegister = this.getRegister.bind(this);
    this.postRegister = this.postRegister.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getRegister();
  }

  async getRegister() {
    await fetch(links.register, {
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
      .then((data) => {});
  }

  async postRegister() {
    const { username, password1, password2, csrftoken } = this.state;
    const body = JSON.stringify({ username, password1, password2 });
    await fetch(links.register, {
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
        if (data['User creation:'] === 'success') {
          this.setState({ redirect: true }, () => (
            <Redirect to={{ pathname: '/login' }} />
          ));
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
    const { username, password1, password2 } = this.state;
    if (username === '' || password1 === '' || password2 === '') {
      return;
    }
    this.postRegister();
    // console.log('A');
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={{ pathname: '/login' }} />;
    }
    const { username, password1, password2 } = this.state;
    return (
      <form className="register-form">
        <p className="register-username-label">Login:</p>
        <input
          id="username"
          className="register-username-input"
          type="text"
          onChange={this.handleInputChange}
          required
          value={username}
        />
        <p className="register-password1-label">Password:</p>
        <input
          id="password1"
          className="register-password1-input"
          type="password"
          onChange={this.handleInputChange}
          required
          value={password1}
        />
        <p className="register-password1-label">Repeat password:</p>
        <input
          id="password2"
          className="register-password2-input"
          type="password"
          onChange={this.handleInputChange}
          required
          value={password2}
        />
        <button
          className="register-submit-button"
          type="submit"
          onClick={this.handleSubmit}
        >
          Register
        </button>
      </form>
    );
  }
}

export default RegistrationForm;
