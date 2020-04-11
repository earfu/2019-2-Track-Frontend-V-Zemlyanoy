import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import MessageForm from './MessageForm';
// import geolocate from '../services/geolocation';

function ChatItem({ index, name }) {
  return (
    <div className="chat-list-item" index={index}>
      <div className="chat-item-text">
        <p className="chat-item-name">{name}</p>
      </div>
      <Link to={`/chats/${index}`} className="chat-display-link">
        <button className="chat-messages-button" type="button" index={index}>
          <i className="fa fa-chevron-right" index={index} />
        </button>
      </Link>
    </div>
  );
}

ChatItem.propTypes = {
  // appendMessage: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  // messageArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  // username: PropTypes.string.isRequired,
  // save: PropTypes.func.isRequired,
};

export default ChatItem;
