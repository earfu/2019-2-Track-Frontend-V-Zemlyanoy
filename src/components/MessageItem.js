import React from 'react';
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';

function MessageItem({ number, date, author, text }) {
	return (
		<div className="message-item-div" index={number}>
			<p className="message-item-text">{text}</p>
			<p className="message-item-author">{author}</p>
			<p className="message-item-date">{new Date(date).toLocaleString()}</p>
		</div>
	);
}

MessageItem.propTypes = {
	author: PropTypes.string,
	date: PropTypes.number.isRequired,
	number: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
};

MessageItem.defaultProps = {
	author: chatDefaults.authorName,
};

export default MessageItem;
