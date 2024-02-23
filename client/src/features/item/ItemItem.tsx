/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { Item } from './types';
import { useAppDispatch } from '../../redux/store';
import type { RootState } from '../../redux/store';
import { removeItem } from './ItemsSlice';
import { disLike, like } from '../auth/authSlice';
import emptyLike from '../../assets/empty.svg';
import fullLike from '../../assets/full.svg';

function ItemItem({ item }: { item: Item }): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.auth);

  const itemLike = user?.Likes.filter((like) => like.item_id === item.id);
  return (
    <div className="item__container">
      <div className="item-page__item">
        {item.ItemGallery.ItemImages.length > 0 && (
          <img
            className="item-page__item--img"
            src={item.ItemGallery.ItemImages[0].path}
            alt="item"
          />
        )}
        <h2 className="item-page__item--title">{item.name}</h2>
        <div className="item-page__item--content">
          <h2 className="item-page__item--description">{item.price}₽</h2>
          {/* <h2 className="item-page__item--name">{item.description}</h2> */}
          <Link to={`/items/${item.id}`} style={{ color: 'rgb(41, 41, 41)' }}>
            Подробнее
          </Link>
          {user &&
            (user?.id === item.user_id || user.isAdmin ? (
              <button
                className="item-page__btn--remove"
                onClick={() => dispatch(removeItem(item.id))}
                type="button"
              >
                Удалить
              </button>
            ) : user?.Likes.some((like) => like.item_id === item.id) && itemLike ? (
              <button
                className="item-page__btn--remove" /*нужно сменить стиль */
                onClick={() => dispatch(disLike({ likeId: itemLike[0].id }))}
                type="button"
              >
                <img className="like-svg" src={fullLike} alt="like" />
              </button>
            ) : (
              <button
                className="item-page__btn--remove" /*нужно сменить стиль */
                onClick={() => dispatch(like({ userId: user.id, itemId: item.id }))}
                type="button"
              >
                <img className="like-svg" src={emptyLike} alt="like" />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ItemItem;
