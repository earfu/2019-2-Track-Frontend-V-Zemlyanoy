import React from 'react';
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';
import MessageFormTop from './MessageFormTop';
import MessageHistory from './MessageHistory';
import MessageFormInput from './MessageFormInput';

class MessageForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { input: '' };
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ input: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const { input } = this.state;
		const { save, appendMessage, username } = this.props;
		if (input === '') {
			return;
		}
		appendMessage(input, username, new Date().valueOf());
		this.setState({ input: '' });
		save();
	}

	handleKeyPress(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			this.handleSubmit(new Event('submit', { cancelable: true }));
			// cancelable: true is needed for Firefox
			// preventDefault() is not allowed to work otherwise
		}
	}

	handleButtonClick() {
		this.handleSubmit(new Event('submit', { cancelable: true }));
	}

	render() {
		const { name, messageArray } = this.props;
		const { input } = this.state;
		return (
			<div className="message-form-wrap">
				<div className="message-form-head">
					<MessageFormTop name={name} />
				</div>
				<div className="wrap-history">
					<MessageHistory
						className="message-history"
						chatName={name}
						messageArray={messageArray}
					/>
				</div>
				<div className="message-sending-form">
					<form className="message-form">
						<MessageFormInput
							name="message-text"
							value={input}
							onChange={this.handleChange}
							onSubmit={this.handleSubmit}
							onKeyPress={this.handleKeyPress}
						/>
					</form>
					<button
						className="message-button"
						type="submit"
						onClick={this.handleButtonClick}
					>
						{chatDefaults.sendMessageText}
					</button>
				</div>
			</div>
		);
	}
}

MessageForm.propTypes = {
	appendMessage: PropTypes.func.isRequired,
	messageArray: PropTypes.arrayOf(PropTypes.object).isRequired,
	name: PropTypes.string.isRequired,
	save: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
};

export default MessageForm;
