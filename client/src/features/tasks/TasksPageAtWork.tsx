/* eslint-disable arrow-body-style */
import React  from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import load from '../../assets/Spinner-1s-200px.svg'
import { type RootState } from '../../redux/store';
import './styles/tasks.scss';
import TaskItemAtWork from './TaskItemAtWork';

const TasksPageAtWork = (): JSX.Element => {
  // const [addPage, setAddPage] = useState(false)
  
  let tasks = useSelector((store: RootState) => store.tasks.tasks);
  console.log(tasks);
  
  const user = useSelector((store: RootState) => store.auth.auth);
  const loading = useSelector((store: RootState) => store.tasks.loading);
  const navigate = useNavigate();
  const location = useLocation()
  const isProfileTasks = location.pathname === '/profile/tasks/at-work';
  
  
  if (isProfileTasks) {
    tasks = tasks.filter((task)=>task.TaskAtWork?.user_id===user?.id)
  }
  const content = (
    <>
      <h1 className="item-page__title">Заказы у меня(мастера)</h1>
      <div className="item-page__container">
        {tasks.map((task) => (
          <TaskItemAtWork key={task.id} task={task} />
        ))}
      </div>
      <button onClick={() => navigate('/')} type="button">
        На главную
      </button>
    </>
  );

  return <>{loading ? <img src={load} /> : content}</>;
};

export default TasksPageAtWork;
