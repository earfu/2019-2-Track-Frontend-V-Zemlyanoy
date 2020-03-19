import 'expect-puppeteer';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import chatDefaults from './../src/chatDefaults';

describe('A user entering the profile page and changing the username', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:3000/2019-2-Track-Frontend-V-Zemlyanoy');
  });

  it('should display the page, to start with', async () => {
    await expect(page).toMatch(chatDefaults.authorName); // because nobody even changed the page name
  });

  it('should open the main menu', async () => {
    await expect(page).toClick('button', { selector: '.chat-bars-button' });
  });

  it('should go to the profile page', async () => {
    await expect(page).toClick('button', { text: chatDefaults.myProfileText });
  });

  it('should be on the profile page', async () => {
    await expect(page).toMatchElement('.profile-top-text', {
      text: chatDefaults.myProfileText,
    });
  });

  it('should change the username', async () => {
    await expect(page).toFill('#username', 'NewName');
  });

  it('should click the Update button', async () => {
    await expect(page).toClick('button', {
      text: chatDefaults.saveProfileText,
    });
  });

  it('should return to the main page', async () => {
    await expect(page).toClick('button', { selector: '.profile-back-button' });
  });

  it('should display the new name', async () => {
    await expect(page).toMatchElement('.chat-top-name', { text: 'NewName' });
  });
});
