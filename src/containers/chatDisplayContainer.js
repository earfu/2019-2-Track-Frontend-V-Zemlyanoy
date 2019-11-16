import React from 'react';
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';
import ChatListContainer from './components/ChatListContainer';

function chatDisplayContainer(props) {
  const { chatId } = props;
  const { chatArray } = props;
  const chat = chatArray[chatId];
  return chat.messageForm;
}

export default chatDisplayContainer;
