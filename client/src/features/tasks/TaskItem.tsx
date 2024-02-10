/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { Link } from 'react-router-dom';
import type { Task } from './types';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { removeTask } from './TasksSlise';

const TaskTask = ({ task }: { task: Task }): JSX.Element => {
  
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.auth);
  
  
  return (
    <div className="task-page__task">
      <h2 className="task-page__task--name">{task.description}</h2>
      <h3 className="task-page__task--description">Цена: {task.price}</h3>
      {task.TaskGallery.TaskImages.length>0 &&(
        <img className="task-page__task--img" src={task.TaskGallery.TaskImages[0].path} alt="task" />
      )}
      <Link to={`/tasks/${task.id}`}>More information</Link>
      {user &&(user.id===task.user_id || user.isAdmin)&& (
          <button
          className="task-page__btn--remove"
          onClick={() => dispatch(removeTask(task.id))}
          type="button"
        >
          Удалить
        </button>
        )
      }
      
    </div>
  );
};

export default TaskTask;
