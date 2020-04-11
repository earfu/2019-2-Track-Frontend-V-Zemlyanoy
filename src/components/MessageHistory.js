import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MessageItem from './MessageItem';

function MessageHistory({ messageArray }) {
  // forced scroll to the end with every new message
  useEffect(() => document.querySelector('#last').scrollIntoView(false), [
    messageArray.length,
  ]);

  return (
    <div className="message-history-list">
      {messageArray.map((item, index) => (
        <li key={item.id}>
          <MessageItem
            author={item.user__username}
            date={new Date(item.added_at)}
            number={item.id || index}
            text={item.content}
            // image={item.image}
            // audio={item.audio}
          />
        </li>
      ))}
      <div id="last" />
    </div>
  );
}

MessageHistory.propTypes = {
  messageArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MessageHistory;
