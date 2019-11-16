import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    const { username, fullName, bio } = props.user;
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = { username, fullName, bio };
  }

  handleInputChange(event) {
    const update = {};
    update[event.target.id] = event.target.value;
    this.setState(update);
  }

  handleButtonClick() {
    const { username, fullName, bio } = this.state;
    const { user: oldUser } = this.props;
    // check correctness
    if (username === '') {
      this.setState({ username: oldUser.username });
      return;
    }
    const { updateProfile } = this.props;
    const newUser = { username, fullName, bio };
    updateProfile(newUser);
  }

  render() {
    const { username, fullName, bio } = this.state;
    return (
      <div className="profile-container">
        <div className="profile-top">
          <Link to="/" className="profile-back-link">
            <button className="profile-back-button" type="button">
              <i className="fa fa-chevron-left" />
            </button>
          </Link>
          <p className="profile-top-text">{chatDefaults.myProfileText}</p>
        </div>
        <form className="profile-username-form">
          <input
            className="profile-input-field"
            type="text"
            value={username}
            onChange={this.handleInputChange}
            id="username"
          />
        </form>
        <form className="profile-username-form">
          <input
            className="profile-input-field"
            type="text"
            value={fullName}
            onChange={this.handleInputChange}
            id="fullName"
          />
        </form>
        <form className="profile-username-form">
          <input
            className="profile-input-field"
            type="text"
            value={bio}
            onChange={this.handleInputChange}
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
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    fullName: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default Profile;
