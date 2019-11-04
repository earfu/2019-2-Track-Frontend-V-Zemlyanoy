import React from 'react'
import chatDefaults from '../chatDefaults';

function MessageItem(props) {
    return (
        <div className="message-item-div" key={props.number}>
            <p className="message-item-text">{ props.text }</p>
            <p className="message-item-author">{ props.author || chatDefaults.authorName}</p>
            <p className="message-item-date">{ props.date.toLocaleString() }</p>
        </div>
    );
}


export default MessageItem;
