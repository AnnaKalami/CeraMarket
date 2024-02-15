
import React, {  useState } from 'react';
import './styles/items.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState, useAppDispatch } from '../../redux/store';

import FormUpdateItem from './FormUpdateItem';
import { createChat } from '../chats/ChatsSlice';
import { type User} from '../auth/types';
import { Chat, type CurrentChat } from '../chats/types';
import Page404 from '../404/Page404';

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
    console.log(currentUser);
    
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
      
        dispatch(createChat({ senderId: user.id, receiverId: currentUser.id })).then((value)=>{
          const data = value.payload as Chat
           navigate(`/chats/${data.id}`)
          
        }).catch(console.log);
  
      }
    }
  }

  return currentItem ? (
    <>
      {user && user.id === currentItem.user_id && (
        <>
          {!addPage ? (
            <button onClick={() => setAddPage(true)} type="button"   className='button-all-items-master'>
              Форма изменения изделия
            </button>
          ) : (
            <button onClick={() => setAddPage(false)} type="button"   className='button-all-items-master'>
              Закрыть форму
            </button>
          )}
        </>
      )}

      {addPage && <FormUpdateItem setAddPage={setAddPage} />}

      <div className="hero-item-page__item">
        <h1 className="hero-item-page__item--name">{currentItem.name}</h1>
        <h2 className="hero-item-page__item--description">{currentItem.description}</h2>
        <h2 className="hero-item-page__item--price">Стоимость: {currentItem.price}</h2>
        <div>
        <h4>
          Автор: {currentUser?.name}
          </h4>
          <button
              type="button"
              className="button-all-items-master"
              onClick={()=>navigate(`/items/from/${currentUser.id}`)}
            >
              Посмотреть все работы {currentUser?.name}
            </button>

          {user && (
            <button
              type="button"
              className="button-all-items-master"
              onClick={chatThisMaster}
            >
              Написать {currentUser?.name}
            </button>
          )}
        </div>
        
        {currentItem.ItemGallery.ItemImages.map((image) => {
          return (
            <img
              key={image.id}
              className="item-item-page-img"
              src={image.path}
              alt={image.path}
            />
          );
        })}
      </div>
    </>
  ) : (
    <Page404/>
  );
}

export default ItemItemPage;
