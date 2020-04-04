import { emojiCodes } from '../emojiList';

function emojiToSymbol(name) {
  const code = emojiCodes[name];
  if (!code) {
    return name;
  }
  return String.fromCodePoint(code);
}

function messageTextParser(text) {
  let result = text;
  if (typeof result !== 'string') {
    // not expected to happen, but so what
    return '';
  }
  result = result.replace(/:emoji-[a-z-]+:/g, emojiToSymbol);
  // emoji names are defined internally, not expected to be anything but lowercase letters with hyphens
  return result;
}

export default messageTextParser;
