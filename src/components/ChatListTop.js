import React from 'react';

function ChatListTop(props) {

  return (
    <div className="chat-top-area">
        <button className="chat-bars-button" type="button" onclick=""><i className="fa fa-bars"></i></button>
        <p className="chat-top-name">{props.name}</p>
    </div>
  )
}

export default ChatListTop
