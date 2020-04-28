import React from 'react';
import renderer from 'react-test-renderer';
import MessageItem from '../components/MessageItem';

it('renders correctly', () => {
  const component = renderer
    .create(
      <MessageItem
        number={1388125}
        author="message_author"
        date={new Date(1000001)}
        text="Test message text content"
      />,
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
