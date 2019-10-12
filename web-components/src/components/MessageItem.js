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
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$text = this._shadowRoot.querySelector(".message-item-text");
        this.$author = this._shadowRoot.querySelector(".message-item-author");
        this.$date = this._shadowRoot.querySelector(".message-item-date");
        this._previous = null;

    }

    formulate(date, text, author, head) {  //make the message item itself; really, what is it with constructor arguments!?
        this._date = date;  //Date object
        this._text = text + "";  //string
        this._author = (author || "localhost") + "";
        this._previous = head;
        head = this;
        this.$text.innerText = this._text;  //note: see about not storing text and date twice
        this.$date.innerText = this._date + "";
        this.$author.innerText = this._author;
        //this.store();  //not used this way for now; see infinite loop with MessageHistory.recreate()
    }

    append(head) {  //add the message to the display list
        this._previous = head;  //do not re-display anything
        head = this;
        return head;
    }  //not used for now

    store() {  //store the message in localStorage
        var itemString = this._date.getTime() + "|" + this._author + "|" + this._text;
        //so date is stored in milliseconds; "|" is a separator for later search
        localStorage.setItem(localStorage.length, itemString);  //the only kind in storage for now
    }

}

customElements.define('message-item', MessageItem);
