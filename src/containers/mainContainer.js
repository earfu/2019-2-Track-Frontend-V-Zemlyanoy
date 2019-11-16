import React from 'react';
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';
import ChatListContainer from './components/ChatListContainer';

function mainContainer(props) {
  return (
    <div className="app-container">
      <ChatListContainer
        name="localhost"
        startState={localStorage.getItem(chatDefaults.appName)}
      />
    </div>
  );
}

export default mainContainer;
