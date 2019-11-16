import React, { useEffect } from 'react';
// import { FlatList } from 'react-native';
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
        <li key={item.number}>
          <MessageItem
            author={item.author}
            date={item.date}
            number={item.number}
            text={item.text}
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
