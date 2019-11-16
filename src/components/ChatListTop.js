import React from 'react';
import PropTypes from 'prop-types';

function ChatListTop({ name, onOpenMenu }) {
	return (
		<div className="chat-top-area">
			<button
				className="chat-bars-button"
				type="button"
				onClick={onOpenMenu}
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
	onOpenMenu: PropTypes.func.isRequired,
};

export default ChatListTop;
