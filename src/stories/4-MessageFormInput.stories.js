import React from 'react';
import { action } from '@storybook/addon-actions';
import MessageFormInput from '../components/MessageFormInput';
import '../styles/messageFormInputStyles.css';

export default { title: 'MessageFormInput' };

export const empty = () => {
  return (
    <MessageFormInput
      value=""
      onSubmit={null}
      onChange={null}
      onKeyPress={(event) => action(`pressed ${event.key}`)}
      onAudioLoad={null}
      onAudioClear={action('clicked Clear Audio button')}
      onImageLoad={null}
      onImageClear={action('clicked Clear Image button')}
      onButtonClick={action('clicked Send Message button')}
    />
  );
};

export const withText = () => {
  return (
    <MessageFormInput
      value="Sample message text content"
      onSubmit={null}
      onChange={null}
      onKeyPress={(event) => action(`pressed ${event.key}`)}
      onAudioLoad={null}
      onAudioClear={action('clicked Clear Audio button')}
      onImageLoad={null}
      onImageClear={action('clicked Clear Image button')}
      onButtonClick={action('clicked Send Message button')}
    />
  );
};
