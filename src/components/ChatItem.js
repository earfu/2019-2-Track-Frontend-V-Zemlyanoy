import React from 'react';
import PropTypes from 'prop-types';
import MessageForm from './../components/MessageForm'

class ChatItem extends React.Component {
	constructor(props) {
		super(props);
		this.appendMessage = this.appendMessage.bind(this);
		this.messageForm = (<MessageForm name={this.props.name} messageArray={this.props.messageArray}
			handleReturn={this.props.handleReturn} save={this.props.save}
			appendMessage={this.appendMessage} />);
	}


	appendMessage(text, author, date) {
		const arr = this.props.messageArray;
		arr.push(
			{ number: arr.length, text , author, date: (date || (new Date()).valueOf()) }
		);
	}

	render() {
		return (
			<div className="chat-list-item" index={this.props.index}>
				<div className="chat-item-text">
					<p className="chat-item-name">{this.props.name}</p>
				</div>
				<button className="chat-messages-button" type="button" index={this.props.index}
					onClick={this.props.handleChatClick}>
					<i className="fa fa-chevron-right" index={this.props.index} />
				</button>
			</div>
		)
	}

}

ChatItem.propTypes = {
	handleChatClick: PropTypes.func.isRequired,
	handleReturn: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	messageArray: PropTypes.arrayOf(PropTypes.object).isRequired,
	name: PropTypes.string.isRequired,
	save: PropTypes.func.isRequired,
}

export default ChatItem;
