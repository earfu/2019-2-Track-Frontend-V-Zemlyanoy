const template = document.createElement('template');
template.innerHTML = `
    <style>
        .message-area {
            font: 12pt bold;
        }
    </style>
    <div class="message-area"></div>
`;

class MessageHistory extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$messageArea = this._shadowRoot.querySelector('.message-area');
        this._head = null;
        this.recreate();
    }

    recreate() {  //read all the localStorage and form the message list
        this._head = null;  //full reset
        for (var i = 0; i < localStorage.length; i++) {
            var msgString = localStorage.getItem(i);
            var msgSep1 = msgString.indexOf("|");  //position of the first "|" separator
            var msgDate = new Date(Number.parseInt(msgString.slice(0, msgSep1)));
            var msgSep2 = msgString.indexOf("|", msgSep1 + 1);
            var msgAuthor = msgString.slice(msgSep1 + 1, msgSep2);
            var msgText = msgString.slice(msgSep2 + 1);
            var msg = document.createElement('message-item');
            msg.formulate(msgDate, msgText, msgAuthor, null);
            //note: watch out for calling msg.store() in any way
            //results in an infinite loop
            this.append(msg);
        }
    }

    append(msg) {  //append a message to the history
        //note: no using msg.store() as long as this function is used in recreate()
        msg._previous = this._head;
        this._head = msg;
        this.$messageArea.append(msg);
    }

}

customElements.define('message-history', MessageHistory);
