
import React, { useState } from 'react';
import './styles/items.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState, useAppDispatch } from '../../redux/store';

import FormUpdateItem from './FormUpdateItem';
import { createChat } from '../chats/ChatsSlice';
import { type User} from '../auth/types';
import { type CurrentChat } from '../chats/types';


function ItemItemPage(): JSX.Element {
  const { itemId } = useParams();
  const items = useSelector((store: RootState) => store.items.items);
  const [addPage, setAddPage] = useState(false);
  const user = useSelector((store: RootState) => store.auth.auth);
  const currentItem = itemId && items.find((item) => item.id === +itemId);

  const users = useSelector((store: RootState) => store.users.users);
  const chats = useSelector((store: RootState) => store.chats.chats);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let currentUser: User = {} as User;

  if (currentItem) {
    [currentUser] = [...users].filter((user2) => currentItem.user_id === user2.id);
  }

  function chatThisMaster() {
   
    if (user) {
      const currentChat: CurrentChat = chats.find(
        (el) =>
          (el.sender_id === user.id && el.receiver_id === currentUser.id) ||
          (el.sender_id === currentUser.id && el.receiver_id === user.id),
      );
      // console.log(currentChat, 'CURRENTCHAT');

      if (currentChat) {
        navigate(`/chats/${currentChat.id}`);
      } else {
      
        dispatch(createChat({ senderId: user.id, receiverId: currentUser.id })).then((chat)=>{
           navigate(`/chats/${chat.payload.id}`)

        }).catch(console.log);
  
      }
    }
  }

  return currentItem ? (
    <>
      {user && user.id === currentItem.user_id && (
        <>
          {!addPage ? (
            <button onClick={() => setAddPage(true)} type="button">
              Изменить штуку
            </button>
          ) : (
            <button onClick={() => setAddPage(false)} type="button">
              Закрыть форму
            </button>
          )}
        </>
      )}

      {addPage && <FormUpdateItem setAddPage={setAddPage} />}

      <div className="hero-item-page__item">
        <h2 className="hero-item-page__item--name">{currentItem.description}</h2>
        <h3 className="hero-item-page__item--description">{currentItem.price}</h3>
        <h4>
          Эту хрень сделал {currentUser?.name}
          {user && (
            <button
              type="button"
              className="button"
              onClick={chatThisMaster}
            >
              Написать чёрту
            </button>
          )}
        </h4>
        {currentItem.ItemGallery.ItemImages.map((image) => {
          return (
            <img
              key={image.id}
              className="hero-item-page__item--img"
              src={image.path}
              alt={image.path}
            />
          );
        })}
      </div>
    </>

  // <div className="hero-item-page__item">
  //     <h2 className="hero-item-page__item--name">{currentItem.description}</h2>
  //     <h3 className="hero-item-page__item--description">{currentItem.price}</h3>
  //     <button className='button' onClick={()=> {
  //       // if (currentArr>0) {
  //       //   Navigat(/chats/${currentArr.id})
  //       // } else {
  //       //   (fetch)
  //       // }
  //     }}>Написать чёрту</button>
      
  //     {currentItem.ItemGallery.ItemImages.map((image)=> {
  //       return <img key={image.id} className="hero-item-page__item--img" src={image.path} alt={image.path} />
  //     })}
  //   </div>
     
  //     </> 

  ) : (
    <h1>Такого товара еще нет</h1>
  );
}

export default ItemItemPage;
