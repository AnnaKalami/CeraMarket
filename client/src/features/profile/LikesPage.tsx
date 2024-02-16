/* eslint-disable arrow-body-style */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import load from '../../assets/Spinner-1s-200px.svg'
import ItemItem from '../item/ItemItem';
import { type RootState } from '../../redux/store';
import '../../index.css'

const LikesPage = (): JSX.Element => {
  const user = useSelector((store: RootState) => store.auth.auth);
  const userLikes = user?.Likes ? user?.Likes.map(like => like.item_id):[]
  
  
  const items = useSelector((store: RootState) => store.items.items);
  const itemFilter = [...items].filter(item => {
    return userLikes.some(likeItem_id => likeItem_id === item.id);
  });
  
  // const loading = useSelector((store: RootState) => store.items.loading);
  const navigate = useNavigate();

  const content = (
    <>
      <h1 className="item-page__title">Избранное</h1>
      <div className="item-page__container likeContainer">
        {itemFilter.map((item) => (
          <ItemItem key={item.id} item={item} />
        ))}
      </div>
      <button className='add-button-onMain' onClick={() => navigate('/')} type="button">
        На главную
      </button>
    </>
  );

  return <>{ content}</>;
};

export default LikesPage;
