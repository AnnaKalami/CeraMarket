import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersState } from "./types";
import { fetchLoadUsers } from "../../App/api";

const initialState: UsersState = {
    users: [],
    error: undefined,
    // loading: true,
  };

export const loadUsers = createAsyncThunk('users/load', ()=> fetchLoadUsers())

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
    }
})
// dispatch({ type: 'users/load', payload: data.users });







// export const { stopLoading } = tasksSlice.actions;
export default usersSlice.reducer;