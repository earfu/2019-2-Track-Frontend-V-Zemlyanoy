import React from 'react'
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';

function MessageFormInput(props) {

	return (
		<input type="text" className="message-form-input" placeholder={chatDefaults.messageInputText}
			onChange={props.onChange} value={props.value}
			onSubmit={props.onSubmit} onKeyPress={props.onKeyPress} />
	)
}

MessageFormInput.propTypes = {
	onKeyPress: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
}

export default MessageFormInput;
