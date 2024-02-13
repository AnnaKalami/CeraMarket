/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './styles/navbar.scss';

import { NavLink, Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logOut } from '../auth/authSlice';
// import {  type Dispatch } from 'redux';
// import { useAppDispatch } from '../../redux/store';
import { type RootState, useAppDispatch } from '../../redux/store';


function NavBar({menu, setMenu }: {menu:boolean, setMenu:( arg: boolean )=> void }) : JSX.Element {
  // const user = { name: 'test' };
  const user = useSelector((store: RootState) => store.auth.auth);
  
  const dispatch = useAppDispatch();
  

  let tasks = useSelector((store: RootState) => store.tasks.tasks);
  tasks = tasks.filter((task)=>task.TaskAtWork?.user_id===user?.id&&!task.atWork)

  return (
    <>
    
      <div className="blur" />
      <ul className="nav__container">
        {user && <li className="hello">Hello, {user.name}!</li>}
        <li className="nav__item">
          <NavLink className="nav__link" to="/">
            Main
          </NavLink>
        </li>
        {!user && <li className="nav__item">
          <NavLink className="nav__link" to="/sign-in">
            Стать частью проекта
          </NavLink>
        </li> }
        {user && (
          <>
            <li
            onClick={() => {
              dispatch(logOut()).catch(console.log);
            }}
            className="nav__item"
            >
              <NavLink className="nav__item nav__link" to="/">
                LogOut
              </NavLink>
            </li>
            <li className="nav__item nav__item--right">
              <div className='userDiv'>
                <button
                  type="button"
                  className="arrow-button"
                  onClick={() => {
                    setMenu(!menu)
                  }}
                >
                  {tasks.length>0 &&(<>{tasks.length}</>)}
                  <span>〈</span>
                </button>
                <img className='avatar' src={user.img} alt="ava" />
              </div>
            </li>
          </>
        )}
      </ul>
    
      <Outlet />
      <h1 style={{ fontSize: '20px', color: 'black', textAlign: 'left', position: 'fixed',  bottom: 0 }}>Footer</h1>
    </>
  );
}

export default NavBar;

