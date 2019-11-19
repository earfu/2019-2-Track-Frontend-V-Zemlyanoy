import React from 'react';
import { render } from 'react-dom';
//import { Provider } from 'react-redux';
//import store from './store';
import Routes from './routes';

import './styles/globalStyles.css';
import './styles/chatContainerTopStyles.css';
import './styles/chatCreationStyles.css';
import './styles/chatItemStyles.css';
import './styles/chatListContainerStyles.css';
import './styles/messageFormComponentStyles.css';
import './styles/messageFormTopStyles.css';
import './styles/messageItemStyles.css';
import './styles/containerStyles.css';
import './styles/profileStyles.css';

import * as serviceWorker from './utils/serviceWorker';
//import chatDefaults from './chatDefaults';

render(<Routes />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
