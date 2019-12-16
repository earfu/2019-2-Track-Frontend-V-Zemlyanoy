import React from 'react';
import PropTypes from 'prop-types';
import chatDefaults from '../chatDefaults';
// import MessageFormTop from './MessageFormTop';
// import MessageHistory from './MessageHistory';
// import MessageFormInput from './MessageFormInput';

class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chunks: [], file: null, blob: null };
    this.handleDataAvailable = this.handleDataAvailable.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.record = this.record.bind(this);
    this.audioRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const { file } = this.state;
    if (file !== prevState.file && file !== null) {
      this.audioRef.current.load();
    }
  }

  handleDataAvailable(event) {
    const { chunks } = this.state;
    chunks.push(event.data);
  }

  handleStop() {
    const { chunks, recorder } = this.state;
    const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/mpeg' });
    const audioURL = URL.createObjectURL(blob);
    this.setState({ chunks: [], file: audioURL, blob });
  }

  handleLoad() {
    const { blob } = this.state;
    const { onRecorder } = this.props;
    onRecorder(blob);
  }

  handleClear() {
    this.setState({ file: null, blob: null });
    const { onAudioClear } = this.props;
    onAudioClear();
  }

  async record() {
    const stream = await newStream();
    if (stream === null) {
      return;
    }
    const recorder = new MediaRecorder(stream);
    // what defines the mimeType there?
    recorder.ondataavailable = this.handleDataAvailable;
    recorder.onstop = this.handleStop;
    this.setState({ recorder });
  }

  render() {
    const { file, recorder } = this.state;
    return (
      <div className="audio-recorder-div">
        {file ? (
          <audio ref={this.audioRef} className="loaded-audio" controls>
            <source src={file} />
            <track kind="captions" />
            Recorded track: wrong audio type.
          </audio>
        ) : null}
        <div className="audio-recorder-buttons">
          <button
            className="audio-recorder-button"
            type="button"
            onClick={this.record}
          >
            {chatDefaults.audioRecorderTexts.recordText}
          </button>
          {recorder ? (
            <button
              className="audio-recorder-button"
              type="button"
              onClick={recorder.start.bind(recorder)}
            >
              {chatDefaults.audioRecorderTexts.startText}
            </button>
          ) : null}
          {recorder ? (
            <button
              className="audio-recorder-button"
              type="button"
              onClick={recorder.stop.bind(recorder)}
            >
              {chatDefaults.audioRecorderTexts.stopText}
            </button>
          ) : null}
          {file ? (
            <button
              className="audio-recorder-button"
              type="button"
              onClick={this.handleLoad}
            >
              {chatDefaults.audioRecorderTexts.loadText}
            </button>
          ) : null}
          {file ? (
            <button
              className="audio-recorder-button"
              type="button"
              onClick={this.handleClear}
            >
              {chatDefaults.audioRecorderTexts.clearText}
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

AudioRecorder.propTypes = {
  onAudioClear: PropTypes.func.isRequired,
  onRecorder: PropTypes.func.isRequired,
};

export default AudioRecorder;

export async function newStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return stream;
  } catch (err) {
    // respond to error somehow
    return null;
  }
}
