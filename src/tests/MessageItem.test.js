import React from 'react';
import renderer from 'react-test-renderer';
import MessageItem from '../components/MessageItem';

it('renders correctly', () => {
  const component = renderer
    .create(
      <MessageItem
        number={1388125}
        author="message_author"
        date={1000001}
        text="Test message text content"
        audio={null}
        image={null}
      />,
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
