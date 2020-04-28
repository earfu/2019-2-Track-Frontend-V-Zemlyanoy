import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cookie from 'cookie';

import ChatList from './ChatList';
import ChatCreationInput from './ChatCreationInput';
import ChatListTop from './ChatListTop';
import chatDefaults from '../chatDefaults';
// import ChatItem from './ChatItem';

import links from '../links';

class ChatListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.state = { input: '', chatArray: [], menu: false, loaded: false };
    this.postChat = this.postChat.bind(this);
    this.getChats = this.getChats.bind(this);
    this.centChats = this.centChats.bind(this);

    this.getChats();
  }

  componentWillUnmount() {
    const { chatSub } = this.state;
    if (chatSub) {
      chatSub.unsubscribe();
      this.setState({ chatSub: null });
    }
  }

  async getChats() {
    fetch(links['chat-index'], {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (
          data &&
          data.user_id &&
          data.username &&
          data.chats &&
          data.cent_token
        ) {
          this.setState({
            userId: data.user_id,
            username: data.username,
            chatArray: data.chats,
            centToken: data.cent_token,
            loaded: true,
          });
          this.centChats();
        }
      });
  }

  async centChats() {
    const { centToken, userId } = this.state;
    const { centrifuge } = this.props;
    centrifuge.setToken(centToken);
    const chatSub = centrifuge.subscribe(`chats#${userId}`, (chtObj) => {
      const { chatArray } = this.state;
      chatArray.push(chtObj.data);
      this.setState({ chatArray });
    });
    centrifuge.connect();
    this.setState({ chatSub });
  }

  handleInputChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { input } = this.state;
    if (input === '') {
      return;
    }
    this.postChat();
    this.setState({ input: '' });
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

  async postChat() {
    const { input } = this.state;
    const body = JSON.stringify({ chatName: input });
    fetch(links['chat-create'], {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'X-CSRFToken': cookie.parse(document.cookie).csrftoken,
        'X-Requested-With': 'XMLHttpRequest',
      },
      body,
    })
      .then((res) => res.json())
      .then((data) => {});
  }

  render() {
    const { loaded } = this.state;
    if (!loaded) {
      return <div />;
    }
    const { input, menu, username, chatArray } = this.state;
    return (
      <div className="chat-list-area">
        <div className="chat-list-head">
          <ChatListTop name={username} onOpenMenu={this.handleOpenMenu} />
          <div className={`main-settings-${menu}`}>
            <Link to={`${links.frontPrefix}/profile`}>
              <button className="menu-button" type="button">
                {chatDefaults.myProfileText}
              </button>
            </Link>
            <Link to={`${links.frontPrefix}/webrtc`}>
              <button className="menu-button" type="button">
                WebRTC
              </button>
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
  centrifuge: PropTypes.shape({
    connect: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
  }).isRequired,
};

export default ChatListContainer;
