import React from 'react';
import PropTypes from 'prop-types';
import ChatList from './ChatList';
import ChatCreationInput from './ChatCreationInput';
import ChatListTop from './ChatListTop';
import chatDefaults from '../chatDefaults';
import ChatItem from './ChatItem';

class ChatListContainer extends React.Component {
	constructor(props) {
		super(props);
		const { startState } = props;
		const state = JSON.parse(startState);
		this.handleReturn = this.handleReturn.bind(this);
		this.save = this.save.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleChatClick = this.handleChatClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = { chatArray: [], input: '', screen: 'main' };
		if (state != null) {
			const { chatArray } = this.state;
			for (const chat of state.chatArray) {
				chat.props.handleReturn = this.handleReturn;
				chat.props.save = this.save;
				chat.props.handleChatClick = this.handleChatClick;
				chatArray.push(new ChatItem(chat.props));
			}
		}
	}

	save() {
		const lsString = JSON.stringify(this.state);
		localStorage.setItem(chatDefaults.appName, lsString);
	}

	handleReturn() {
		this.setState({ screen: 'main' });
	}

	handleInputChange(event) {
		this.setState({ input: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const { input, chatArray } = this.state;
		if (input === '') {
			return;
		}
		for (const chat of chatArray) {
			if (chat.name === input) {
				return;
			}
		}
		this.createChat(input);
		this.setState({ input: '' });
		this.save();
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

	handleChatClick(event) {
		const index = event.target.getAttribute('index');
		this.setState({ screen: index });
	}

	createChat(name) {
		const { chatArray } = this.state;
		chatArray.push(
			new ChatItem({
				name,
				index: chatArray.length,
				handleReturn: this.handleReturn,
				save: this.save,
				handleChatClick: this.handleChatClick,
				messageArray: [],
			}),
		);
	}

	render() {
		const { screen, chatArray, input } = this.state;
		const { name } = this.props;
		if (screen === 'main') {
			return (
				<div className="chat-list-area">
					<div className="chat-list-head">
						<ChatListTop name={name} />
					</div>
					<div className="wrap-chat-list">
						<ChatList chatArray={chatArray} />
						<div className="chat-creation">
							<form className="chat-creation-form">
								<ChatCreationInput
									value={input}
									onChange={this.handleInputChange}
									onSubmit={this.handleSubmit}
									onKeyPress={this.handleKeyPress}
								/>
							</form>
							<button
								className="chat-create"
								type="submit"
								onClick={this.handleButtonClick}
							>
								+
							</button>
						</div>
					</div>
				</div>
			);
		}
		const chatIndex = screen;
		return chatArray[chatIndex].messageForm;
	}
}

ChatListContainer.propTypes = {
	name: PropTypes.string.isRequired,
	startState: PropTypes.string,
};

ChatListContainer.defaultProps = {
	startState: null,
};

export default ChatListContainer;
