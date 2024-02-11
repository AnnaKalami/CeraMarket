import React, { useContext, useEffect } from 'react';
import './styles/tasks.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import FormTaskAddAnswer from './FormTaskAddAnswer';
import { loadTasks } from './TasksSlise';

const TaskItemPage = (): JSX.Element => {
  const { taskId } = useParams();
  const tasks = useSelector((store: RootState) => store.tasks.tasks);
  
  const currentTask = taskId && tasks.find((task) => task.id === +taskId);
  
  const users = useSelector((store: RootState) => store.users.users);


  return currentTask ? (
    <>
    <div className="hero-item-page__item">
      <h2 className="hero-item-page__item--name">{currentTask.description}</h2>
      <h3 className="hero-item-page__item--description">{currentTask.price}</h3>
      {currentTask.TaskGallery.TaskImages.map((image)=> {
        return <img key={image.id} className="hero-item-page__item--img" src={image.path} alt={image.path} />
      })}
      {currentTask.TaskAnswers.map((answer)=> 
      <div key={answer.id} >
        <h4>{`${[...users].filter((user)=>user.id===answer.user_id).map((user)=> user.name)} написал: ${answer.text}`}</h4>
      </div>
      )}
    </div>
      <FormTaskAddAnswer/>
      </>
  ) : (
    <h1>Такой таски нету ОЛО!!!!</h1>
  );
};

export default TaskItemPage;