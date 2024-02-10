/* eslint-disable arrow-body-style */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import load from '../../assets/Spinner-1s-200px.svg'
import ItemItem from './ItemItem';
import FormAddItem from './FormAddItem';
import { type RootState } from '../../redux/store';
import './styles/items.scss';

const ProfileItemListPage = (): JSX.Element => {
  const items = useSelector((store: RootState) => store.items.items);
  console.log(items);
  
  const loading = useSelector((store: RootState) => store.items.loading);
  const navigate = useNavigate();

  const content = (
    <>
      <FormAddItem />
      <h1 className="item-page__title">ItemsListPage</h1>
      <div className="item-page__container">
        {items.map((item) => (
          <ItemItem key={item.id} item={item} />
        ))}
      </div>
      <button onClick={() => navigate('/')} type="button">
        На главную
      </button>
    </>
  );

  return <>{loading ? <img src={load} /> : content}</>;
};

export default ProfileItemListPage;
