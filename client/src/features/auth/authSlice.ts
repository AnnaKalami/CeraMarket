/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, Like, UserSignIn, UserSignUp, likeId, userId } from './types';
import {
  fetchCheckUser,
  fetchSignIn,
  fetchSignUp,
  fetchLogOut,
  fetchLike,
  fetchDisLike,
} from '../../App/api';
import type { ItemId } from '../item/types';

const initialState: AuthState = {
  auth: undefined,
  error: undefined,
  name: '',
  email: '',
  password: '',
  rpassword: '',
  nameError: undefined,
  emailError: undefined,
  passwordError: undefined,
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Регулярное выражение для проверки формата электронной почты

export const validatePassword = (password: string): string | undefined => {
  if (password.length < 3) {
    return 'Пароль должен быть длиннее 3 символов';
  }
  return undefined;
};

export const validatePasswordsMatch = (password: string, rpassword: string): string | undefined => {
  if (password !== rpassword) {
    return 'Пароли не совпадают!';
  }
  return undefined;
};
export const validateEmailFormat = (email: string): string | undefined => {
  // console.log(email, 'ee');
  if (!emailRegex.test(email)) {
    return 'Некорректный формат электронной почты!';
  }
  return undefined;
};
export const validateEmailAuthorization = (email: string): string | undefined => {
  if (!emailRegex.test(email)) {
    return 'Такой пользователь не существует или пароль неверный!';
  }
  return undefined;
};

export const checkUser = createAsyncThunk('auth/check', () => fetchCheckUser());
export const signIn = createAsyncThunk('auth/signIn', (user: UserSignIn) => fetchSignIn(user));
export const signUp = createAsyncThunk('auth/signUp', (formData: FormData) =>
  fetchSignUp(formData),
);
export const logOut = createAsyncThunk('auth/logOut', () => fetchLogOut());
export const like = createAsyncThunk(
  'auth/like',
  ({ userId, itemId }: { userId: userId; itemId: ItemId }) => fetchLike({ userId, itemId }),
);
export const disLike = createAsyncThunk('auth/disLike', ({ likeId }: { likeId: likeId }) =>
  fetchDisLike({ likeId }),
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
    setPasswordErrorLength: (state, action: PayloadAction<string | undefined>) => {
      state.passwordError = action.payload;
    },
    setPasswordMatchError(state, action: PayloadAction<string | undefined>) {
      const rpassword = action.payload || '';
      // console.log(state.password, rpassword);
      const passwordError = validatePasswordsMatch(state.password, rpassword);
      state.passwordError = passwordError;
    },
    setEmailError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
    setPasswordErrorAuth: (state, action) => {
      state.passwordError = action.payload;
    },
    setEmailErrorAuth: (state, action) => {
      state.emailError = action.payload;
    },
  },
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
          state.auth.Likes = state.auth?.Likes.filter((like) => like.id !== +action.payload);
        }
      })
      .addCase(disLike.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const {
  clearError,
  setPasswordErrorLength,
  setEmailError,
  setPasswordMatchError,
  setEmailErrorAuth,
  setPasswordErrorAuth,
} = authSlice.actions;
export default authSlice.reducer;
