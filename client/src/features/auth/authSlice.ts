/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AuthState, Like, UserSignIn, UserSignUp, likeId, userId } from './types';
import { fetchCheckUser, fetchSignIn, fetchSignUp, fetchLogOut, fetchLike, fetchDisLike } from '../../App/api';
import { ItemId } from '../item/types';

const initialState: AuthState = {
  auth: undefined,
  error: undefined,
};

export const checkUser = createAsyncThunk('auth/check', () => fetchCheckUser());
export const signIn = createAsyncThunk('auth/signIn', (user: UserSignIn) => fetchSignIn(user));
export const signUp = createAsyncThunk('auth/signUp', (user: UserSignUp) => fetchSignUp(user));
export const logOut = createAsyncThunk('auth/logOut', () => fetchLogOut());
export const like = createAsyncThunk('auth/like', ({userId, itemId}:{userId: userId, itemId:ItemId}) => fetchLike({userId, itemId}));
export const disLike = createAsyncThunk('auth/disLike', ({likeId, userId}:{likeId:likeId, userId: userId}) => fetchDisLike({likeId,userId}));

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
      })
      .addCase(logOut.fulfilled, (state) => {
        state.auth = undefined;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(like.fulfilled, (state, action) => {
          state.auth?.Likes.push(action.payload);
        
      })
      .addCase(like.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(disLike.fulfilled, (state, action) => {
          if (state.auth?.Likes) {
            state.auth.Likes = state.auth?.Likes.filter((like)=> like.id !== +action.payload)
          }
        
      })
      .addCase(disLike.rejected, (state, action) => {
        state.error = action.error.message;
      })
  },
});

export default authSlice.reducer;
