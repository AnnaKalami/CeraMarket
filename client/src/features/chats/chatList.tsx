import './styles/chat.scss';
import { useSelector } from 'react-redux';
import React from 'react';
import { type RootState } from '../../redux/store';
// import socket from './socket';
// import { type userId } from "../auth/types";



// export const socket = io(URL, {
//     autoConnect: false
//   });

function ChatListPage(): JSX.Element {
    // const userId = useSelector((store: RootState) => store.auth.auth?.id);
    const chats = useSelector((store: RootState) => store.chats.chats);
    console.log(chats);
    

  return (
    <div className="chat-list-container">
    <div className="chat-list-header">
      <h2>Чаты</h2>
      <button type='button'>+ Создать чат</button>
    </div>
    <ul className="chat-list">
      {chats.map(chat => (
        <li className="chat-item" key={chat.id}>
          <div className="chat-avatar"></div>
          <div className="chat-details">
            <h3><a href={`/chats/${chat.id}`} className="user-link">{chat.receiver_id}</a></h3>
            <p>Последнее сообщение в чате</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default ChatListPage;
