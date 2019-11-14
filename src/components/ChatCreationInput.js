import React from 'react';
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';

function ChatCreationInput({ onChange, onKeyPress, onSubmit, value }) {
	return (
		<input
			className="chat-name-input"
			type="text"
			value={value}
			onChange={onChange}
			placeholder={chatDefaults.chatName}
			onSubmit={onSubmit}
			onKeyPress={onKeyPress}
		/>
	);
}

ChatCreationInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	onKeyPress: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
};

export default ChatCreationInput;
