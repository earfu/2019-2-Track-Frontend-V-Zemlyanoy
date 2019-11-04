import React from 'react'
import chatDefaults from '../chatDefaults';
import MessageItem from './MessageItem'
import MessageFormTop from './MessageFormTop';
import MessageHistory from './MessageHistory';
import MessageFormInput from './MessageFormInput';


export default class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {input: '', messageArray: []};

    }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.input === '') {
      return;
    }
    this.appendMessage(this.state.input, chatDefaults.authorName, new Date());
    this.setState({input: ''});
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(new Event('submit', { cancelable: true }));
      // cancelable: true is needed for Firefox
      // preventDefault() is not allowed to work otherwise
    }
  }

  handleButtonClick() {
    this.handleSubmit(new Event('submit', { cancelable: true }));
  }

  appendMessage(text, author, date) {
    const arr = this.state.messageArray;
    arr.push(<MessageItem number={arr.length} text={text} author={author} date={date || (new Date())} />);
  }

    render() {
        return (
            <div className="message-form-wrap">
                <div className="message-form-head">
                    <MessageFormTop name={this.props.name} />
                </div>
                <div className="wrap-history">
                    <MessageHistory chatName={this.props.name} messageArray={this.state.messageArray} />
                </div>
                <div className="message-sending-form">
                    <form className="message-form"
                    onSubmit={this.handleSubmit.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}>
                        <MessageFormInput
                        name="message-text"
                        placeholder={chatDefaults.messageInputText}
                        value={this.state.input}
                        onChange={this.handleChange.bind(this)}>
                        </MessageFormInput>
                    </form>
                    <button className="message-button" type="submit" onClick={this.handleButtonClick.bind(this)}>
                        {chatDefaults.sendMessageText}
                    </button>
                </div>
            </div>
        );
    }
}
