import React from 'react';
import { action } from '@storybook/addon-actions';
import MessageItem from '../components/MessageItem';
import '../styles/messageItemStyles.css';

export default { title: 'MessageItem' };

export const withSampleText = () => {
  return (
    <MessageItem
      date={1001010}
      text="Sample message text content"
      number={1032111}
    />
  );
};
