import React from 'react';
import PropTypes from 'prop-types';
// import chatDefaults from '../chatDefaults';
import ChatListContainer from '../components/ChatListContainer';

function MainScreenContainer({ chatArray, save }) {
  return (
    <div className="main-screen-container">
      <ChatListContainer name="localhost" chatArray={chatArray} save={save} />
    </div>
  );
}

MainScreenContainer.propTypes = {
  chatArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  save: PropTypes.func.isRequired,
};

export default MainScreenContainer;
