import React from 'react';
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';

function ChatCreationInput(props) {
	return (
		<input className="chat-name-input" type="text" value={props.value}
			onChange={props.onChange} placeholder={chatDefaults.chatName}
			onSubmit={props.onSubmit} onKeyPress={props.onKeyPress}
		/>
	)
}

ChatCreationInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	onKeyPress: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
}

export default ChatCreationInput;
