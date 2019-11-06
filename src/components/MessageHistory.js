import React from 'react'
import PropTypes from 'prop-types';
import MessageItem from './MessageItem';

function MessageHistory(props) {

	return (
		<div className="message-history-list">
			{props.messageArray.map((item, index) => <li key={item.number}>
				<MessageItem author={item.author} date={item.date} number={item.number} text={item.text} />
			</li>)}
		</div>
	);

}

MessageHistory.propTypes = {
	messageArray: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default MessageHistory;