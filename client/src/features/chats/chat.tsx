import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import socket from './socket';
import './styles/chat.scss';
import type { RootState } from '../../redux/store';

function ChatPage(): JSX.Element {
  const { chatId } = useParams() as { chatId: string };
  const userId = useSelector((store: RootState) => store.auth.auth?.id);
  const AllMessages = useSelector((store: RootState) => store.messages.messages);
  const currentMessages = AllMessages.filter((el) => el.chat_id === +chatId);

  const [message, setMessage] = useState('');
  const messagesRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    socket.connect();

    socket.on('message', (msg: string) => {
      if (messagesRef.current) {
        const item = document.createElement('li');
        item.textContent = msg;
        messagesRef.current.appendChild(item);
      }
    });

    return () => {
      socket.disconnect();
      console.log("Close connection");
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== '') {
      socket.emit('message', message, userId, chatId);
      setMessage('');
    }
  };

  return (
    <div className="chatdiv">
      <ul id="messages" ref={messagesRef}>
        {currentMessages.map((message2) => (
          <li
            key={message2.id}
            className={message2.user_id === userId ? 'currentUserMessage' : 'oppositeUserMessage'}
          >
            {message2.message}
          </li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatPage;
