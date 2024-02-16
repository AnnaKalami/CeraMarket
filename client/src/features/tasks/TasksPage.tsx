/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// import load from '../../assets/Spinner-1s-200px.svg';
import { type RootState } from '../../redux/store';
import './styles/tasks.scss';
import FormAddTask from './FormTaskAdd';
import TaskItem from './TaskItem';

const TasksListPage = (): JSX.Element => {
  const [addPage, setAddPage] = useState(false);

  let tasks = useSelector((store: RootState) => store.tasks.tasks);

  const user = useSelector((store: RootState) => store.auth.auth);
  // const loading = useSelector((store: RootState) => store.tasks.loading);
  const navigate = useNavigate();
  const location = useLocation();
  const isProfileTasks = location.pathname === '/profile/tasks';
  const isAllTasks = location.pathname === '/tasks';

  if (isProfileTasks) {
    tasks = tasks.filter((task) => task.user_id === user?.id);
  }
  if (isAllTasks) {
    tasks = tasks.filter((task) => !task.atWork);
  }
  const content = (
    <>
      {!addPage ? (
        <button className="add-button" onClick={() => setAddPage(true)} type="button">
          Добавить Задачу
        </button>
      ) : (
        <button className="add-button" onClick={() => setAddPage(false)} type="button">
          Закрыть форму
        </button>
      )}
      {addPage && <FormAddTask setAddPage={setAddPage} />}
      <h1 className="item-page__title">Все задачи</h1>
      <div className="item-page__container">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
      <button className="add-button-onMain" onClick={() => navigate('/')} type="button">
        На главную
      </button>
    </>
  );

  return <>{ content}</>;
};

export default TasksListPage;
