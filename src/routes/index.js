import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import mainContainer from 'containers/mainContainer';
import chatDisplayContainer from 'containers/chatDisplayContainer';
import chatDefaults from '../chatDefaults';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
    this.state = JSON.parse(localStorage.getItem(chatDefaults.appName));
  }

  renderMain(props) {
    const { chatArray } = this.state;
    return <mainContainer />;
  }

  renderChat(props) {
    const { chatArray } = this.state;
    const { id } = props;
    return <chatDisplayContainer chatArray={chatArray} chat_id={id} />;
  }

  render() {
    return (
      <Router history={this.history}>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <Switch>
          <Route exact path="/" render={this.renderMain} />
          <Route path="/chat/:id" render={this.chatDisplayContainer} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
