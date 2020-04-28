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
        // index can in fact be used as a fallback key, but only as a fallback;
        // in this case, in would fall back in every WebRTC chat
        // (as those do not have persistent message ids at all)
        <li key={item.id || index}>
          <MessageItem
            author={item.user__username}
            date={new Date(item.added_at)}
            // supposed that either all messages in a list have ids (from database), or none have (from WebRTC)
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
