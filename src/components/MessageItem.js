import React from 'react';
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';

import messageTextParser from '../services/messageTextParser';

function MessageItem({ number, date, author, text }) {
  return (
    <div className="message-item-div" id={number}>
      <p className="message-item-text">{messageTextParser(text)}</p>
      <p className="message-item-author">{author}</p>
      <p className="message-item-date">{new Date(date).toLocaleString()}</p>
    </div>
  );
  // <track> is just to satisfy eslint
}

MessageItem.propTypes = {
  author: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

MessageItem.defaultProps = {
  author: chatDefaults.authorName,
};

export default MessageItem;
