import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';

function handleKeyPress(event) {
	// to disable re-rendering on Enter
	if (event.key === 'Enter') {
		event.preventDefault();
	}
}

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
		// check correctness
		if (username === '') {
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
				<div className="profile-scroll">
					<p className="profile-attribute-text">Username:</p>
					<form className="profile-username-form">
						<input
							className="profile-input-field"
							type="text"
							value={username}
							onChange={this.handleInputChange}
							onKeyPress={handleKeyPress}
							id="username"
						/>
					</form>
					<p className="profile-attribute-text">Full name:</p>
					<form className="profile-full-name-form">
						<input
							className="profile-input-field"
							type="text"
							value={fullName}
							onChange={this.handleInputChange}
							onKeyPress={handleKeyPress}
							id="fullName"
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

Profile.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string,
		fullName: PropTypes.string,
		bio: PropTypes.string,
	}).isRequired,
	updateProfile: PropTypes.func.isRequired,
};

export default Profile;
