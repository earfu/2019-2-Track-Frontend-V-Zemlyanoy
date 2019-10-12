const template = document.createElement('template');
template.innerHTML = `
    <style>
        div {
            display: flex;
            align-items: stretch;
            justify-content: space-between;
        }

        form-input {
            width: 100%;
        }

        div form {
            width: 81%;
        }

        div button {
            width: 18%;
        }
    </style>
    <div>
        <form>
            <form-input name="message-text" placeholder="Введите сообщение"></form-input>
        </form>
        <button type="submit" onclick="">Send message</button>
    </div>
`;

class MessageForm extends HTMLElement {
    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$form = this._shadowRoot.querySelector('form');
        this.$input = this._shadowRoot.querySelector('form-input');
        this.$message = this._shadowRoot.querySelector('.result');
        this.$button = this._shadowRoot.querySelector('button');
        this.$button.$source = this;  //black magic to get the original MessageForm from its button

        this.$form.addEventListener('submit', this._onSubmit.bind(this));
        this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
        this.$button.onclick = this._onButtonClick;
    }

    _onSubmit (event) {
        event.preventDefault();  //note: Firefox ignores this unless specifically allowed; see _onKeyPress below
        let msg = document.createElement('message-item');  //create new message-item
        msg.formulate(new Date(), this.$input.value, null, null);  //instead of passing them to the constructor
        msg.store();  //must be done somewhere; right after creation is the policy for now
        let msgHistory = document.querySelector('message-history');
        msgHistory.append(msg);
        //this.$input.value = '';
        //return false;
    }

    _onKeyPress (event) {
        if (event.keyCode == 13) {
            this.$form.dispatchEvent(new Event('submit', { cancelable: true }));
            //cancelable: true is needed for Firefox
            //preventDefault() is not allowed to work otherwise
        }
    }

    _onButtonClick (event) {
        this.$source.$form.dispatchEvent(new Event('submit', { cancelable: true }));
    }  //uses backwards link from the button to the MessageFrom
}

customElements.define('message-form', MessageForm);
