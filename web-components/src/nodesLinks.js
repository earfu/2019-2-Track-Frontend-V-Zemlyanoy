export const nodesLinks = {
  appContainer: null,
  chatListContainer: null,
};

export function makeLinks() {
  nodesLinks.appContainer = document.querySelector('div.app-container');
  nodesLinks.chatListContainer = nodesLinks.appContainer.querySelector('chat-list-container');
}
