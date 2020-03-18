import React from 'react';
import renderer from 'react-test-renderer';
import ChatListTop from '../components/ChatListTop';

it('renders correctly', () => {
  const component = renderer
    .create(<ChatListTop name="username" onOpenMenu={() => {}} />)
    .toJSON();
  // empty function used; a warning here is fine, function calls are tested in Storybook
  expect(component).toMatchSnapshot();
});
