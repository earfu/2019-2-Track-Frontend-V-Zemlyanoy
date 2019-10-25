import chatDefaults from '../chatDefaults';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        div.central-area {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }

        div.sending-form {
            width: 100%;
            height: 15%;
            display: flex;
            align-items: stretch;
            justify-content: space-between;
        }

        div.wrap-history { /* necessary for scrolling */
            height: 70%; /* note: see about auto-scroll in MessageHistory.append() */
            min-height: 0;
            overflow: auto;
            scroll-behavior: smooth;
        }

        .form-head {
        /* note: find a way to actually attach it to the top */
            vertical-align: top;
            width: 100%;
            height: 15%;
        }

        form-input {
            width: 100%;
        }

        message-history {
            height: 100%;
            width: 100%;
            vertical-align: bottom;
        }

        div form {
            width: 80%;
        }

        div button {
            width: calc(20% - 2px);
        }

    </style>
    <div class="central-area">
        <div class="form-head">

        </div>
        <div class="wrap-history">
        </div>
        <div class="sending-form">
            <form>
                <form-input name="message-text" placeholder="${chatDefaults.messageInputText}"></form-input>
            </form>
            <button type="submit" onclick="">${chatDefaults.sendMessageText}</button>
        </div>
    </div>
`;

export default class MessageForm extends HTMLElement {
  constructor() {
    super();
    /* this.shadowRoot = */this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$form = this.shadowRoot.querySelector('form');
    // this.$message = this.shadowRoot.querySelector('.result');
    this.$button = this.shadowRoot.querySelector('button');
    this.$button.$source = this; // black magic to get the original MessageForm from its button

    this.$top = document.createElement('message-form-top');
    this.shadowRoot.querySelector('.form-head').append(this.$top);

    this.$history = document.createElement('message-history');
    this.shadowRoot.querySelector('.wrap-history').append(this.$history);

    this.$input = this.shadowRoot.querySelector('form-input');

    this.$form.addEventListener('submit', this.onSubmit.bind(this));
    this.$form.addEventListener('keypress', this.onKeyPress.bind(this));
    this.$button.onclick = this.onButtonClick;
  }

  setName(name) {
    this.name = name;
    // this.$top = this.shadowRoot.querySelector('message-form-top');
    this.$top.setName(name);
  }

  recreateHistory(name) {
    this.$history.recreate(name);
  }

  historyScrollEnd() {
    this.$history.scrollEnd();
  }

  onSubmit(event) {
    event.preventDefault();
    // note: Firefox ignores this unless specifically allowed; see _onKeyPress below
    if (this.$input.value === '') {
      return;
    }
    this.$history = this.shadowRoot.querySelector('message-history');
    const msg = document.createElement('message-item'); // create new message-item
    msg.formulate(new Date(), this.$input.value, null);
    // instead of passing them to the constructor
    this.$input.reset(); // reset the input form to clear
    msg.store(this.name); // must be done somewhere; right after creation is the policy for now
    // note to future: store() has a name argument
    // const msgHistory = this.shadowRoot.querySelector('message-history');
    this.$history.append(msg);
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit', { cancelable: true }));
      // cancelable: true is needed for Firefox
      // preventDefault() is not allowed to work otherwise
    }
  }

  onButtonClick() {
    this.$source.$form.dispatchEvent(new Event('submit', { cancelable: true }));
  } // uses backwards link from the button to the MessageFrom
}

customElements.define('message-form', MessageForm);
