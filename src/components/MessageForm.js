import React from 'react'
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';
import MessageFormTop from './MessageFormTop';
import MessageHistory from './MessageHistory';
import MessageFormInput from './MessageFormInput';


class MessageForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {input: ''};
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({input: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.input === '') {
			return;
		}
		this.props.appendMessage(this.state.input, chatDefaults.authorName, (new Date()).valueOf());
		this.setState({input: ''});
		this.props.save();
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
		return (
			<div className="message-form-wrap">
				<div className="message-form-head">
					<MessageFormTop name={this.props.name} handleReturn={this.props.handleReturn} />
				</div>
				<div className="wrap-history">
					<MessageHistory chatName={this.props.name} messageArray={this.props.messageArray} />
				</div>
				<div className="message-sending-form">
					<form className="message-form">
						<MessageFormInput
							name="message-text"
							value={this.state.input}
							onChange={this.handleChange}
							onSubmit={this.handleSubmit} onKeyPress={this.handleKeyPress} />
					</form>
					<button className="message-button" type="submit" onClick={this.handleButtonClick}>
						{chatDefaults.sendMessageText}
					</button>
				</div>
			</div>
		);
	}
}

MessageForm.propTypes = {
	appendMessage: PropTypes.func.isRequired,
	handleReturn: PropTypes.func.isRequired,
	messageArray: PropTypes.arrayOf(PropTypes.object).isRequired,
	name: PropTypes.string.isRequired,
	save: PropTypes.func.isRequired,
}

export default MessageForm;
