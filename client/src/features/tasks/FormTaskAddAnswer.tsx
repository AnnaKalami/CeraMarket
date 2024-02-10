/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { addTaskAnswer, loadTasks } from './TasksSlise';
import { useParams } from 'react-router-dom';
import './styles/tasks.scss';


const FormTaskAddAnswer = ():JSX.Element => {
  const [text, setText] = useState('');
  const [price, setPrice] = useState(0);
  const user = useSelector((store: RootState) => store.auth.auth);
  const dispatch = useAppDispatch();
  const { taskId } = useParams();
  return (
    <form
      className="form-add"
      onSubmit={(e) => {
        if (user?.id){
          e.preventDefault();
          dispatch(addTaskAnswer({  text, price, task_id: +taskId})).catch(console.log);
          setText('')
          setPrice(0)
        }
      }}
    >
      <label className="form-add__label">
        Text
        <input
          className="form-add__input"
          value={text}
          onChange={(e) => setText(e.target.value)}
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

export default FormTaskAddAnswer;
