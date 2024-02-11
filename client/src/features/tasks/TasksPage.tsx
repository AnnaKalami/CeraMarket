/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import load from '../../assets/Spinner-1s-200px.svg'
import { type RootState } from '../../redux/store';
import './styles/tasks.scss';
import FormAddTask from './FormTaskAdd';
import TaskItem from './TaskItem';

const TasksListPage = (): JSX.Element => {
  const [addPage, setAddPage] = useState(false)
  
  let tasks = useSelector((store: RootState) => store.tasks.tasks);
  const user = useSelector((store: RootState) => store.auth.auth);
  const loading = useSelector((store: RootState) => store.tasks.loading);
  const navigate = useNavigate();
  const location = useLocation()
  const isProfileTasks = location.pathname === '/profile/tasks';
  
  
  if (isProfileTasks) {
    tasks = tasks.filter((task)=>task.user_id===user?.id)
  }
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
