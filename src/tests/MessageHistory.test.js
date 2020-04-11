import React from 'react';
import renderer from 'react-test-renderer';
import MessageHistory from '../components/MessageHistory';

function messageFactory(messageArray) {
  const len = messageArray.length;
  const item = {
    id: len,
    user__username: `author_${len}`,
    content: `Message ${len} text content`,
    added_at: new Date(1000000 + 10000 * len).toLocaleString(),
  };
  return item;
}

it('renders correctly', () => {
  const messageArray = [];
  for (let i = 0; i < 10; i += 1) {
    messageArray.push(messageFactory(messageArray));
  }

  const component = renderer
    .create(<MessageHistory messageArray={messageArray} />)
    .toJSON();
  // empty function used; a warning here is fine, function calls are tested in Storybook
  expect(component).toMatchSnapshot();
});
