import React from 'react';
import PropTypes from 'prop-types';

function ChatListTop({ name }) {
	return (
		<div className="chat-top-area">
			<button
				className="chat-bars-button"
				type="button"
				onClick={null}
				label="bars"
			>
				<i className="fa fa-bars" />
			</button>
			<p className="chat-top-name">{name}</p>
		</div>
	);
}

ChatListTop.propTypes = {
	name: PropTypes.string.isRequired,
};

export default ChatListTop;
