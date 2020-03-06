import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import renderer from 'react-test-renderer';
import MessageFormTop from '../components/MessageFormTop';

// the router is needed because Link should not be used outside it
// history is required for the Router

function renderTop() {
  return <MessageFormTop name="This chat's name" />;
}

it('renders correctly', () => {
  const component = renderer
    .create(
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path="/chats/1" render={renderTop} />
          <Route path="/" render={null} />
        </Switch>
      </Router>,
    )
    .toJSON();
  // empty function used; a warning here is fine, function calls are tested in Storybook
  expect(component).toMatchSnapshot();
});
