import React, { useState } from 'react';
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';

import EmojiKeyboard from './EmojiKeyboard';

function MessageFormInput({
  onChange,
  onKeyPress,
  onSubmit,
  onButtonClick,
  onEmojiClick,
  value,
}) {
  const [emojisVisible, setEmojisVisible] = useState(false);

  return (
    <div className="message-sending-form">
      <EmojiKeyboard visible={emojisVisible} onEmojiClick={onEmojiClick} />
      <form className="message-text-form">
        <textarea
          cols={80}
          type="text"
          className="message-form-input"
          placeholder={chatDefaults.messageInputText}
          onChange={onChange}
          value={value}
          onSubmit={onSubmit}
          onKeyPress={onKeyPress}
        />
        <button
          label="emoji-keyboard-button"
          className="emoji-keyboard-button"
          type="button"
          onClick={() => {
            setEmojisVisible(!emojisVisible);
          }}
        />
        <button
          className="message-button"
          type="submit"
          onClick={onButtonClick}
        >
          {chatDefaults.sendMessageText}
        </button>
      </form>
    </div>
  );
}

MessageFormInput.propTypes = {
  onKeyPress: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  onEmojiClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default MessageFormInput;
