import React from 'react';
import PropTypes from 'prop-types';
import MessageForm from './MessageForm';

class ChatItem extends React.Component {
	constructor(props) {
		// { name, messageArray, handleReturn, save }
		super(props);
		const { name, save, messageArray, handleReturn } = props;
		this.appendMessage = this.appendMessage.bind(this);
		this.messageForm = (
			<MessageForm
				name={name}
				messageArray={messageArray}
				handleReturn={handleReturn}
				save={save}
				appendMessage={this.appendMessage}
			/>
		);
	}

	appendMessage(text, author, date) {
		const { messageArray } = this.props;
		messageArray.push({
			number: messageArray.length,
			text,
			author,
			date: date || new Date().valueOf(),
		});
	}

	render() {
		const { index, name, handleChatClick } = this.props;
		return (
			<div className="chat-list-item" index={index}>
				<div className="chat-item-text">
					<p className="chat-item-name">{name}</p>
				</div>
				<button
					className="chat-messages-button"
					type="button"
					index={index}
					onClick={handleChatClick}
				>
					<i className="fa fa-chevron-right" index={index} />
				</button>
			</div>
		);
	}
}

ChatItem.propTypes = {
	handleChatClick: PropTypes.func.isRequired,
	handleReturn: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	messageArray: PropTypes.arrayOf(PropTypes.object).isRequired,
	name: PropTypes.string.isRequired,
	save: PropTypes.func.isRequired,
};

export default ChatItem;
