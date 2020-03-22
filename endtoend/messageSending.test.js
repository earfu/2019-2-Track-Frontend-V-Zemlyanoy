import 'expect-puppeteer';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import chatDefaults from './../src/chatDefaults';

describe('A user creating a chat and sending a message', () => {
  // because a new client won't have a chat to begin with
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:3000/2019-2-Track-Frontend-V-Zemlyanoy');
  });

  it('should display the page, to start with', async () => {
    await expect(page).toMatch(chatDefaults.authorName); // because nobody even changed the page name
  });

  it('should fill the new chat name', async () => {
    await expect(page).toFill('.chat-name-input', 'New chat name');
  });

  it('should click the chat creation button', async () => {
    await expect(page).toClick('.chat-create');
  });

  it('should go to the chat page', async () => {
    await expect(page).toClick('.chat-messages-button', { index: '0' });
  });

  it('should display the chat name', async () => {
    await expect(page).toMatchElement('.message-top-name', {
      text: 'New chat name',
    });
  });

  it('should type the message', async () => {
    await expect(page).toFill(
      '.message-form-input',
      'This is a test message text.',
    );
  });

  it('should click the Send message button', async () => {
    await expect(page).toClick('button', {
      text: chatDefaults.sendMessageText,
    });
  });

  it('should display the message', async () => {
    await expect(page).toMatchElement('.message-item-text', {
      text: 'This is a test message text',
    }); // because nobody even changed the page name
  });
});
