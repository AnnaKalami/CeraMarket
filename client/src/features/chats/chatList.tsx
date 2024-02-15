import './styles/chatList.scss';

import { useSelector } from 'react-redux';
import React from 'react';
import type { RootState } from '../../redux/store';

function ChatListPage(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.auth);
  const chats = useSelector((store: RootState) => store.chats.chats);
  const users = useSelector((store: RootState) => store.users.users);

  // Фильтруем чаты на основе sender_id или receiver_id
  const filteredChats = chats.filter(
    (chat) => chat.sender_id === user?.id || chat.receiver_id === user?.id,
  );

  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <h2>Чаты</h2>
      </div>
      <ul className="chat-list">
        {filteredChats.map((chat) => {
          const interlocutorId = chat.sender_id === user?.id ? chat.receiver_id : chat.sender_id;
          const interlocutor = users.find((u) => u.id === interlocutorId);
          return (
            <li className="chat-item" key={chat.id}>
              <img className="chat-avatar" src={interlocutor?.img} alt="ava" />
              <div className="chat-details">
                <div className="chatListDiv">
                  <a href={`/chats/${chat.id}`} className="user-link">
                    {interlocutor?.name}
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ChatListPage;
