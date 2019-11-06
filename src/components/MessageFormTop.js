import React from 'react'
import PropTypes from 'prop-types';

function MessageFormTop(props) {

	return (
		<div className="message-top-area">
			<button className="chat-deactivation" type="button" onClick={props.handleReturn}>
				<i className="fa fa-chevron-left" />
			</button>

			<p className="message-top-name">{props.name}</p>
		</div>
	);

}

MessageFormTop.propTypes = {
	handleReturn: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
}

export default MessageFormTop;
