import React from 'react';
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';

function MessageFormInput({ onChange, onKeyPress, onSubmit, value }) {
  return (
    <input
      type="text"
      className="message-form-input"
      placeholder={chatDefaults.messageInputText}
      onChange={onChange}
      value={value}
      onSubmit={onSubmit}
      onKeyPress={onKeyPress}
    />
  );
}

MessageFormInput.propTypes = {
  onKeyPress: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default MessageFormInput;
