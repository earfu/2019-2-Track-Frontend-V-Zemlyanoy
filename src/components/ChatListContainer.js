import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ChatList from './ChatList';
import ChatCreationInput from './ChatCreationInput';
import ChatListTop from './ChatListTop';
import chatDefaults from '../chatDefaults';
import ChatItem from './ChatItem';

class ChatListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.state = { input: '', menu: false };
  }

  handleInputChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { input } = this.state;
    const { chatArray, save } = this.props;
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

  handleOpenMenu() {
    const { menu } = this.state;
    this.setState({ menu: !menu });
  }

  createChat(name) {
    const { chatArray, save, username } = this.props;
    chatArray.push(
      new ChatItem({
        name,
        index: chatArray.length,
        save,
        username,
        messageArray: [],
      }),
    );
    /* chat = {
        props: {
            name: name,
            index: chatArray.length,
            save: save,
            username: username,
            messageArray: [],
        },
        messageForm: (
            <MessageForm
            name={name}
            username={username}
            messageArray={messageArray}
            save={save}
            appendMessage={this.appendMessage}
            />
        ), */
  }

  render() {
    const { input, menu } = this.state;
    const { chatArray, username } = this.props;
    return (
      <div className="chat-list-area">
        <div className="chat-list-head">
          <ChatListTop name={username} onOpenMenu={this.handleOpenMenu} />
          <div className={`main-settings-${menu}`}>
            <Link to="/profile">
              <button type="button">{chatDefaults.myProfileText}</button>
            </Link>
          </div>
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
}

ChatListContainer.propTypes = {
  chatArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  save: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default ChatListContainer;
