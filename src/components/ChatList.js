import React from 'react';
import PropTypes from 'prop-types';

function ChatList({ chatArray }) {

	return (
		<div className="chats-area">
			{chatArray.map((item, index) => (
				<li key={item.props.index} >
					{item.render()}
				</li>)
			)}
		</div>
	);
}

ChatList.propTypes = {
	chatArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChatList;
