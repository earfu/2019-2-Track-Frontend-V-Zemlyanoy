import React from 'react';
import renderer from 'react-test-renderer';
import MessageItem from '../components/MessageItem';

const trueDtLS = Date.toLocaleString;
const trueDtGS = Date.toGMTString;

beforeEach(() => {
  Date.toLocaleString = Date.toGMTString;
});

afterEach(() => {
  Date.toLocaleString = trueDtLS;
});

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
  // empty function used; a warning here is fine, function calls are tested in Storybook
  expect(component).toMatchSnapshot();
});
