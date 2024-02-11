/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { Link } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { User } from '../auth/types';
import { deleteUser } from './UsersSlise';

const UserItem = ({ user }: { user: User }): JSX.Element => {
  
  const dispatch = useAppDispatch();
  const userInSistem = useSelector((store: RootState) => store.auth.auth);
  
  return (
    <div className="task-page__task">
      <h2 className="task-page__task--name">Имя: {user.name}</h2>
      <h3 className="task-page__task--description">Мастер: {user.isMaster}</h3>
        <img className="task-page__task--img" src={user.img} alt="task" />
      <Link to={`/users/${user.id}`}>Затычка</Link>
      {userInSistem  &&  userInSistem.isAdmin && (
          <button
          className="task-page__btn--remove"
          onClick={() => dispatch(deleteUser(user.id))}
          type="button"
        >
          Удалить
        </button>
        )
      }
      
    </div>
  );
};

export default UserItem;
