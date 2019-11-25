import React from 'react';
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';

function MessageItem({ number, date, author, text, image, audio }) {
  return (
    <div className="message-item-div" id={number}>
      <p className="message-item-text">{text}</p>
      <p className="message-item-author">{author}</p>
      <p className="message-item-date">{new Date(date).toLocaleString()}</p>
      {audio ? (
        <audio className="loaded-audio" controls>
          <source src={audio} type="audio/mpeg" />
          <track kind="captions" />
          Unsupported audio format.
        </audio>
      ) : null}
      {image ? (
        <img
          className="loaded-image"
          src={image}
          alt={chatDefaults.userLoadedImageAltText}
        />
      ) : null}
    </div>
  );
  // <track> is just to satisfy eslint
}

MessageItem.propTypes = {
  author: PropTypes.string,
  date: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.shape({}),
  audio: PropTypes.shape({}),
};

MessageItem.defaultProps = {
  author: chatDefaults.authorName,
  image: null,
  audio: null,
};

export default MessageItem;
