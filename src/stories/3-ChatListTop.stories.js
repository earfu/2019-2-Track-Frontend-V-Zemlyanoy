import React from 'react';
import { action } from '@storybook/addon-actions';
import ChatListTop from '../components/ChatListTop';
import '../styles/chatContainerTopStyles.css';

export default { title: 'ChatListTop' };

export const namedVasya = () => (
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <ChatListTop
      name="Vasya"
      onOpenMenu={action('clicked the Open Menu button')}
    />
  </div>
);

export const namedTolya = () => (
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <ChatListTop
      name="Tolya"
      onOpenMenu={action('clicked the Open Menu button')}
    />
  </div>
);
