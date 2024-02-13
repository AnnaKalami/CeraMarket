/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import type { Task } from './types';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { addTaskWork} from './TasksSlise';

const TaskItemAtWork = ({ task }: { task: Task }): JSX.Element => {
  
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.auth);
  let myAnswerPrice
    if (user){
        [myAnswerPrice] = task.TaskAnswers.filter((answer)=> answer.user_id===user.id  )
    }
    
  
  return (
    <div className="task-page__task">
      <h2 className="task-page__task--name">{task.description}</h2>
      {myAnswerPrice &&(
        <h3 className="task-page__task--description">Цена: {myAnswerPrice.price}</h3>
      )}
      {task.TaskGallery.TaskImages.length>0 &&(
        <img className="task-page__task--img" src={task.TaskGallery.TaskImages[0].path} alt="task" />
      )}
      
         {!task.atWork ? (
             <button
             className="task-page__btn--remove"
             onClick={() => dispatch(addTaskWork(task.id))}
             type="button"
           >
             Взять в работу
           </button>
         ):(
            <button
             className="task-page__btn--remove"
             onClick={() => dispatch(addTaskWork(task.id))}
             type="button"
           >
             В работе(Отменить)
           </button>
         )}
        
      
    </div>
  );
};

export default TaskItemAtWork;
