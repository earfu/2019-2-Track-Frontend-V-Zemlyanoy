import React from 'react'
import chatDefaults from '../chatDefaults';

export default class MessageHistory extends React.Component {


  fromString(msgString) { // recreate message from its string form
    const sep1 = msgString.indexOf('|'); // first separator
    const sep2 = msgString.indexOf('|', sep1 + 1);
    const sep3 = msgString.indexOf('|', sep2 + 1);
    const sep4 = msgString.indexOf('|', sep3 + 1);
    //    const subLength = Number.parseInt(msgString.slice(0, sep1));
    const dateMillis = Number.parseInt(msgString.slice(sep1 + 1, sep2), 10);
    const authorLength = Number.parseInt(msgString.slice(sep2 + 1, sep3), 10);
    const textLength = Number.parseInt(msgString.slice(sep3 + 1, sep4), 10);
    const author = msgString.slice(sep4 + 1, sep4 + authorLength + 1);
    const text = msgString.slice(sep4 + authorLength + 2, sep4 + authorLength + textLength + 2);
    this.appendMessage(text, author, new Date(dateMillis));
    //    return this;
  }

  scrollEnd() {
    const last = this.messageArray.length;
    if (last === 0) { // happens
      return;
    }
    this.messageArray[last - 1].scrollIntoView(false); // note: check scrolling
  }

  clear() {
    this.messageArray = [];
  }

  recreate() {
    this.clear(); // full reset
    const name = `${this.chatName || chatDefaults.firstChatName}`;
    const lsKey = `messages_${name}`;
    const lsString = localStorage.getItem(lsKey); // the messages stored
    if (lsString === null) {
      return;
    }

    let pos = 0;
    const len = lsString.length;
    let sep1 = 0;
    let msgLength = 0;
    while (pos < len) {
      sep1 = lsString.indexOf('|', pos);
      msgLength = Number.parseInt(lsString.slice(pos, sep1), 10);
      const msgString = lsString.slice(pos, sep1 + msgLength + 1);
      this.fromString(msgString);
      pos = sep1 + msgLength + 1;
    }

  }

    render() {
        return (
            <div className="message-history-list">
                {this.props.messageArray.map((item, index) => <li key={index}>{item}</li>)}
            </div>
        );
    }
}
