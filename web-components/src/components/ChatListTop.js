import chatDefaults from '../chatDefaults';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        .chat-top-area {
            font: 12pt bold;
            border: 1px solid black;
            background-color: #0000ff;
            width: 100%;
            height: calc(100% - 6px);
            margin-top: 2px;
            text-align: center;
            display: flex;
            flex-direction: row;
        }
        #top-name {
            color: white;
            margin-left: 4px;
        }

        div button {
            background-color: #0000ff;
            border: none;
            height: 100%;
            width: 60px;
        }

        button img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    </style>
    <div class="chat-top-area">
        <button type="button" onclick=""><img src="./images/bars.png"></img></button>
        <p id="top-name"></p>
    </div>
`;

export default class ChatListTop extends HTMLElement {
  constructor() {
    super();
    /* this.shadowRoot = */this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$name = this.shadowRoot.querySelector('#top-name');
    this.$name.textContent = chatDefaults.authorName; // default for now
  }

  setName(name) {
    this.$name.textContent = name;
  }
}

customElements.define('chat-list-top', ChatListTop);
