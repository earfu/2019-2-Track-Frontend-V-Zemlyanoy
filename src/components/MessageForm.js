import React from 'react';
import PropTypes from 'prop-types';
// import chatDefaults from '../chatDefaults';
import MessageFormTop from './MessageFormTop';
import MessageHistory from './MessageHistory';
import MessageFormInput from './MessageFormInput';
import AudioRecorder from './AudioRecorder';

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
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { input, image, audio } = this.state;
    if (input === '' && !audio && !image) {
      return;
    }
    const { save, appendMessage, username, chatId } = this.props;
    appendMessage({
      chatId,
      text: input,
      author: username,
      date: new Date().valueOf(),
      image,
      audio,
    });
    this.setState({ input: '' });
    this.handleImageClear();
    this.handleAudioClear();
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
    const image = event.target.files[0];
    if (image.type.search(/^image[/][a-z]+$/) === 0) {
      // check file type to be "image/whatever"
      this.setState({ image });
    }
  }

  handleAudioLoad(event) {
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

  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    const { appendMessage, chatId, username, save } = this.props;
    const { files } = event.dataTransfer;
    for (const file of files) {
      if (file.type.search(/^image[/][a-z]+$/) === 0) {
        appendMessage({
          chatId,
          text: '',
          author: username,
          date: new Date().valueOf(),
          image: file,
        });
      }
    }
    save();
    this.forceUpdate();
    // somehow needed for now because of message render handling, or what?
    // anyhow, should be replaced by notifications from server about new messages
  }

  render() {
    const { name, messageArray } = this.props;
    const { input } = this.state;
    return (
      <div className="message-form-wrap">
        <div className="message-form-head">
          <MessageFormTop name={name} />
        </div>
        <div
          className="wrap-history"
          onDrop={this.handleDrop}
          onDragOver={handleDragOver}
        >
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
        <AudioRecorder />
      </div>
    );
  }
}

export function handleDragOver(event) {
  event.preventDefault();
  event.stopPropagation();
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
