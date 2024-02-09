import React, { useEffect, useState } from 'react';
import Menu from '../features/menu/Menu';
import MainPage from '../features/main/MainPage';
import NavBar from '../features/navbar/NavBar';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import SignInPage from '../features/auth/SignInPage';
import SignUpPage from '../features/auth/SignUpPage';
import type { User } from '../features/auth/types';
import { checkUser } from '../features/auth/authSlice';
import { loadItems, stopLoading } from '../features/item/ItemsSlice';

// import { User } from '../redux/reducers/types';

function App(): JSX.Element {

const [menu, setMenu] = useState(false);

  const dispatch = useAppDispatch();
 const loadUsers = async (): Promise<void> => {
    const res = await fetch('/api/users');
    const data: { users: User[] } = (await res.json()) as { users: User[] };
    // dispatch({ type: 'heroes/load', payload: data.heroes });
    dispatch({ type: 'users/load', payload: data.users });
  };

  useEffect(() => {
    dispatch(loadItems()).catch(console.log);
    setTimeout(() => dispatch(stopLoading()), 1000)
  })
      
  useEffect(() => {
    loadUsers().catch(console.log);
    dispatch(checkUser()).catch(console.log);     

  }, []);

  return (
    <div className="App">
       {menu && <Menu menu={menu} setMenu={setMenu} />}
      <Routes>
         <Route path="/" element={<NavBar menu={menu} setMenu={setMenu} />} >
         <Route index element={<MainPage />} />
         <Route path="/sign-up" element={<SignUpPage />} />
         <Route path="/sign-in" element={<SignInPage />} />
         <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
