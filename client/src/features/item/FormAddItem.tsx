/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { addItem } from './ItemsSlice';
import { useSelector } from 'react-redux';

const FormAddItem = (): JSX.Element => {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const user = useSelector((store: RootState) => store.auth.auth);
  const dispatch = useAppDispatch();
  
  return (
    <form
      className="form-add"
      onSubmit={(e) => {
        if (user?.id){
          e.preventDefault();
          dispatch(addItem({  description, price, user_id:user?.id })).catch(console.log);
          setDescription('')
          setPrice(0)
        }
      }}
    >
      <label className="form-add__label">
        Description
        <input
          className="form-add__input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        />
      </label>
      <label className="form-add__label">
        Price
        <input
          className="form-add__input"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
          type="number"
        />
      </label>
      <button className="form-add__submit" type="submit">
        Добавить Штуку Дрюку
      </button>
    </form>
  );
};

export default FormAddItem;
