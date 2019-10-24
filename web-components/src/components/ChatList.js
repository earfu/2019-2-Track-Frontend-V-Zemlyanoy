const template = document.createElement('template');
template.innerHTML = `
    <style>
        .chats-area {
            font: 12pt bold;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            clear: none;
        }
    </style>
    <div class="chats-area"></div>
`;


export default class ChatList extends HTMLElement {
  constructor() {
    super();
    /* this.shadowRoot = */this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$chatsArea = this.shadowRoot.querySelector('.chats-area');
    this.start = null;
    this.end = null;
    this.recreate();
  }

  recreate() { // clear history, read the localStorage, form the chat list
    this.clear(); // full reset

    const first = document.createElement('chat-item');
    first.formulate();
    this.append(first);

    const lsString = localStorage.getItem('chats');
    if (lsString === null) {
      return;
    }

    // let chtList = null;
    let pos = 0;
    const len = lsString.length;
    let sep1 = 0;
    let chtLength = 0;
    while (pos < len) {
      sep1 = lsString.indexOf('|', pos);
      chtLength = Number.parseInt(lsString.slice(pos, sep1), 10);
      const chtString = lsString.slice(pos, sep1 + chtLength + 1);
      const cht = document.createElement('chat-item');
      cht.fromString(chtString);
      pos = sep1 + chtLength + 1;
      this.append(cht);
    }
  }

  append(cht) { // append a ChatItem
    if (this.start === null) {
      this.start = cht;
    } else {
      this.end.setNext(cht);
      cht.setPrevious(this.end);
    }
    this.end = cht;
    this.$chatsArea.append(cht);
    cht.scrollIntoView(false);
  }

  clear() {
    const chatsArea = this.$chatsArea;
    const chats = chatsArea.children;
    const chtArray = [];
    for (let i = 0; i < chats.length; i += 1) {
      chtArray[i] = chats[i];
    }
    for (let i = 0; i < chtArray.length; i += 1) {
      chatsArea.removeChild(chtArray[i]);
    }
    // no direct looping through chats,
    // as the collection itself is affected by removals
    this.start = null;
    this.end = null;
  }
}

customElements.define('chat-list', ChatList);
