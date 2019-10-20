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

  recreate() { // clear history, read the localStorage, form the message list, append list
    this.clear(); // full reset; clearing is also done in writeList(), though

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
      // chtList = (chtList === null) ? cht : chtList.append(cht);
      // can change list head; also must watch out for list being a null
      pos = sep1 + chtLength + 1;
      this.append(cht);
    }

    // this.writeList(messageList);
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

  /*  writeList(listHead) { // write a full list from the head (i.e., end), overwriting past history
    this.clear(); // remove everything
    let current = listHead;
    const msgArea = this.$messageArea;
    while (current.previous !== null) {
      msgArea.prepend(current);
      current = current.previous;
    }
    msgArea.prepend(current);
    this.head = listHead;
    listHead.scrollIntoView(false); // set starting position at the newest
  }

  addList(listHead) { // for merging histories in date order
    let firstHead = this.head; // head of the list added to (i.e., the one already in the history)
    if (firstHead === null) { // as long as added list is in order; sort it here?
    // the MessageItem class currently has no methods for assembling lists without date-ordering;
    // MessageHistory does, however
      this.writeList(listHead);
      return;
    }
    let current = listHead;
    while (current !== null) {
      const temp = current.previous;
      firstHead = firstHead.add(current);
      current = temp; // current.previous may be changed by adding
    }

    this.writeList(firstHead); // to display messages in order
  }
*/
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
    // no direct looping through messages,
    // as the collection itself is affected by removals
    this.start = null;
    this.end = null;
  }
}

customElements.define('chat-list', ChatList);
