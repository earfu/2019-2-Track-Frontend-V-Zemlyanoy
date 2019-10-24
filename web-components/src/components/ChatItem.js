import chatDefaults from '../chatDefaults';
import { nodesLinks } from '../nodesLinks';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        div.chat-list-item {
            border: 1px solid black;
            background-color: #0000bb;
            width: calc(100% - 4px);
            display: flex;
            flex-direction: row;
            transition: background-color 1s ease 0s;
        }

        div.chat-list-item:hover {
            background-color: #0000ff;
        }

        .chat-item-name {
            font: 12pt bold;
            color: white;
        }

    </style>
    <div class="chat-list-item">
        <div class="chat-item-text">
            <p class="chat-item-name"></p>
        </div>
    </div>
`;

export default class ChatItem extends HTMLElement {
  constructor() {
    super();
    /* this.shadowRoot = */this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$area = this.shadowRoot.querySelector('.chat-list-item');
    this.$chatName = this.shadowRoot.querySelector('.chat-item-name');
    // this.$messageForm = document.createElement('message-form');
    // this.$messageHistory = this.$messageForm.shadowRoot.querySelector('message-history');

    this.icon = null;
    this.name = '';
    this.state = 0;
    this.next = null;
    this.previous = null;

    this.$area.addEventListener('click', this.activate.bind(this));
  }

  formulate(name) {
    this.name = name || chatDefaults.firstChatName;
    this.$chatName.innerText = this.name;
    this.$messageForm = document.createElement('message-form');
    this.$messageForm.setName(this.name);
    this.$messageForm.recreateHistory(name);
  }

  add(cht) {
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

  makeString() { // make string form for storage
    const { name } = this;
    return `${name.length + 1}|${name}|`; // the +1 accounts for the last separator
  }

  fromString(chtString) { // recreate from string form
    const sep = chtString.indexOf('|'); // separator
    const chtName = chtString.slice(sep + 1, -1);
    this.formulate(chtName);
  }

  store() { // note: can cause duplicates; should be used only full-list and on creation
    const itemString = this.makeString();
    const lsString = localStorage.getItem('chats');
    const newString = (lsString === null) ? `${itemString}` : `${lsString}${itemString}`;
    localStorage.setItem('chats', newString);
  }

  activate() {
    const newForm = this.$messageForm;
    if (!newForm) {
      this.$messageForm = document.createElement('message-form');
      this.$messageForm.setName(this.name);
      // this.$messageHistory = this.$messageForm.shadowRoot.querySelector('message-history');
      // const msgHist = document.createElement('message-history');
      // msgHist.recreate(this.name);
      // this.$messageHistory.replaceWith(msgHist);
      // this.$messageHistory = msgHist;
      // this.$messageHistory.recreate(this.name);
      this.$messageForm.recreateHistory(this.name);
    }

    nodesLinks.appContainer.removeChild(nodesLinks.chatListContainer);

    nodesLinks.appContainer.append(this.$messageForm);
    this.$messageForm.historyScrollEnd();


    /* const frmArea = document.querySelector('.message-area');
    const frm = frmArea.querySelector('message-form');
    //this.$messageForm.setName(this.name);
    frmArea.replaceChild(this.$messageForm, frm);
    this.$messageForm.historyScrollEnd(); */
  }
}

customElements.define('chat-item', ChatItem);
