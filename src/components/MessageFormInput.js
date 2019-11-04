import React from 'react'

function MessageFormInput(props) {

 return (
    <input type="text" className="message-form-input" placeholder={props.placeholder}
    onChange={props.onChange} value={props.value} />
  )
}

export default MessageFormInput;
