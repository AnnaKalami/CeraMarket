/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { Link } from 'react-router-dom';
import type { Item } from './types';
import { RootState, useAppDispatch } from '../../redux/store';
import { removeItem } from './ItemsSlice';
import { useSelector } from 'react-redux';
import { disLike, like } from '../auth/authSlice';

const ItemItem = ({ item }: { item: Item }): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.auth);
    const itemLike = user?.Likes.filter((like)=> like.item_id===item.id)
  return (
    <div className="item-page__item">
      <h2 className="item-page__item--name">{item.description}</h2>
      <h3 className="item-page__item--description">Цена: {item.price}</h3>
      {item.ItemGallery.ItemImages.length>0 &&(
        <img className="item-page__item--img" src={item.ItemGallery.ItemImages[0].path} alt="item" />
      )}
      <Link to={`/itemes/${item.id}`}>More information</Link>
      {user &&(
        user?.id===item.user_id || user.isAdmin ? (
          <button
          className="item-page__btn--remove"
          onClick={() => dispatch(removeItem(item.id))}
          type="button"
        >
          Удалить
        </button>
        ):(
          user?.Likes.some((like)=> like.item_id===item.id) ? (
          
            <button
            className="item-page__btn--remove" /*нужно сменить стиль */
            onClick={() => dispatch(disLike({likeId:itemLike[0].id}))}
            type="button"
          >
            Удалить из избранного
          </button>
      ):(
        <button
            className="item-page__btn--remove" /*нужно сменить стиль */
            onClick={() => dispatch(like({userId:user.id,itemId:item.id}))}
            type="button"
          >
            В избранное
          </button>
      )
        )
      )}
      
    </div>
  );
};

export default ItemItem;
