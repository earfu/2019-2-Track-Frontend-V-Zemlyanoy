import chatDefaults from '../chatDefaults';
import { nodesLinks } from '../nodesLinks';

function deactivate() {
  const cont = nodesLinks.appContainer;
  const lst = nodesLinks.chatListContainer;
  const frm = cont.querySelector('message-form');
  cont.removeChild(frm);
  cont.append(lst);
}

const template = document.createElement('template');
template.innerHTML = `
    <style>
        .top-area {
            font: 12pt bold;
            border: 1px solid black;
            background-color: #0000ff;
            width: 100%;
            height: calc(100% - 6px);
            margin-top: 2px;
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-items: flex-start;
        }
        #top-name {
            color: white;
        }
        button.deactivation {
            background-color: #0000ff;
            border: none;
            height: 100%;
            width: 60px;
            font-size: 16pt;

        }

        button img {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <div class="top-area">
        <button class="deactivation" type="button" onclick=""><i class="fa fa-chevron-left"></i></button>

        <p id="top-name"></p>
    </div>
`;

export default class MessageFormTop extends HTMLElement {
  constructor() {
    super();
    /* this.shadowRoot = */this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$name = this.shadowRoot.querySelector('#top-name');
    this.$button = this.shadowRoot.querySelector('.deactivation');

    this.$button.addEventListener('click', deactivate.bind(this));


    this.setName(chatDefaults.firstChatName); // default at creation
  }

  setName(name) {
    this.$name.textContent = name;
  }
}


customElements.define('message-form-top', MessageFormTop);
