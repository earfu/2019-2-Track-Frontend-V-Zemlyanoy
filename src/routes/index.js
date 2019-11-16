import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import MainScreenContainer from '../containers/MainScreenContainer';
import ChatDisplayContainer from '../containers/ChatDisplayContainer';
import Profile from '../components/Profile';
import ChatItem from '../components/ChatItem';
import chatDefaults from '../chatDefaults';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
    this.save = this.save.bind(this);
    this.renderChat = this.renderChat.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    const state = JSON.parse(localStorage.getItem(chatDefaults.appName));
    let { user } = state;
    if (user === undefined) {
      user = { username: chatDefaults.authorName, fullName: '', bio: '' };
    }
    this.state = { chatArray: [], user };
    if (state != null) {
      // recreate the chat array from stored data
      const { chatArray } = this.state;
      for (const chat of state.chatArray) {
        chat.props.save = this.save;
        chat.props.username = user.username;
        chatArray.push(new ChatItem(chat.props));
      }
    }
  }

  save() {
    // save current state to storage
    const lsString = JSON.stringify(this.state);
    localStorage.setItem(chatDefaults.appName, lsString);
  }

  updateProfile(user) {
    this.setState({ user });
    this.save();
  }

  renderMain(props) {
    // render main screen
    const { chatArray, user } = this.state;
    return (
      <MainScreenContainer
        chatArray={chatArray}
        save={this.save}
        username={user.username}
      />
    );
  }

  renderProfile(props) {
    // render user profile
    const { user } = this.state;
    return (
      <Profile
        user={user}
        save={this.save}
        updateProfile={this.updateProfile}
      />
    );
  }

  renderChat(props) {
    // render a chat screen
    const { chatArray } = this.state;
    const chatId = Number.parseInt(props.match.params.id, 10);
    if (Number.isNaN(chatId)) {
      return (
        <div>
          <p>Wrong chat identifier. Don&apos;t do that.</p>
          <Link to="/">Go back to main screen</Link>
        </div>
      );
    }
    const chat = chatArray[chatId];
    if (chat === undefined) {
      return (
        <div>
          <p>No such chat.</p>
          <Link to="/">Go back to main screen</Link>
        </div>
      );
    }
    return <ChatDisplayContainer chat={chat} />;
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
          <Route path="/chat/:id" render={this.renderChat} />
          <Route exact path="/profile" render={this.renderProfile} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
