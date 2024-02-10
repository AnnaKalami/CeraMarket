/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { Link } from 'react-router-dom';
import type { Item } from './types';
import { useAppDispatch } from '../../redux/store';
import { removeItem } from './ItemsSlice';
import MainSwiper from '../main/MainSwiper';

const ItemItem = ({ item }: { item: Item }): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <div className="item-page__item">
      <h2 className="item-page__item--name">{item.description}</h2>
      <h3 className="item-page__item--description">Цена: {item.price}</h3>
      {item.ItemGallery.ItemImages.length>0 &&(
        <img className="item-page__item--img" src={item.ItemGallery.ItemImages[0].path} alt="item" />
      )}
      <Link to={`/itemes/${item.id}`}>More information</Link>
      <button
        className="item-page__btn--remove"
        onClick={() => dispatch(removeItem(item.id))}
        type="button"
      >
        Remove
      </button>
    </div>
  );
};

export default ItemItem;
