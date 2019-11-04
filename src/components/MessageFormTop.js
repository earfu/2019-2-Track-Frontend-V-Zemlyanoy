import React from 'react'
//import chatDefaults from '../chatDefaults';

function MessageFormTop(props) {

  return (
    <div className="message-top-area">
        <button className="chat-deactivation" type="button" onClick={() => (null)}><i className="fa fa-chevron-left"></i></button>

        <p className="message-top-name">{props.name}</p>
    </div>
  );

}

export default MessageFormTop;
