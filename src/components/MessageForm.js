import React from 'react';
import PropTypes from 'prop-types';
// import chatDefaults from '../chatDefaults';
import MessageFormTop from './MessageFormTop';
import MessageHistory from './MessageHistory';
import MessageFormInput from './MessageFormInput';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.handleImageClear = this.handleImageClear.bind(this);
    this.handleAudioLoad = this.handleAudioLoad.bind(this);
    this.handleAudioClear = this.handleAudioClear.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { input, image, audio } = this.state;
    const { save, appendMessage, username, chatId } = this.props;
    if (input === '') {
      return;
    }
    appendMessage({
      chatId,
      text: input,
      author: username,
      date: new Date().valueOf(),
      image,
      audio,
    });
    this.setState({ input: '' });
    save();
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSubmit(new Event('submit', { cancelable: true }));
      // cancelable: true is needed for Firefox
      // preventDefault() is not allowed to work otherwise
    }
  }

  handleButtonClick(event) {
    event.preventDefault();
    this.handleSubmit(new Event('submit', { cancelable: true }));
  }

  handleImageLoad(event) {
    if (event.target.files.length > 1) {
      event.preventDefault();
      return;
    }
    const image = event.target.files[0];
    if (image.type.search(/^image[/][a-z]+$/) === 0) {
      // check file type to be "image/whatever"
      this.setState({ image });
    }
  }

  handleAudioLoad(event) {
    if (event.target.files.length > 1) {
      event.preventDefault();
      return;
    }
    const audio = event.target.files[0];
    if (audio.type.search(/^audio[/][a-z]+$/) === 0) {
      // check file type to be "audio/whatever"
      this.setState({ audio });
    }
  }

  handleImageClear() {
    // relying on event.target would create problems with button/image distinction,
    // even if using document search is more costly
    document.querySelector('.image-input-form').reset();
    this.setState({ image: null });
  }

  handleAudioClear() {
    // relying on event.target would create problems with button/image distinction,
    // even if using document search is more costly
    document.querySelector('.audio-input-form').reset();
    this.setState({ audio: null });
  }

  render() {
    const { name, messageArray } = this.props;
    const { input } = this.state;
    return (
      <div className="message-form-wrap">
        <div className="message-form-head">
          <MessageFormTop name={name} />
        </div>
        <div className="wrap-history">
          <MessageHistory
            className="message-history"
            chatName={name}
            messageArray={messageArray}
          />
        </div>
        <MessageFormInput
          name="message-text"
          value={input}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onKeyPress={this.handleKeyPress}
          onButtonClick={this.handleButtonClick}
          onImageLoad={this.handleImageLoad}
          onImageClear={this.handleImageClear}
          onAudioLoad={this.handleAudioLoad}
          onAudioClear={this.handleAudioClear}
        />
      </div>
    );
  }
}

MessageForm.propTypes = {
  appendMessage: PropTypes.func.isRequired,
  chatId: PropTypes.number.isRequired,
  messageArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default MessageForm;
