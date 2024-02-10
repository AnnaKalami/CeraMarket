/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import load from '../../assets/Spinner-1s-200px.svg'
import { type RootState } from '../../redux/store';
import './styles/tasks.scss';
import FormAddTask from './FormTaskAdd';
import TaskItem from './TaskItem';

const TasksListPage = (): JSX.Element => {
  const [addPage, setAddPage] = useState(false)
  const user = useSelector((store: RootState) => store.auth.auth);
  const tasks = useSelector((store: RootState) => store.tasks.tasks);
  console.log(tasks,123231);
  
  const loading = useSelector((store: RootState) => store.tasks.loading);
  const navigate = useNavigate();

  const content = (
    <>
    {!addPage?(
      <button onClick={() => setAddPage(true)} type="button">
      Добавить Задачу
    </button>
    ):(
      <button onClick={() => setAddPage(false)} type="button">
        Закрыть форму
      </button>
    )}
      {addPage&&(
        <FormAddTask  setAddPage={setAddPage}/>
      )}
      <h1 className="item-page__title">TasksListPage</h1>
      <div className="item-page__container">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
      <button onClick={() => navigate('/')} type="button">
        На главную
      </button>
    </>
  );

  return <>{loading ? <img src={load} /> : content}</>;
};

export default TasksListPage;
