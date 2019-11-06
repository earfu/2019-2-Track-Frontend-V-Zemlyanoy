import React from 'react';
import PropTypes from 'prop-types';

function ChatListTop(props) {

	return (
		<div className="chat-top-area">
			<button className="chat-bars-button" type="button" onClick={null}><i className="fa fa-bars" /></button>
			<p className="chat-top-name">{props.name}</p>
		</div>
	)
}

ChatListTop.propTypes = {
	name: PropTypes.string.isRequired,
}

export default ChatListTop
