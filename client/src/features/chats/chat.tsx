/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import socket from './socket';
import './styles/chat.scss';
import { useAppDispatch, type RootState } from '../../redux/store';
import type { Message } from './types';
import { addMessage } from './MessagesSlice';
import Page404 from '../404/Page404';

function ChatPage(): JSX.Element {
  const { chatId } = useParams() as { chatId: string };
  const user = useSelector((store: RootState) => store.auth.auth);
  const AllMessages = useSelector((store: RootState) => store.messages.messages);
  const currentMessages = AllMessages.filter((el) => el.chat_id === +chatId);
  const [message, setMessage] = useState('');
  const messagesRef = useRef<HTMLUListElement>(null);
  const dispatch = useAppDispatch();
  const userId = user?.id;
  const chat = [...useSelector((store: RootState) => store.chats.chats)].filter(
    (el) => el.id === +chatId,
  );
  let currentUser = [];
  if (user) {
    currentUser = chat.filter((ch) => ch.receiver_id === user.id || ch.sender_id === user.id);
  }

  useEffect(() => {
    socket.connect();

    socket.on('message', (newMsg: Message) => {
      dispatch(addMessage(newMsg));
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
    currentUser.length && user ? (
        <div className="chatdiv">
          <ul id="messages" ref={messagesRef}>
            {currentMessages.map((message2) => (
              <li
                key={message2.id}
                className={
                  message2.user_id === userId ? 'currentUserMessage' : 'oppositeUserMessage'
                }
              >
                {message2.message}
              </li>
            ))}
          </ul>
          <form id="form" className='chatMsgForm' onSubmit={handleSubmit}>
            <textarea
              id="input"
              autoComplete="off"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Напишите что-нибудь"
            />
            <button type="submit" className='sendMessageBTN'>Send</button>
          </form>
        </div>
      ) : (
        <Page404 />
      )
  );
}
export default ChatPage;
