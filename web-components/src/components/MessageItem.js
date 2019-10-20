import chatDefaults from '../chatDefaults';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        div {
            border: 2px solid black;
            background-color: #05ffb0;
            margin-bottom: 2px;
            margin-top: 2px;
            width: 85%;
            position: relative;
            left: calc(15% - 4px);
        }

        .message-item-text {
            font: 12pt bold;
        }

        .message-item-date {
            font: 8pt italic;
            text-align: right;
        }

        .message-item-author {
            font: 8pt normal;
            text-align: right;
        }


    </style>
    <div>
        <p class="message-item-text"></p>
        <p class="message-item-author"></p>
        <p class="message-item-date"></p>
    </div>
`;

export default class MessageItem extends HTMLElement {
  constructor() {
    super();
    /* this.shadowRoot = */this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$text = this.shadowRoot.querySelector('.message-item-text');
    this.$author = this.shadowRoot.querySelector('.message-item-author');
    this.$date = this.shadowRoot.querySelector('.message-item-date');
    this.previous = null;
  }

  formulate(date, text, author) {
    // make the message item itself; really, what is it with constructor arguments!?
    this.date = date; // Date object
    this.text = `${text}`; // string
    this.author = `${author || chatDefaults.authorName}`;
    this.previous = null; // not set when creating the message; set by external list manipulations
    this.$text.innerText = this.text; // note: see about not storing text and date twice
    this.$date.innerText = `${this.date}`;
    this.$author.innerText = this.author;
    // this.store(); // not used this way; see infinite loop with MessageHistory.recreate()
  }

  setPrevious(head) {
    this.previous = head;
  }

  store(chatName) { // store the message in localStorage
    const name = chatName || chatDefaults.firstChatName;
    const lsKey = `messages_${name}`;
    /*    const { author } = this;
    const { text } = this;
    const date = this.date.getTime(); */
    const itemString = this.makeString();
    const lsString = localStorage.getItem(lsKey);
    const newString = (lsString === null) ? `${itemString}` : `${lsString}${itemString}`;
    localStorage.setItem(lsKey, newString);
    // newer messages at the end, for linear-time list assembly (see MessageHistory.recreate());
    // displaying is not done message-by-message anyway
  }

  add(message) { // add to the list, ordered by date
    const { date } = message;
    let current = this;
    if (date > current.date) {
      message.setPrevious(current);
      return message; // new list head
    }
    while ((current.previous !== null) && (date < current.previous.date)) {
      current = current.previous;
      // after this, date is guaranteed to be before current.date,
      // with either current.previous === null or current.previous.date before date;
      // either case, message must be inserted between current and current.previous
    }
    message.setPrevious(current.previous);
    current.setPrevious(message);
    return this; // as long as the new message is not the last
  }

  makeString() { // make string form of the message for localStorage
    const { author } = this;
    const { text } = this;
    const date = this.date.getTime();
    const subString = `${date}|${author.length}|${text.length}|${author}|${text}|`;
    // so date is stored in milliseconds; "|" is a separator for parsing
    return `${subString.length}|${subString}`;
  }

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
    this.formulate(new Date(dateMillis), text, author);
    //    return this;
  }
}

customElements.define('message-item', MessageItem);
