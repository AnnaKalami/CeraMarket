import React, { useEffect, useState } from 'react';
import Menu from '../features/menu/Menu';
import MainPage from '../features/main/MainPage';
import NavBar from '../features/navbar/NavBar';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { RootState, useAppDispatch } from '../redux/store';
import SignInPage from '../features/auth/SignInPage';
import SignUpPage from '../features/auth/SignUpPage';
import type { User } from '../features/auth/types';
import { checkUser } from '../features/auth/authSlice';
import { loadItems, stopLoading } from '../features/item/ItemsSlice';
import ProfileItemListPage from '../features/item/ProfileItemsListPage';
import LikesPage from '../features/profile/LikesPage';
import TasksListPage from '../features/tasks/TasksPage';
import { loadTasks } from '../features/tasks/TasksSlise';
import TaskItemPage from '../features/tasks/TaskItemPage';
import { loadUsers } from '../features/users/UsersSlise';
import { useSelector } from 'react-redux';
import UsersListPage from '../features/users/UsersListPage';
import ItemItemPage from '../features/item/ItemItemPage';
import TasksPageAtWork from '../features/tasks/TasksPageAtWork';

// import { User } from '../redux/reducers/types';

function App(): JSX.Element {

const [menu, setMenu] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadItems()).catch(console.log);
    dispatch(loadUsers()).catch(console.log);
    dispatch(checkUser()).catch(console.log);     
    dispatch(loadTasks()).catch(console.log);
    setTimeout(() => dispatch(stopLoading()), 1000)
  }, [])
  
  //раскоменти чтобы включить курсор
  
  // interface CursorElement extends HTMLElement {
  //   style: CSSStyleDeclaration;
  // }
  
  // let cursor: CursorElement | null = document.querySelector('.cursor');
  // let cursor2: CursorElement | null = document.querySelector('.cursor2');
  
  // document.addEventListener('mousemove', function(e: MouseEvent) {
  //   if (cursor && cursor2) {
  //     cursor.style.left = cursor2.style.left = e.clientX + 'px';
  //     cursor.style.top = cursor2.style.top = e.clientY + 'px';
  //   }
  // });

  //два дива внизу тоже часть курсора  (cursor, cursor2)

  return (
    <div className="App">
      {/* <div className='cursor'></div>
    <div className='cursor2'></div> */}
       {menu && <Menu menu={menu} setMenu={setMenu} />}
      <Routes>
         <Route path="/" element={<NavBar menu={menu} setMenu={setMenu} />} >
         <Route index element={<MainPage />} />
         <Route path="/sign-up" element={<SignUpPage />} />
         <Route path="/sign-in" element={<SignInPage />} />
         <Route path="/profile/items" element={<ProfileItemListPage />} />
         <Route path="/profile/likes" element={<LikesPage />} />
         <Route path="/tasks" element={<TasksListPage />} />
         <Route path="/profile/tasks" element={<TasksListPage />} />
         <Route path="/profile/tasks/at-work" element={<TasksPageAtWork />} />
         <Route path="/tasks/:taskId" element={<TaskItemPage />} />
         <Route path="/items/:itemId" element={<ItemItemPage />} />
         <Route path="/users" element={<UsersListPage />} />
         <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
