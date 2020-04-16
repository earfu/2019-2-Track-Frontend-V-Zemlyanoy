import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Centrifuge from 'centrifuge';

import ChatListContainer from '../components/ChatListContainer';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import PeerChat from '../components/PeerChat';
import Profile from '../components/Profile';
// import ChatItem from '../components/ChatItem';
// import chatDefaults from '../chatDefaults';
import MessageForm from '../components/MessageForm';

// import geolocate from '../services/geolocation';
import links from '../links';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
    this.centrifuge = new Centrifuge(links.centrifuge, {
      subscribeEndpoint: links['subscribe-endpoint'],
    });
  }

  render() {
    // prefix = '2019-2-Track-Frontend-V-Zemlyanoy';
    return (
      <Router history={this.history}>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <Switch>
          <Route path="/register" render={() => <RegistrationForm />} />
          <Route path="/login" render={() => <LoginForm />} />
          <Route path="/logout" render={renderLogout} />
          <Route
            path="/webrtc"
            render={() => <PeerChat username="%username" />}
          />
          <Route path="/profile" render={() => <Profile />} />
          <Route
            path="/chats/:id"
            render={(props) => (
              <MessageForm
                chatId={Number.parseInt(props.match.params.id, 10)}
                centrifuge={this.centrifuge}
              />
            )}
          />
          <Route
            path="/"
            render={() => <ChatListContainer centrifuge={this.centrifuge} />}
          />
        </Switch>
      </Router>
    );
  }
}

function renderLogout() {
  async function getLogout() {
    await fetch(links.logout, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    }).then((res) => {
      return res.statusCode;
    });
  }
  getLogout();
  return <Redirect to={{ pathname: '/login' }} />;
}

export default Routes;
