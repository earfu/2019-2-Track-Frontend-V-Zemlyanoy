import React from 'react';
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';

function MessageFormInput({
  onChange,
  onKeyPress,
  onSubmit,
  onImageLoad,
  onImageClear,
  onAudioLoad,
  onAudioClear,
  onButtonClick,
  value,
}) {
  return (
    <div className="message-sending-form">
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
          className="message-button"
          type="submit"
          onClick={onButtonClick}
        >
          {chatDefaults.sendMessageText}
        </button>
      </form>

      <form className="image-input-form">
        <p className="image-input-text">{chatDefaults.imageLoadText}</p>
        <input
          type="file"
          id="image-input"
          accept="image/*"
          onChange={onImageLoad}
        />
        <button type="button" onClick={onImageClear}>
          {chatDefaults.imageClearText}
        </button>
      </form>

      <form className="audio-input-form">
        <p className="audio-input-text">{chatDefaults.audioLoadText}</p>
        <input
          type="file"
          id="audio-input"
          accept="audio/*"
          onChange={onAudioLoad}
        />
        <button type="button" onClick={onAudioClear}>
          {chatDefaults.audioClearText}
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
  onImageLoad: PropTypes.func.isRequired,
  onImageClear: PropTypes.func.isRequired,
  onAudioLoad: PropTypes.func.isRequired,
  onAudioClear: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default MessageFormInput;
