import React from 'react';
import { render } from 'react-dom';
//import { Provider } from 'react-redux';
import './styles/globalStyles.css';
import * as serviceWorker from './utils/serviceWorker';
import MessageForm from './components/MessageForm';

render(
    <div className="app-container">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <MessageForm name='localhost' />
    </div>,
    document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
