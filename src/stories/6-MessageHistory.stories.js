import React from 'react';
import { action } from '@storybook/addon-actions';
import MessageHistory from '../components/MessageHistory';
import '../styles/messageFormComponentStyles.css';

export default { title: 'MessageHistory' };

export const empty = () => {
  return <MessageHistory messageArray={[]} />;
};

export const filled = () => {
  function messageFactory(messageArray) {
    const len = messageArray.length;
    const item = {
      number: len,
      author: `author_${len}`,
      text: `Message ${len} text content`,
      date: 1000000 + 10000 * len,
      image: null,
      audio: null,
    };
    return item;
  }

  const messageArray = [];
  for (let i = 0; i < 10; i += 1) {
    messageArray.push(messageFactory(messageArray));
  }

  return <MessageHistory messageArray={messageArray} />;
};
