import React from 'react';
import renderer from 'react-test-renderer';
import MessageFormInput from '../components/MessageFormInput';

it('renders correctly', () => {
  const component = renderer
    .create(
      <MessageFormInput
        value="Test message input text"
        onKeyPress={() => {}}
        onSubmit={() => {}}
        onChange={() => {}}
        onButtonClick={() => {}}
        onImageClear={() => {}}
        onImageLoad={() => {}}
        onAudioClear={() => {}}
        onAudioLoad={() => {}}
      />,
    )
    .toJSON();
  // empty function used; a warning here is fine, function calls are tested in Storybook
  expect(component).toMatchSnapshot();
});
