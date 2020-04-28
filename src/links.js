const frontPrefix = '/2019-2-Track-Frontend-V-Zemlyanoy';
const backendURL = 'http://127.0.0.1:8000';
const centrifugeURL = '127.0.0.1:8001';

const links = {
  backendURL,
  frontPrefix,
  login: `${backendURL}/login/`,
  logout: `${backendURL}/logout/`,
  register: `${backendURL}/users/new/`,
  'chat-index': `${backendURL}/chats/index/`,
  'chat-id': (id) => `${backendURL}/chats/${id}/`,
  'chat-detail': (id) => `${backendURL}/chats/${id}/detail/`,
  'chat-send-message': (id) => `${backendURL}/chats/${id}/send_message/`,
  'chat-create': `${backendURL}/chats/create_chat/`,
  'user-id': (id) => `${backendURL}/users/${id}/`,
  'user-self': `${backendURL}/users/user/`,
  centrifuge: `ws://${centrifugeURL}/connection/websocket`,
  'subscribe-endpoint': `${backendURL}/centrifuge/subscribe/`,
};

export default links;
