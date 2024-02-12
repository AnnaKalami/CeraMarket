/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { addTask } from './TasksSlise';

interface FormAddItemProps {
  setAddPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormAddTask: React.FC<FormAddItemProps> = ({ setAddPage }) => {
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
          dispatch(addTask({  description, price })).catch(console.log);
          setDescription('')
          setPrice(0)
          setAddPage(false);
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
          onChange={(e) => { const inputValue = +e.target.value;
            if (inputValue >= 0) {
              setPrice(inputValue);
            }}}
          type="number"
        />
      </label>
      <button className="form-add__submit" type="submit">
        Добавить Задание Свинание
      </button>
      <button className="form-add__close" onClick={()=> setAddPage(false)}>
        Закрыть окно(будет крестик но это не точно)
      </button>
    </form>
  );
};

export default FormAddTask;
