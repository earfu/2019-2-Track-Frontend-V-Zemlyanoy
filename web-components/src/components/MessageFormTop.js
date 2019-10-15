const template = document.createElement('template');
template.innerHTML = `
    <style>
        .top-area {
            font: 12pt bold;
            border: 1px solid black;
            background-color: #0000dd;
            width: 100%;
            height: calc(100% - 6px);
            margin-top: 2px;
            text-align: center;
        }
        #top-name {
            color: white;
        }
    </style>
    <div class="top-area">
        <p id="top-name"></p>
    </div>
`;

class MessageFormTop extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$name = this.shadowRoot.querySelector('#top-name');
    this.$name.textContent = "No_name"; // default for now
  }

  setName(name) {
    this.$name.textContent = name;
  }
}

customElements.define('message-form-top', MessageFormTop);
