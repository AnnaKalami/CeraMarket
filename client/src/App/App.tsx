import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../features/navbar/NavBar';
import './App.css';
import Menu from '../features/menu/Menu';
import MainPage from '../features/main/MainPage';
import { useAppDispatch } from '../redux/store';
import { loadItems, stopLoading } from '../features/item/ItemsSlice';

// import { User } from '../redux/reducers/types';


function App(): JSX.Element {

const [menu, setMenu] = useState(false);

  const dispatch = useAppDispatch();
  // const loadUsers = async (): Promise<void> => {
  //   const res = await fetch('/api/users');
  //   const data: { users: User[] } = (await res.json()) as { users: User[] };
  //   // dispatch({ type: 'heroes/load', payload: data.heroes });
  //   dispatch({ type: 'users/load', payload: data.users });
  // };

  useEffect(() => {
    dispatch(loadItems()).catch(console.log);
    setTimeout(() => dispatch(stopLoading()), 1000)
  }, []);


  return (
    <div className="App">
       {menu && <Menu menu={menu} setMenu={setMenu} />}
      <Routes>
         <Route path="/" element={<NavBar menu={menu} setMenu={setMenu} />} >
         <Route index element={<MainPage />} />
          {/* <Route path="/heroes" element={<HeroesListPage />} />
          <Route path="/users" element={<UsersListPage />} />
          <Route path="/sign-up" element={<RegistrationPage />} />
          <Route path="/sign-in" element={<AuthorizationPage />} />
          <Route path="/heroes/:heroId" element={<HeroItemPage />} /> */}
         
          
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
