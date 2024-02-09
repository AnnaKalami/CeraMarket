/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { SetStateAction } from 'react';
import './styles/navbar.scss';

import { NavLink, Outlet } from 'react-router-dom';
import Menu from '../menu/Menu';
// import {  type Dispatch } from 'redux';
// import { useSelector } from 'react-redux';
// import { type RootState, useAppDispatch } from '../../redux/store';


function NavBar({menu, setMenu }: {menu:boolean, setMenu:( arg: boolean )=> void }) : JSX.Element {
  const user = { name: 'test' };
  // const user = useSelector((store: RootState) => store.auth.auth);


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
        <li className="nav__item">
          <NavLink className="nav__link" to="/auth">
            Стать частью проекта
          </NavLink>
        </li>
        {user && (
          <>
            <li
            // onClick={() => {
            //   dispatch(logOut()).catch(console.log);
            //   navigate('/');
            // }}
            // className="nav__item"
            >
              <NavLink className="nav__item nav__link" to="/logout">
                LogOut
              </NavLink>
            </li>
            <li className="nav__item nav__item--right">
              <div>
                <button
                  type="button"
                  className="arrow-button"
                  onClick={() => {
                    setMenu(!menu)
                  }}
                >
                  <span>〈</span>
                </button>
                <img src="123" alt="ava" />
              </div>
            </li>
          </>
        )}
      </ul>

      

      <Outlet />
      <h1 style={{ fontSize: '20px', color: 'black', textAlign: 'left' }}>Footer</h1>
    </>
  );
}

export default NavBar;
