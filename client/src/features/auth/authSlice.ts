/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AuthState, UserSignIn, UserSignUp } from './types';
import { fetchCheckUser, fetchSignIn, fetchSignUp } from '../../App/api';

const initialState: AuthState = {
  auth: undefined,
  error: undefined,
};

export const checkUser = createAsyncThunk('auth/check', () => fetchCheckUser());
export const signIn = createAsyncThunk('auth/signIn', (user: UserSignIn) => fetchSignIn(user));
export const signUp = createAsyncThunk('auth/signUp', (user: UserSignUp) => fetchSignUp(user));

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.fulfilled, (state, action) => {
        state.auth = action.payload;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.auth = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.auth = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
