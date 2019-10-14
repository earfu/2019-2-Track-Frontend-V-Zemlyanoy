const template = document.createElement('template');
template.innerHTML = `
    <style>
        .message-area {
            font: 12pt bold;
            display: flex;
            flex-direction: column;
        }
    </style>
    <div class="message-area"></div>
`;

class MessageHistory extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$messageArea = this.shadowRoot.querySelector('.message-area');
    this.head = null;
    this.recreate();
  }

  recreate() { // read all the localStorage and form the message list
    this.head = null; // full reset
    for (let i = 0; i < localStorage.length; i += 1) {
      const msgString = localStorage.getItem(i);
      const msgSep1 = msgString.indexOf('|'); // position of the first "|" separator
      const msgDate = new Date(Number.parseInt(msgString.slice(0, msgSep1), 10));
      const msgSep2 = msgString.indexOf('|', msgSep1 + 1);
      const msgAuthor = msgString.slice(msgSep1 + 1, msgSep2);
      const msgText = msgString.slice(msgSep2 + 1);
      const msg = document.createElement('message-item');
      msg.formulate(msgDate, msgText, msgAuthor);
      // note: watch out for calling msg.store() in any way
      // results in an infinite loop
      this.append(msg);
    }
  }

  append(msg) { // append a message to the history
    // note: no using msg.store() as long as this function is used in recreate()
    msg.setPrevious(this.head);
    this.head = msg;
    this.$messageArea.append(msg);
  }
}

customElements.define('message-history', MessageHistory);
