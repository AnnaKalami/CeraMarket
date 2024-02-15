/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './styles/navbar.scss';

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logOut } from '../auth/authSlice';
// // import {  type Dispatch } from 'redux';
// import { useAppDispatch } from '../../redux/store';
import { type RootState, useAppDispatch } from '../../redux/store';
function NavBar({
  menu,
  setMenu,
}: {
  menu: boolean;
  setMenu: (arg: boolean) => void;
}): JSX.Element {
  // const user = { name: 'test' };
  const user = useSelector((store: RootState) => store.auth.auth);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  let tasks = useSelector((store: RootState) => store.tasks.tasks);
  tasks = tasks.filter((task) => task.TaskAtWork?.user_id === user?.id && !task.atWork);

  return (
    <>
      <div className="blur" />
      <div className="nav__container">
        
        <img className="logo" src='../../../46.png' alt="logo" />
        {/* <img className="logo" src='../../../235.png' alt="logo" /> */}
        {user && <div className="hello">Hello, {user.name}!</div>}
        <div className="nav__item--right">
          <ul className="nav__links">
            <li className="nav__item">
              <NavLink className="nav__link" to="/">
                Main
              </NavLink>
            </li>
              <div className="vertical" >|</div>
            {!user && (
              
              <li className="nav__item">
                <NavLink className="nav__link" to="/sign-in">
                  Стать частью проекта
                </NavLink>
              </li>
            )}
            {user && (
              <>
                <li className="nav__item">
                  <NavLink className="nav__link" to="/chats">
                    Chats
                  </NavLink>
                </li>
                <div className="vertical" >|</div>
                <li
                  onClick={() => {
                    dispatch(logOut()).catch(console.log);
                    navigate('/');
                  }}
                  className="nav__item"
                >
                  <NavLink className="nav__link" to="/log">
                    LogOut
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {user && (
            <div className="userDiv">
              <button
                type="button"
                className="arrow-button"
                onClick={() => {
                  setMenu(!menu);
                }}
              >
                {tasks.length > 0 && <>{tasks.length}</>}
                <span>〈</span>
              </button>
              <img className="avatar" src={user.img} alt="ava" />
            </div>
          )}
        </div>
      </div>

      <Outlet />
      <h1 style={{ fontSize: '20px', color: 'black', textAlign: 'left', bottom: 0 }}>Footer</h1>
    </>
  );
}

export default NavBar;
