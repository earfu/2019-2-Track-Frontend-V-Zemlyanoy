import React from 'react';
import PropTypes from 'prop-types';
// import chatDefaults from '../chatDefaults';
// import MessageFormTop from './MessageFormTop';
// import MessageHistory from './MessageHistory';
// import MessageFormInput from './MessageFormInput';

class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chunks: [], file: null };
    this.handleDataAvailable = this.handleDataAvailable.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.record = this.record.bind(this);
  }

  handleDataAvailable(event) {
    const { chunks } = this.state;
    chunks.push(event.data);
  }

  handleStop() {
    const { chunks, recorder } = this.state;
    const blob = new Blob(chunks, { type: recorder.mimeType });
    const audioURL = URL.createObjectURL(blob);
    this.setState({ chunks: [], file: audioURL });
  }

  async record() {
    const stream = await newStream();
    if (stream === null) {
      return;
    }
    const recorder = new MediaRecorder(stream);
    // what defines the mimeType there?
    recorder.start();
    recorder.stop();
    // what for, even?
    recorder.ondataavailable = this.handleDataAvailable;
    recorder.onstop = this.handleStop;
    this.setState({ recorder });
    console.log(recorder);
  }

  render() {
    const { file, recorder } = this.state;
    return (
      <div className="audio-recorder-div">
        {file ? (
          <audio className="loaded-audio" controls>
            <source src={file} type={recorder.mimeType || 'audio/mpeg'} />
            <track kind="captions" />
            Recorded track: wrong audio type.
          </audio>
        ) : null}
        <div className="audio-recorder-buttons">
          <button type="button" onClick={this.record}>
            Record
          </button>
          {recorder ? (
            <button type="button" onClick={recorder.start.bind(recorder)}>
              Start
            </button>
          ) : null}
          {recorder ? (
            <button type="button" onClick={recorder.stop.bind(recorder)}>
              Stop
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

AudioRecorder.propTypes = {};

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
