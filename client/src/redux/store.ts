import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from '../features/auth/authSlice';
import ItemsSlice from '../features/item/ItemsSlice';
import TasksSlise from '../features/tasks/TasksSlise';
import UsersSlise from '../features/users/UsersSlise';


export const store = configureStore({
  reducer: {
    items: ItemsSlice,
    auth: authSlice,
    tasks: TasksSlise,
    users: UsersSlise
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
