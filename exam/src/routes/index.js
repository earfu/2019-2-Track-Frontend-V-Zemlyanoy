import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import MainScreen from './../components/MainScreen';

class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.history = createBrowserHistory();
        this.state = { locationList: [{id: 2643743, name: 'London,UK'}] };
        this.renderMain = this.renderMain.bind(this);
        this.renderById = this.renderById.bind(this);
    }

  renderMain(props) {
    // render main screen
    //const { chatArray, user } = this.state;
    //navigator.geolocation.getCurrentPosition(locationLink, locationError);
    const { locationList } = this.state;
    return (
      <MainScreen
        locationList={locationList}
      />
    );
  }

  renderById(props) {
      const id = Number.parseInt(props.match.params.id, 10);
      const { locationList } = this.state;

      return (
        <p>Nothing to see here.</p>
        );
  }

  render() {
    return (
      <Router history={this.history}>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <Switch>
          <Route path="/id/:id" render={this.renderById} />
          <Route path="/main" render={this.renderMain} />
        </Switch>
      </Router>
  );
    }
}
export default Routes;

