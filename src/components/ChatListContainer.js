import React from 'react';
import PropTypes from 'prop-types';
import ChatList from './ChatList';
import ChatCreationInput from './ChatCreationInput';
import ChatListTop from './ChatListTop';
// import chatDefaults from '../chatDefaults';
import ChatItem from './ChatItem';

class ChatListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { input: '' };
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

  createChat(name) {
    const { chatArray, save } = this.props;
    chatArray.push(
      new ChatItem({
        name,
        index: chatArray.length,
        save,
        messageArray: [],
      }),
    );
  }

  render() {
    const { input } = this.state;
    const { chatArray, name } = this.props;
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
}

ChatListContainer.propTypes = {
  name: PropTypes.string.isRequired,
  chatArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  save: PropTypes.func.isRequired,
};

export default ChatListContainer;
