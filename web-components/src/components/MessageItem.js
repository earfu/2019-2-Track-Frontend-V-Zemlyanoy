const template = document.createElement('template');
template.innerHTML = `
    <style>
        div {
            border: 2px solid black;
            background-color: #05ffb0;
            margin-bottom: 2px;
            margin-top: 2px;
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

class MessageItem extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
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
    this.author = `${author || 'localhost'}`;
    this.previous = null;
    this.$text.innerText = this.text; // note: see about not storing text and date twice
    this.$date.innerText = `${this.date}`;
    this.$author.innerText = this.author;
    // this.store(); // not used this way for now; see infinite loop with MessageHistory.recreate()
  }

  setPrevious(head) {
    this.previous = head;
  }

  store() { // store the message in localStorage
    const itemString = `${this.date.getTime()}|${this.author}|${this.text}`;
    // so date is stored in milliseconds; "|" is a separator for later search
    localStorage.setItem(localStorage.length, itemString); // the only kind in storage for now
  }
}

customElements.define('message-item', MessageItem);
