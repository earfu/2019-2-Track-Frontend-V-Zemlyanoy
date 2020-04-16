import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import chatDefaults from '../chatDefaults';
import links from '../links';

function handleKeyPress(event) {
  // to disable re-rendering on Enter
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}

class Profile extends React.Component {
  constructor() {
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.state = { username: '', firstName: '', lastName: '', bio: '' };

    this.getProfile();
  }

  async getProfile() {
    await fetch(links['user-self'], {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user_id) {
          const { username, first_name: firstName, last_name: lastName } = data;
          this.setState({ username, firstName, lastName });
        }
      });
  }

  handleInputChange(event) {
    const update = {};
    update[event.target.id] = event.target.value;
    this.setState(update);
  }

  handleButtonClick() {
    // check correctness
    this.setState({});
  }

  render() {
    const { username, firstName, lastName, bio } = this.state;
    return (
      <div className="profile-container">
        <div className="profile-top">
          <Link to={`${links.frontPrefix}`} className="profile-back-link">
            <button className="profile-back-button" type="button">
              <i className="fa fa-chevron-left" />
            </button>
          </Link>
          <p className="profile-top-text">{chatDefaults.myProfileText}</p>
        </div>
        <div className="profile-scroll">
          <p className="profile-attribute-text">Username:</p>
          <form className="profile-name-form">
            <input
              className="profile-input-field"
              type="text"
              value={username}
              onChange={this.handleInputChange}
              onKeyPress={handleKeyPress}
              id="username"
            />
          </form>
          <p className="profile-attribute-text">First name:</p>
          <form className="profile-name-form">
            <input
              className="profile-input-field"
              type="text"
              value={firstName}
              onChange={this.handleInputChange}
              onKeyPress={handleKeyPress}
              id="firstName"
            />
          </form>
          <p className="profile-attribute-text">Last name:</p>
          <form className="profile-name-form">
            <input
              className="profile-input-field"
              type="text"
              value={lastName}
              onChange={this.handleInputChange}
              onKeyPress={handleKeyPress}
              id="lastName"
            />
          </form>
          <p className="profile-attribute-text">About me:</p>
          <form className="profile-bio-form">
            <textarea
              rows="8"
              cols="50"
              className="profile-input-field"
              type="text"
              value={bio}
              onChange={this.handleInputChange}
              onKeyPress={handleKeyPress}
              id="bio"
            />
          </form>
          <button
            className="profile-save-button"
            type="submit"
            onClick={this.handleButtonClick}
          >
            {chatDefaults.saveProfileText}
          </button>
        </div>
      </div>
    );
  }
}

export default Profile;
