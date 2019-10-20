import './index.css';

// babel in webPack reorders imports
import './chatDefaults';
import { makeLinks } from './nodesLinks';
import './components/MessageItem';
import './components/MessageHistory';
import './components/MessageFormTop';

import './components/FormInput';
import './components/MessageForm';

import './components/ChatItem';
import './components/ChatList';
import './components/ChatListTop';
import './components/ChatCreationInput';
import './components/ChatListContainer';

makeLinks();

/*
let a = new MessageItem();
a = new MessageHistory();
a = new MessageFormTop();
a = new FormInput();
a = new MessageForm();
a = new ChatItem();
a = new ChatList();
a = new ChatListTop();
a = new ChatCreationInput();
a = new ChatListContainer();
*/
/*
customElements.define('message-item', MessageItem);
customElements.define('message-history', MessageHistory);
customElements.define('message-form-top', MessageFormTop);
customElements.define('form-input', FormInput);
customElements.define('message-form', MessageForm);
customElements.define('chat-item', ChatItem);
customElements.define('chat-list', ChatList);
customElements.define('chat-list-top', ChatListTop);
customElements.define('chat-creation-input', ChatCreationInput);
customElements.define('chat-list-container', ChatListContainer);
*/
/* [
        './index.js',
        './components/MessageItem',
        './components/MessageHistory',
        './components/MessageFormTop',
        './components/FormInput',
        './components/MessageForm',
        './components/ChatItem',
        './components/ChatList',
        './components/ChatListTop',
        './components/ChatCreationInput',
        './components/ChatListContainer',

    ] */
