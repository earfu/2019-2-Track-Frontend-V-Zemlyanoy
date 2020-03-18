import React from 'react';
import { action } from '@storybook/addon-actions';
import ChatCreationInput from '../components/ChatCreationInput';
import '../styles/chatCreationStyles.css';

export default { title: 'ChatCreationInput' };

export const empty = () => {
  return (
    <ChatCreationInput
      value=""
      onSubmit={null}
      onChange={null}
      onKeyPress={(event) => action(`pressed ${event.key}`)}
    />
  );
};
