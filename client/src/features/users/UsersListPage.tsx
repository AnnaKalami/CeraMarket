import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/store';
import 'swiper/css'
import 'swiper/css/autoplay'
import ItemItem from '../item/ItemItem';
import UserItem from './UserItem';
const UsersListPage = (): JSX.Element => {
    
    const users = useSelector((store: RootState) => store.users.users);
  
  return (
    <>
    <div className='container-images'>
    </div>
    <div className="item-page__container">
    {users.filter((userFilter)=> !userFilter.isAdmin).map((user) => (
      <UserItem key={user.id} user={user} />
    ))}
  </div>
  </>
  );
};

export default UsersListPage;
