import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
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
    this.history = createBrowserHistory();
    this.save = this.save.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderChat = this.renderChat.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.state = { chatArray: [], input: '' };
    if (state != null) {
      const { chatArray } = this.state;
      for (const chat of state.chatArray) {
        chat.props.save = this.save;
        chatArray.push(new ChatItem(chat.props));
      }
    }
  }

  save() {
    const lsString = JSON.stringify(this.state);
    localStorage.setItem(chatDefaults.appName, lsString);
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

  createChat(name) {
    const { chatArray } = this.state;
    chatArray.push(
      new ChatItem({
        name,
        index: chatArray.length,
        save: this.save,
        messageArray: [],
      }),
    );
  }

  renderMain(props) {
    const { chatArray, input } = this.state;
    const { name } = this.props;
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

  renderChat(props) {
    const { chatArray } = this.state;
    const chatId = Number.parseInt(props.match.params.id, 10);
    if (Number.isNaN(chatId)) {
      return (
        <div>
          <p>Wrong chat identifier. Don&apos;t do that.</p>
          <Link to="/">Go back to main screen</Link>
        </div>
      );
    }
    const chat = chatArray[chatId];
    if (chat === undefined) {
      return (
        <div>
          <p>No such chat.</p>
          <Link to="/">Go back to main screen</Link>
        </div>
      );
    }
    return chat.messageForm;
  }

  /*  render() {
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
    } */

  render() {
    return (
      <Router history={this.history}>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <Switch>
          <Route exact path="/" render={this.renderMain} />
          <Route path="/chat/:id" render={this.renderChat} />
        </Switch>
      </Router>
    );
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
