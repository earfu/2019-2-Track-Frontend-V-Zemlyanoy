import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'cookie';
// import chatDefaults from '../chatDefaults';
import MessageFormTop from './MessageFormTop';
import MessageHistory from './MessageHistory';
import MessageFormInput from './MessageFormInput';

import links from '../links';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmojiClick = this.handleEmojiClick.bind(this);
    this.getChat = this.getChat.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.centMessages = this.centMessages.bind(this);

    if (!props.peer || !props.conn) {
      // fetch message history, unless it's a WebRTC chat
      this.state = { input: '', loaded: false, inError: false };
      this.getChat();
    } else {
      this.state = {
        input: '',
        loaded: true,
        inError: false,
        messageArray: [],
        chatName: `WebRTC-chat#${props.chatId}`,
      };
    }
  }

  componentWillUnmount() {
    const { msgSub, conn } = this.state;
    if (msgSub) {
      msgSub.unsubscribe();
      this.setState({ msgSub: null });
    }
    if (conn) {
      conn.close();
    }
  }

  async getChat() {
    const { chatId } = this.props;
    await fetch(links['chat-id'](chatId), {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          data &&
          data.messages &&
          data.username &&
          data.chat_name &&
          data.chat_id &&
          data.chat_id === chatId
        ) {
          this.setState({
            messageArray: data.messages,
            chatName: data.chat_name,
            loaded: true,
          });
          this.centMessages();
        } else {
          this.setState({ inError: true, error: data.error, loaded: true });
        }
      });
  }

  async centMessages() {
    const { centrifuge, chatId } = this.props;
    const msgSub = centrifuge.subscribe(`${'$'}chat${chatId}`, (msg) => {
      const { messageArray } = this.state;
      messageArray.push(msg.data);
      this.setState({ messageArray });
    });
    centrifuge.connect();
    this.setState({ msgSub });
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { input } = this.state;
    if (input === '') {
      return;
    }
    this.postMessage();
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

  handleButtonClick(event) {
    event.preventDefault();
    this.handleSubmit(new Event('submit', { cancelable: true }));
  }

  handleEmojiClick(event) {
    const name = event.target.classList[1];
    const { input } = this.state;
    this.setState({ input: `${input}:${name}:` });
  }

  async postMessage() {
    const { chatId, peer, messageArray } = this.props;
    const { input } = this.state;
    if (peer) {
      const { conn, username } = this.props;
      const msg = {
        content: input,
        added_at: new Date().toString(),
        user__username: username,
      };
      conn.send(msg);
      return;
    }
    const body = JSON.stringify({ content: input });
    await fetch(links['chat-send-message'](chatId), {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body,
      headers: {
        'X-CSRFToken': cookie.parse(document.cookie).csrftoken,
      },
    })
      .then((res) => res.json())
      .then((data) => {});
  }

  render() {
    const { loaded } = this.state;
    if (!loaded) {
      return <div />;
    }
    const { inError } = this.state;
    if (inError) {
      const { error } = this.state;
      return <p>{error}</p>;
    }
    const { chatName, input } = this.state;
    const { peer } = this.props;

    const { messageArray } = peer ? this.props : this.state;

    return (
      <div className="message-form-wrap">
        <div className="message-form-head">
          <MessageFormTop name={chatName} />
        </div>
        <div className="wrap-history">
          <MessageHistory
            className="message-history"
            messageArray={messageArray}
          />
        </div>
        <MessageFormInput
          name="message-text"
          value={input}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onKeyPress={this.handleKeyPress}
          onButtonClick={this.handleButtonClick}
          onEmojiClick={this.handleEmojiClick}
        />
      </div>
    );
  }
}

MessageForm.propTypes = {
  chatId: PropTypes.number.isRequired,
  peer: PropTypes.bool,
  username: PropTypes.string,
  messageArray: PropTypes.arrayOf(PropTypes.shape({})),

  centrifuge: PropTypes.shape({
    connect: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
  }),
  conn: PropTypes.shape({ send: PropTypes.func.isRequired }),
};

MessageForm.defaultProps = {
  centrifuge: null,
  conn: null,
  peer: false,
  username: '',
  messageArray: undefined,
};

export default MessageForm;
