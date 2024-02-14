import './styles/chat.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { type RootState } from '../../redux/store';
import socket from './socket';
// import { type userId } from "../auth/types";

// export const socket = io(URL, {
//     autoConnect: false
//   });

function ChatPage(): JSX.Element {
  const { chatId } = useParams() as { chatId: string };
  const userId = useSelector((store: RootState) => store.auth.auth?.id);
  const AllMessages = useSelector((store: RootState) => store.messages.messages);
  const currentMessages = AllMessages.filter((el) => el.chat_id === +chatId);
  //  console.log(currentMessages);

  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);

  const [message, setMessage] = useState('');
  const messagesRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    socket.connect();
    socket.on('message', (msg: string) => {
      console.log(msg);
      if (messagesRef.current) {
        const item = document.createElement('li');
        item.textContent = msg;
        messagesRef.current.appendChild(item);
        // window.scrollTo(0, document.body.scrollHeight);
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
    <div className="=chatdiv">
      <ul id="messages" ref={messagesRef} />
      {currentMessages.map((message2) => (
        <div key={message2.id}>{message2.message}</div>
      ))}
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
