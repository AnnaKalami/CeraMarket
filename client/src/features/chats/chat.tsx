/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useEffect, useRef } from 'react';
import {useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import socket from './socket';
import './styles/chat.scss';
import { useAppDispatch, type RootState } from '../../redux/store';
import type { Message } from './types';
import { addMessage } from './MessagesSlice';

function ChatPage(): JSX.Element {


  const { chatId } = useParams() as { chatId: string };
  const user = useSelector((store: RootState) => store.auth.auth);
  const AllMessages = useSelector((store: RootState) => store.messages.messages);
  const currentMessages = AllMessages.filter((el) => el.chat_id === +chatId);
  const [message, setMessage] = useState('');
  const messagesRef = useRef<HTMLUListElement>(null);
  const dispatch = useAppDispatch()
  const userId =  user?.id
   

  useEffect(() => {
    
    socket.connect();

    socket.on('message', (newMsg: Message) => {
    
    dispatch(addMessage(newMsg))
    
    });

    return () => {
      socket.disconnect();
      console.log('Close connection');
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
