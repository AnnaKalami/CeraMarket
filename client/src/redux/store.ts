import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// import heroesSlice from '../features/heroes/heroesSlice';
// import authSlice from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    // users: usersReducer,
    // heroes: heroesSlice,
    // auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
