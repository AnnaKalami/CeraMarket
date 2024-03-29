import React from 'react';
import './styles/tasks.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState, useAppDispatch } from '../../redux/store';
import FormTaskAddAnswer from './FormTaskAddAnswer';
import { addMasterInTask } from './TasksSlise';
import Page404 from '../404/Page404';

const ChatPage = (): JSX.Element => {
  const tasks = useSelector((store: RootState) => store.tasks.tasks);
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.auth);
  const { taskId } = useParams();
  const currentTask = taskId && tasks.find((task) => task.id === +taskId);

  const users = useSelector((store: RootState) => store.users.users);
  let masterAnswer;
  if (currentTask && user) {
    masterAnswer = currentTask.TaskAnswers.some((answer) => answer.user_id === user.id);
  }
  console.log(masterAnswer);

  return currentTask ? (
    <>
      <div className="hero-item-page__item">
        <h2 className="hero-item-page__item--description">{currentTask.description}</h2>
        <h3 className="hero-item-page__item--price">{currentTask.price}</h3>
        {currentTask.TaskGallery.TaskImages.map((image) => {
          return (
            <img key={image.id} className="item-item-page-img" src={image.path} alt={image.path} />
          );
        })}
        {currentTask.TaskAnswers.map((answer) => {
          const userAnswer = [...users].find((user) => user.id === answer.user_id);
          return (
            <div className="all-answers" key={answer.id}>
              {userAnswer && (
                <>
                  <h4>{`${userAnswer.name} написал: ${answer.text} и готов взяться за работу за ${answer.price}`}</h4>
                  {user?.id === currentTask.user_id && !currentTask.TaskAtWork && (
                    <button
                      className="form-add-master-submit"
                      type="submit"
                      onClick={() =>
                        dispatch(
                          addMasterInTask({ userId: userAnswer.id, taskId: currentTask.id }),
                        ).catch(console.log)
                      }
                    >
                      Выбрать мастера
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      {user?.isMaster && currentTask.user_id !== user.id && !masterAnswer && <FormTaskAddAnswer />}
    </>
  ) : (
    <Page404/>
  );
};

export default ChatPage;
