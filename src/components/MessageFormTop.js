import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import links from '../links';

function MessageFormTop({ name }) {
  return (
    <div className="message-top-area">
      <Link to={`${links.frontPrefix}`}>
        <button className="chat-deactivation" type="button">
          <i className="fa fa-chevron-left" />
        </button>
      </Link>
      <p className="message-top-name">{name}</p>
    </div>
  );
}

MessageFormTop.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MessageFormTop;
