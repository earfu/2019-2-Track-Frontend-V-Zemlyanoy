const template = document.createElement('template');
template.innerHTML = `
    <style>
        div.chat-list-item {
            border: 1px solid black;
            background-color: #0000bb;
            width: 100%;
            display: flex;
            flex-direction: row;
        }

        .chat-item-name {
            font: 12pt bold;
            font-color: white;
        }



    </style>
    <div class="chat-list-item">
        <div class="chat-item-text">
            <p class="chat-item-name"></p>
           /* <p class="chat-item-snip"></p>
            <class="chat-item-state"> */
        </div>
    </div>
`;

class ChatItem extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$chatName = this.shadowRoot.querySelector('.chat-item-name');

    this.icon = null;
    this.name = '';
    this.state = undefined;
    this.next = null;
    this.previous = null;
  }

  formulate(name) {
    this.name = name || 'No_name';
   // this.$messageForm = document.createElement('message-form');
   // this.$messageForm.$history.recreate(name);
  }

  append(cht) {
    cht.setNext(this.next);
    cht.setPrevious(this);
    this.setNext(cht);
  }

  setNext(head) {
    this.next = head;
  }

  setPrevious(head) {
    this.previous = head;
  }

  makeString() {
    const {name} = this;
    return `${name.length}|${name}|`;
  }

  fromString(chtString) {
    const sep = chtString.indexOf('|'); // separator
    const chtName = chtString.slice(sep, -1);
    this.formulate(chtName);
  }

  store() { // note: can cause duplicates; should be used only full-list and on creation
    const itemString = this.makeString();
    const lsString = localStorage.getItem('chats');
    const newString = (lsString === null) ? `${itemString}` : `${lsString}${itemString}`;
    localStorage.setItem('chats', newString);
  }

}

customElements.define('chat-item', ChatItem);
