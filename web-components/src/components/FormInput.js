const template = document.createElement('template');
template.innerHTML = `
    <style>
        input {
            border: 0;
            outline: none;
            width: calc(100% - 2px);
        }

        :host {
            display: inherit;
            height: 100%;
            border: 1px solid rgba(25, 25, 25, 0.32);
            margin-bottom: 1px;
        }
    </style>
    <input type="text">
`;

class FormInput extends HTMLElement {
    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$input = this.shadowRoot.querySelector('input');
    }

    static get observedAttributes() {
        return ['name', 'value', 'placeholder', 'disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.$input.setAttribute(name, newValue);
    }

    get value() {
        let val = this.$input.value;
        this.$input.value = "";  //resets the form without reloading the page
        return val;  //as a side effect, one-use retrieval is accidentally enforced
    }
}

customElements.define('form-input', FormInput);
