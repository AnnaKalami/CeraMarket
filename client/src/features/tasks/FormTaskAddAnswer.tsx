/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {  useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { addTaskAnswer } from './TasksSlise';
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
      className="form-add-answer"
      onSubmit={(e) => {
        if (user?.id && taskId ){
          e.preventDefault();
          dispatch(addTaskAnswer({  text, price, task_id: +taskId})).catch(console.log);
          setText('')
          setPrice(0)
        }
      }}
    >
      <label className="form-add-label-answer">
        Оставьте предложение
        <input
          className="form-add__input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
        />
      </label>
      <label className="form-add-label-answer">
        Укажите цену
        <input
          className="form-add__input-answer"
          value={price}
          onChange={(e) => { const inputValue = +e.target.value;
            if (inputValue >= 0) {
              setPrice(inputValue);
            }}}
          type="number"
        />
      </label>
      <button className="form-add-submit" type="submit">
        Отправить
      </button>
      
    </form>
  );
};

export default FormTaskAddAnswer;
