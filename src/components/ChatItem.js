import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MessageForm from './MessageForm';
import geolocate from '../services/geolocation';

class ChatItem extends React.Component {
  constructor(props) {
    // { name, messageArray, handleReturn, save }
    super(props);
    const { name, save, messageArray, username, appendMessage, index } = props;
    // this.appendMessage = this.appendMessage.bind(this);
    this.geolocate = geolocate;
    this.messageForm = (
      <MessageForm
        name={name}
        username={username}
        messageArray={messageArray}
        save={save}
        appendMessage={appendMessage}
        chatId={index}
      />
    );
  }

  /* appendMessage(text, author, date) {
    const { messageArray, save } = this.props;
    messageArray.push({
      number: messageArray.length,
      text,
      author,
      date: date || new Date().valueOf(),
    });
    if (text === '/geolocate') {
      // call geolocation function
      this.geolocate(this.appendMessage, save);
    }
  } */

  render() {
    const { index, name } = this.props;
    return (
      <div className="chat-list-item" index={index}>
        <div className="chat-item-text">
          <p className="chat-item-name">{name}</p>
        </div>
        <Link to={`/chat/${index}`} className="chat-display-link">
          <button className="chat-messages-button" type="button" index={index}>
            <i className="fa fa-chevron-right" index={index} />
          </button>
        </Link>
      </div>
    );
  }
}

ChatItem.propTypes = {
  appendMessage: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  messageArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
};

export default ChatItem;
