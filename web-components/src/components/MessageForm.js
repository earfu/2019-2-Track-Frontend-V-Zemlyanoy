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
            height: 70%; /* note: find a way to follow to the end? */
            min-height: 0;
            overflow: auto;
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
            <message-form-top>
            </message-form-top>
        </div>
        <div class="wrap-history">
            <message-history></message-history>
        </div>
        <div class="sending-form">
            <form>
                <form-input name="message-text" placeholder="Введите сообщение"></form-input>
            </form>
            <button type="submit" onclick="">Send message</button>
        </div>
    </div>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$form = this.shadowRoot.querySelector('form');
    this.$input = this.shadowRoot.querySelector('form-input');
    this.$message = this.shadowRoot.querySelector('.result');
    this.$button = this.shadowRoot.querySelector('button');
    this.$button.$source = this; // black magic to get the original MessageForm from its button

    this.$form.addEventListener('submit', this.onSubmit.bind(this));
    this.$form.addEventListener('keypress', this.onKeyPress.bind(this));
    this.$button.onclick = this.onButtonClick;
  }

  onSubmit(event) {
    event.preventDefault();
    // note: Firefox ignores this unless specifically allowed; see _onKeyPress below
    const msg = document.createElement('message-item'); // create new message-item
    msg.formulate(new Date(), this.$input.value, null);
    // instead of passing them to the constructor
    this.$input.reset(); // reset the input form to clear
    msg.store(null); // must be done somewhere; right after creation is the policy for now
    // note to future: store() has a name argument
    const msgHistory = this.shadowRoot.querySelector('message-history');
    msgHistory.append(msg);
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
