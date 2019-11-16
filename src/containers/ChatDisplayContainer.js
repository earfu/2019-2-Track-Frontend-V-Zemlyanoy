// import React from 'react';
import PropTypes from 'prop-types';
// import chatDefaults from '../chatDefaults';

function ChatDisplayContainer({ chat }) {
	return chat.messageForm;
}

ChatDisplayContainer.propTypes = {
	chat: PropTypes.shape({
		messageForm: PropTypes.object,
		props: PropTypes.object,
	}).isRequired,
};

export default ChatDisplayContainer;
