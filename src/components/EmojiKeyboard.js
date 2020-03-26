import React from 'react';
// import PropTypes from 'prop-types';

function EmojiKeyboard({ visible }) {
  return (
    <div className={`emoji-keyboard-visible-${visible}`}>
      <div className="emoji-icon emoji-see-no-evil" />
      <div className="emoji-icon emoji-hear-no-evil" />
      <div className="emoji-icon emoji-speak-no-evil" />
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
