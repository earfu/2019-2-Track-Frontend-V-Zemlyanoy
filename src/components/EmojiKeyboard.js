import React from 'react';
import PropTypes from 'prop-types';

import emojiList from '../emojiList';

function EmojiKeyboard({ visible, onEmojiClick }) {
  return (
    <div className={`emoji-keyboard-visible-${visible}`}>
      {emojiList.map((item, index) => (
        <button
          type="button"
          key={item}
          label={item}
          className={`emoji-icon emoji-${item}`}
          onClick={onEmojiClick}
        />
      ))}
    </div>
  );
}

EmojiKeyboard.propTypes = {
  onEmojiClick: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

EmojiKeyboard.defaultProps = {
  visible: false,
};

export default EmojiKeyboard;
