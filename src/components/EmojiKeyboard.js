import React from 'react';
// import PropTypes from 'prop-types';

function EmojiKeyboard({ visible }) {
  return (
    <div className={`emoji-keyboard-visible-${visible}`}>
      <div className="emoji-icon emoji-see-no-evil" />
      <div className="emoji-icon emoji-hear-no-evil" />
      <div className="emoji-icon emoji-speak-no-evil" />
      <div className="emoji-icon emoji-ophiuchus" />
      <div className="emoji-icon emoji-volcano" />
      <div className="emoji-icon emoji-fountain" />
      <div className="emoji-icon emoji-sleeping-symbol" />
      <div className="emoji-icon emoji-anger-symbol" />
      <div className="emoji-icon emoji-heavy-check-mark" />
      <div className="emoji-icon emoji-cross-mark" />
      <div className="emoji-icon emoji-exclamation-question-mark" />
      <div className="emoji-icon emoji-banknote-with-dollar-sign" />
    </div>
  );
}

EmojiKeyboard.propTypes = {
  visible: Boolean,
};

EmojiKeyboard.defaultProps = {
  visible: false,
};

export default EmojiKeyboard;
