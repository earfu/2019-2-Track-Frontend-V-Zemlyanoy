const template = document.createElement('template');
template.innerHTML = `
    <style>
        input {
            border: 0;
            outline: none;
            width: calc(100% - 2px);
            background-color: #ffffcc;
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

export default class ChatCreationInput extends HTMLElement {
  constructor() {
    super();
    /*this.shadowRoot = */this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$input = this.shadowRoot.querySelector('input');
  }

  static get observedAttributes() {
    return ['name', 'value', 'placeholder', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.$input.setAttribute(name, newValue);
  }

  get value() {
    return this.$input.value;
  }

  reset() {
    this.$input.value = ''; // resets the form without reloading the page
  }
}

customElements.define('chat-creation-input', ChatCreationInput);
