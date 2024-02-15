import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/store';
import 'swiper/css'
import 'swiper/css/autoplay'
import UserItem from './UserItem';
import Page404 from '../404/Page404';
const UsersListPage = (): JSX.Element => {
    
    const users = useSelector((store: RootState) => store.users.users);
    const userOnline = useSelector((store: RootState) => store.auth.auth);
  return (
    <>
    {userOnline?.isAdmin ?(
      <>
    
      <div className='container-images'>
      </div>
      <div className="item-page__container">
      {users.filter((userFilter)=> !userFilter.isAdmin).map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
    
  </>
    ):(
      <Page404/>
    )}</>

  );
};

export default UsersListPage;
