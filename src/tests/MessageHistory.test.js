import React from 'react';
import renderer from 'react-test-renderer';
import MessageHistory from '../components/MessageHistory';

function messageFactory(messageArray) {
  const len = messageArray.length;
  const item = {
    number: len,
    author: `author_${len}`,
    text: `Message ${len} text content`,
    date: 1000000 + 10000 * len,
    image: null,
    audio: null,
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
