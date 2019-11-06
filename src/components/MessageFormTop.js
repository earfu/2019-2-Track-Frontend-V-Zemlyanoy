import React from 'react';
import PropTypes from 'prop-types';

function MessageFormTop({ name, handleReturn }) {
	return (
		<div className="message-top-area">
			<button
				className="chat-deactivation"
				type="button"
				onClick={handleReturn}
			>
				<i className="fa fa-chevron-left" />
			</button>

			<p className="message-top-name">{name}</p>
		</div>
	);
}

MessageFormTop.propTypes = {
	handleReturn: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
};

export default MessageFormTop;
