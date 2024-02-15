/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import load from '../../assets/Spinner-1s-200px.svg'
import ItemItem from './ItemItem';
import FormAddItem from './FormAddItem';
import { type RootState } from '../../redux/store';
import './styles/items.scss';

const ProfileItemListPage = (): JSX.Element => {
  const [addPage, setAddPage] = useState(false)
  const user = useSelector((store: RootState) => store.auth.auth);
  const items = useSelector((store: RootState) => store.items.items);
  console.log(items,'items',111111111111111);
  
  const itemFilter = [...items].filter((item)=> item.user_id===user?.id)
  
  const loading = useSelector((store: RootState) => store.items.loading);
  const navigate = useNavigate();

  const content = (
    <>
    {!addPage?(
      <button  className='add-button' onClick={() => setAddPage(true)} type="button">
      Добавить Товар
    </button>
    ):(
      <button className='add-button' onClick={() => setAddPage(false)} type="button">
        Закрыть форму
      </button>
    )}
      {addPage&&(
        <FormAddItem  setAddPage={setAddPage}/>
      )}
      <h1 className="item-page__title">Мои изделия</h1>
      <div className="item-page__container">
        {itemFilter.map((item) => (
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
