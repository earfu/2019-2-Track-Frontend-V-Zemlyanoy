import React from 'react';
import renderer from 'react-test-renderer';
import MessageFormInput from '../components/MessageFormInput';

it('renders correctly', () => {
  const component = renderer
    .create(
      <MessageFormInput
        value="Test message input text"
        onKeyPress={null}
        onSubmit={null}
        onChange={null}
        onButtonClick={null}
        onImageClear={null}
        onImageLoad={null}
        onAudioClear={null}
        onAudioLoad={null}
      />,
    )
    .toJSON();
  // empty function used; a warning here is fine, function calls are tested in Storybook
  expect(component).toMatchSnapshot();
});
