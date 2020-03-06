import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import renderer from 'react-test-renderer';
import Profile from '../components/Profile';

// the router is needed because Link should not be used outside it
// history is required for the Router

function renderProfile() {
  return (
    <Profile
      user={{
        username: 'username',
        fullName: 'User Full Name',
        bio: 'Here the user wanted to tell us something about themselves',
      }}
      updateProfile={null}
    />
  );
}

it('renders correctly', () => {
  const component = renderer
    .create(
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path="/profile" render={renderProfile} />
          <Route path="/" render={null} />
        </Switch>
      </Router>,
    )
    .toJSON();
  // empty function used; a warning here is fine, function calls are tested in Storybook
  expect(component).toMatchSnapshot();
});
