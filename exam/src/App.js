import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import { render } from 'react-dom';
//import { Provider } from 'react-redux';
//import store from './store';
import Routes from './routes';
import './styles/globalStyles.css';
//import * as serviceWorker from './utils/serviceWorker';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

/*render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('root'),
);*/
function App() {
    return render(
        <Routes />,
        document.getElementById('root'),
    );
}
export default App;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

