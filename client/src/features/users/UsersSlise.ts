import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type UsersState } from "./types";
import { fetchDeleteUser, fetchLoadUsers } from "../../App/api";
import { type UserId } from "../auth/types";

const initialState: UsersState = {
    users: [],
    error: undefined,
    // loading: true,
  };

export const loadUsers = createAsyncThunk('users/load', ()=> fetchLoadUsers())
export const deleteUser = createAsyncThunk('users/delete', (id:UserId)=> fetchDeleteUser(id))

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
        .addCase(loadUsers.fulfilled, (state,action) => {
            state.users = action.payload
        }) 
        .addCase(loadUsers.rejected, (state, action) => {
            state.error = action.error.message;
        })  
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter((user) => user.id !== +action.payload);
          })
        .addCase(deleteUser.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
})
// dispatch({ type: 'users/load', payload: data.users });







// export const { stopLoading } = tasksSlice.actions;
export default usersSlice.reducer;