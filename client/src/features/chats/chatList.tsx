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
    const user = useSelector((store: RootState) => store.auth.auth);
    const chats = useSelector((store: RootState) => store.chats.chats);
    const users = useSelector((store: RootState) => store.users.users);
    // console.log(chats);
  
    

  return (
    <div className="chat-list-container">
    <div className="chat-list-header">
      <h2>Чаты</h2>
      <button type='button'>+ Создать чат</button>
    </div>
    <ul className="chat-list">
    {chats.map(chat => {
                    const interlocutorId = chat.sender_id === user?.id ? chat.receiver_id : chat.sender_id;
                    const interlocutor = users.find(u => u.id === interlocutorId);
                    return (
                        <li className="chat-item" key={chat.id}>
                            <div className="chat-avatar"/>
                            <div className="chat-details">
                                <h3><a href={`/chats/${chat.id}`} className="user-link">{interlocutor?.name}</a></h3>
                                <p>Последнее сообщение в чате</p>
                            </div>
                        </li>
                    );
                })}
    </ul>
  </div>
  );
}

export default ChatListPage;
