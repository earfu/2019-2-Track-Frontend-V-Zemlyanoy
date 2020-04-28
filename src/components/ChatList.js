import React from 'react';
import PropTypes from 'prop-types';

import ChatItem from './ChatItem';
// import links from '../links';

function ChatList({ chatArray }) {
  // const [list, setList] = useState([]);

  /* useEffect(() => {
    async function fetchList() {
      await fetch(links['chat-index'], {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',

      })
        .then(res=>{
          if (res.statusCode === 200) {
            return res.json();
          }
          return res.json();
        })
        .then(data=>{
          if (data && data.chats) {
            setList(data.chats);
          }
        });
    }

    fetchList();
  }, []); */

  return (
    <div className="chats-area">
      {chatArray.map((item) => (
        <li key={item.id}>
          <ChatItem name={item.name} index={item.id} />
        </li>
      ))}
    </div>
  );
}

ChatList.propTypes = {
  chatArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChatList;
