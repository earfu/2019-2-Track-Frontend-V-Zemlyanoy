import React from 'react';
import PropTypes from 'prop-types';
// import chatDefaults from '../chatDefaults';
import ChatListContainer from '../components/ChatListContainer';

function MainScreenContainer({ chatArray, username, save }) {
  return (
    <div className="main-screen-container">
      <ChatListContainer
        username={username}
        chatArray={chatArray}
        save={save}
      />
    </div>
  );
}

MainScreenContainer.propTypes = {
  chatArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  username: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
};

export default MainScreenContainer;
