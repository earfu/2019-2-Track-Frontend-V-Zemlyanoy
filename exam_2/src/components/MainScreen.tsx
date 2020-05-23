import React from 'react';
// import PropTypes from 'prop-types';

import * as TranslateUtil from './../utils/index';
import * as T from './../utils/types';
import MainTop from './MainTop';

interface mainScreenState {
  input: string;
  output: string;
  target: string;
  source: string;
  detected: string;
}

interface mainScreenProps {}

class MainScreen extends React.Component<mainScreenProps, mainScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: '',
      output: '',
      target: 'en',
      source: '??',
      detected: '',
    };

    this.setResult = this.setResult.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSource = this.handleSource.bind(this);
    this.handleTarget = this.handleTarget.bind(this);
  }

  setResult(data: T.APIJson) {
    this.setState({ output: data.text[0], detected: data.detected.lang });
  }

  handleSource(event: React.SyntheticEvent<HTMLSelectElement>) {
    let eTarget = event.target as HTMLSelectElement;
    this.setState({ source: eTarget.value });
  }

  handleTarget(event: React.SyntheticEvent<HTMLSelectElement>) {
    let eTarget = event.target as HTMLSelectElement;
    this.setState({ target: eTarget.value });
  }

  handleChange(event: { target: { value: string } }) {
    this.setState({ input: event.target.value });
  }

  handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const { input, source, target } = this.state;
    // console.log(TranslateUtil.default.translate);
    if (input === '') {
      return;
    }
    let lang: string;
    if (source === '??') {
      lang = target;
    } else {
      lang = `${source}-${target}`;
    }
    const prom = TranslateUtil.default.translate(input, lang, this.setResult);
    // stupid version of return type check
    if (prom && !(prom instanceof Promise)) {
      this.setResult(prom);
      return;
    }
  }

  render() {
    const { target, source, input, output, detected } = this.state;
    return (
      <div className="upper-div">
        <MainTop
          target={target}
          source={source}
          handleTarget={this.handleTarget}
          handleSource={this.handleSource}
        />
        <div className="text-row">
          <textarea
            rows={20}
            className="text-field input-field"
            onChange={this.handleChange}
            value={input}
            placeholder="Input text to be translated"
          />
          <textarea
            rows={20}
            className="text-field output-field"
            value={output}
            placeholder="Translation"
          />
        </div>
        <button type="submit" onClick={this.handleSubmit}>
          Translate!
        </button>
        <p>{detected !== '' ? `Detected language: ${detected}` : ''}</p>
      </div>
    );
  }
}

export default MainScreen;
