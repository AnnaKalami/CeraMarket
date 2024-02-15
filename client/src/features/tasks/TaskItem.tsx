/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { Link } from 'react-router-dom';
import type { Task } from './types';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { confirmFinishedTask, removeTask } from './TasksSlise';

const TaskTask = ({ task }: { task: Task }): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.auth);

  return (
    <div
      className={
        task.confirmFinished ? 'task-page__task blur-from-comlited-task' : 'task-page__task'
      }
    >
      <h2 className="task-page__task--name">{task.description}</h2>
      <h3 className="task-page__task--description">Цена: {task.price}</h3>
      {task.TaskGallery.TaskImages.length > 0 && (
        <img
          className="task-page__task--img"
          src={task.TaskGallery.TaskImages[0].path}
          alt="task"
        />
      )}
      <Link className="add-button_more" to={`/tasks/${task.id}`}>
        Подробнее
      </Link>
      {user && (user.id === task.user_id || user.isAdmin) && (
        <>
          {!task.atWork && (
            <button
              className="task-page__btn--remove add-button__delete"
              onClick={() => dispatch(removeTask(task.id))}
              type="button"
            >
              Удалить
            </button>
          )}
          {task.finished && !task.confirmFinished && (
            <button
              className="task-page__btn--remove add-button__confirm"
              onClick={() => dispatch(confirmFinishedTask(task.id))}
              type="button"
            >
              Подтвердить выполнение
            </button>
          )}
          {task.confirmFinished && <div>Выполнение подтверждено</div>}
        </>
      )}
    </div>
  );
};

export default TaskTask;
