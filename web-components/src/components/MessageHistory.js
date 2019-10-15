const template = document.createElement('template');
template.innerHTML = `
    <style>
        .message-area {
            font: 12pt bold;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
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

  recreate(chatName) { // clear history, read the localStorage, form the message list, append list
    this.clear(); // full reset; clearing is also done in writeList(), though
    const name = `${chatName || "No_name"}`;
    const lsKey = `messages_${name}`;
    const lsString = localStorage.getItem(lsKey); // the messages stored
    if (lsString === null) {
        return;
    }

    let messageList = null;
    let pos = 0;
    const len = lsString.length;
    let sep1 = 0;
    let msgLength = 0;
    while (pos < len) {
        sep1 = lsString.indexOf('|', pos);
        msgLength = Number.parseInt(lsString.slice(pos, sep1));
        msgString = lsString.slice(pos, sep1 + msgLength + 1);
        let msg = document.createElement('message-item');
        msg.fromString(msgString);
        messageList = (messageList === null) ? msg : messageList.add(msg);
        // can change list head; also must watch out for list being a null
        pos = sep1 + msgLength + 1;
        //this list is assembled in linear time, assuming older messages at start
    }

    this.writeList(messageList);
  }

  append(msg) { // append a message to the history
    // note: no using msg.store() as long as this function is used in recreate()
    msg.setPrevious(this.head);
    this.head = msg;
    this.$messageArea.append(msg);
  }

  writeList(listHead) { // write a full list from the head (i.e., end), overwriting past history
    this.clear(); // remove everything
    let current = listHead;
    const msgArea = this.$messageArea;
    while (current.previous !== null) {
        msgArea.prepend(current);
        // assumes none of the messages already in the history
        current = current.previous;
    }
    msgArea.prepend(current);
    // at present, see no reason to append list to non-empty history;
    // still, the function does work in that case too
    this.head = listHead;
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
        let temp = current.previous;
        firstHead = firstHead.add(current);
        current = temp; // current.previous may be changed by adding
    }

    this.writeList(firstHead); // to display messages in order
  }

  clear() {
    const msgArea = this.$messageArea;
    const messages = msgArea.children;
    let msgArray = [];
    for (let i = 0; i < messages.length; i += 1) {
        msgArray[i] = messages[i];
    }
    for (i = 0; i < msgArray.length; i += 1) {
        msgArea.removeChild(msgArray[i]);
    }
    // no direct looping through messages,
    // as the collection itself is affected by removals
    this.head = null;
  }
}

customElements.define('message-history', MessageHistory);
