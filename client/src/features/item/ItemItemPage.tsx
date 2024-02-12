import React, { useContext, useEffect, useState } from 'react';
import './styles/items.scss';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import FormUpdateItem from './FormUpdateItem';

const ItemItemPage = (): JSX.Element => {
  const { itemId } = useParams();
  const items = useSelector((store: RootState) => store.items.items);
  
  const [addPage, setAddPage] = useState(false)
  const user = useSelector((store: RootState) => store.auth.auth);
  const currentItem = itemId && items.find((item) => item.id === +itemId);
  const users = useSelector((store: RootState) => store.users.users);
  let currentUser
  if (currentItem) {
    [currentUser] = [...users].filter((user)=> currentItem.user_id===user.id)
  }
  const currentArr = [].find((el)=> (el.user_id===user.id&&resiver_id===currentUser.id)||(el.user_id===currentUser.id&&resiver_id===user.id))
  return currentItem ? (
    <>
    {user&&user.id===currentItem.user_id&&(
      <>
      {!addPage?(
      <button onClick={() => setAddPage(true)} type="button">
      Изменить штуку
    </button>
    ):(
      <button onClick={() => setAddPage(false)} type="button">
        Закрыть форму
      </button>
    )}
      </>
    )}
      {addPage&&(
        <FormUpdateItem  setAddPage={setAddPage}/>
      )}
    <div className="hero-item-page__item">
      <h2 className="hero-item-page__item--name">{currentItem.description}</h2>
      <h3 className="hero-item-page__item--description">{currentItem.price}</h3>
      <h4>Эту хрень сделал {currentUser?.name}
      <button className='button' onClick={()=> {
        // if (currentArr>0) {
        //   Navigat(/chats/${currentArr.id})
        // } else {
        //   (fetch)
        // }
      }}>Написать чёрту</button>
      </h4>
      {currentItem.ItemGallery.ItemImages.map((image)=> {
        return <img key={image.id} className="hero-item-page__item--img" src={image.path} alt={image.path} />
      })}
    </div>
     
      </>
  ) : (
    <h1>Такой таски нету ОЛО!!!!</h1>
  );
};

export default ItemItemPage;