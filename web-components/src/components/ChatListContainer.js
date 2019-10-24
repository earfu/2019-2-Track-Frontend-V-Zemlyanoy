// import chatDefaults from '../chatDefaults';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        div.chat-list-area {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }

        div.wrap-chat-list { /* necessary for scrolling */
            height: 85%;
            min-height: 0;
            overflow: auto;
        }

        .chat-list-head {
        /* note: find a way to actually attach it to the top */
            vertical-align: top;
            width: 100%;
            height: 15%;
        }

        chat-list {
            height: 100%;
            width: 100%;
            vertical-align: top;
        }

        .chat-creation {
            background-color: #ffffcc;
            border: none;
            margin-right: 10%;
            margin-bottom: 4px;
            position: sticky;
            bottom: 0;
            float: right;
            align-self: flex-end;
            display: flex;
            flex-direction: row;
            justify-items: flex-end;
        }

        button.chat-create {
            background-color: #ffffcc;
            border: none;
            border-radius: 50%;
            height: 50px;
            width: 50px;
            font-size: 18pt;
        }

        button.chat-create:hover {
            background-color: #ffff00;
        }

        form {
            height: 50px;
        }

    </style>
    <div class="chat-list-area">
        <div class="chat-list-head">
        </div>
        <div class="wrap-chat-list">
            <div class="chat-creation">
                <form>
                    <chat-creation-input name="chat-creation-name" placeholder="Введите название">
                    </chat-creation-input>
                </form>
                <button class="chat-create" type="submit" onclick="">+</button>
            </div>
        </div>




    </div>
`;

export default class ChatListContainer extends HTMLElement {
  constructor() {
    super();
    /* this.shadowRoot = */this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$chatCreate = this.shadowRoot.querySelector('.chat-create');

    this.$form = this.shadowRoot.querySelector('form');
    this.$input = this.shadowRoot.querySelector('chat-creation-input');

    this.$top = document.createElement('chat-list-top');
    this.shadowRoot.querySelector('.chat-list-head').prepend(this.$top);

    this.$chatList = document.createElement('chat-list');
    this.shadowRoot.querySelector('.wrap-chat-list').prepend(this.$chatList);

    this.$chatCreate.$source = this; // backwards link
    this.$form.addEventListener('submit', this.onSubmit.bind(this));
    this.$form.addEventListener('keypress', this.onKeyPress.bind(this));
    this.$chatCreate.onclick = this.onClickCreate;
  }

  onSubmit(event) {
    event.preventDefault();
    // note: Firefox ignores this unless specifically allowed; see _onKeyPress below
    const chtName = this.$input.value;
    if (chtName === '') { // no empty chat names
      return;
    }

    const chats = this.$chatList.$chatsArea.children;
    for (let i = 0; i < chats.length; i += 1) {
      if (chats[i].name === chtName) { // no repeating chat names
        chats[i].scrollIntoView(false); // bump; should have some way of highlighting too
        return;
      }
    }

    const cht = document.createElement('chat-item'); // create new message-item
    cht.formulate(chtName);
    this.$input.reset();
    cht.store();
    this.$chatList.append(cht);
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit', { cancelable: true }));
      // cancelable: true is needed for Firefox
      // preventDefault() is not allowed to work otherwise
    }
  }

  onClickCreate() {
    this.$source.$form.dispatchEvent(new Event('submit', { cancelable: true }));
  }
}

customElements.define('chat-list-container', ChatListContainer);
