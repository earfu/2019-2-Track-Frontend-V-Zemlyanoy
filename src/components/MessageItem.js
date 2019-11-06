import React from 'react'
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';

function MessageItem(props) {

	return (
		<div className="message-item-div" index={props.number}>
			<p className="message-item-text">{ props.text }</p>
			<p className="message-item-author">{ props.author }</p>
			<p className="message-item-date">{ (new Date(props.date)).toLocaleString() }</p>
		</div>
	);

}

MessageItem.propTypes = {
	author: PropTypes.string,
	date: PropTypes.number.isRequired,
	number: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
}

MessageItem.defaultProps = {
	author: chatDefaults.authorName,
}

export default MessageItem;
