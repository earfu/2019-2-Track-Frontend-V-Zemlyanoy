{import React from 'react';
import styled from '@emotion/styled'


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
            font-size: 16pt;
        }

        button img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <div class="chat-top-area">
        <button class="bars-button" type="button" onclick=""><i class="fa fa-bars"></i></button>
        <p id="top-name"></p>
    </div>
`;

export default class ChatListTop extends HTMLElement {
  constructor() {
    super();
    /* this.shadowRoot = */this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$name = this.shadowRoot.querySelector('#top-name');
    this.$name.textContent = chatDefaults.authorName; // default at creation

    this.$button = this.shadowRoot.querySelector('.bars-button');
    // this.$button.addEventListener('click', .bind(this));
  }

  setName(name) {
    this.$name.textContent = name;
  }
}

customElements.define('chat-list-top', ChatListTop);
}

export class ChatListTop
