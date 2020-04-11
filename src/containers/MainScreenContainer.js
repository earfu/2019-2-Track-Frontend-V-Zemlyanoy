import React from 'react';
import PropTypes from 'prop-types';
// import chatDefaults from '../chatDefaults';
import ChatListContainer from '../components/ChatListContainer';

function MainScreenContainer({ username }) {
  return (
    <div className="main-screen-container">
      <ChatListContainer username={username} />
    </div>
  );
}

MainScreenContainer.propTypes = {
  username: PropTypes.string.isRequired,
};

export default MainScreenContainer;
