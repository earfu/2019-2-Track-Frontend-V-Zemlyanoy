import React from 'react';
import renderer from 'react-test-renderer';
import ChatCreationInput from '../components/ChatCreationInput';

it('renders correctly', () => {
  const component = renderer
    .create(
      <ChatCreationInput
        value="Test chat creation input text"
        onKeyPress={null}
        onSubmit={null}
        onChange={null}
      />,
    )
    .toJSON();
  // empty function used; a warning here is fine, function calls are tested in Storybook
  expect(component).toMatchSnapshot();
});
