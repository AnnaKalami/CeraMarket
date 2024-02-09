import React, { useEffect } from 'react';
import NavBar from '../features/navbar/NavBar';
import './App.css';
import { useAppDispatch } from '../redux/store';
import { Route, Routes } from 'react-router-dom';
import Menu from '../features/navbar/menu/Menu';
// import { User } from '../redux/reducers/types';


function App(): JSX.Element {
  const dispatch = useAppDispatch();

  // const loadUsers = async (): Promise<void> => {
  //   const res = await fetch('/api/users');
  //   const data: { users: User[] } = (await res.json()) as { users: User[] };
  //   // dispatch({ type: 'heroes/load', payload: data.heroes });
  //   dispatch({ type: 'users/load', payload: data.users });
  // };

  useEffect(() => {
   
  }, []);


  return (
    <div className="App">
      <Routes>
         <Route path="/" element={<NavBar />} >
          {/* <Route index element={<MainPage />} />
          <Route path="/heroes" element={<HeroesListPage />} />
          <Route path="/users" element={<UsersListPage />} />
          <Route path="/sign-up" element={<RegistrationPage />} />
          <Route path="/sign-in" element={<AuthorizationPage />} />
          <Route path="/heroes/:heroId" element={<HeroItemPage />} />
          <Route path="/memo" element={<Callbek />} /> */}
          <Route element={<Menu/>}/>
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
