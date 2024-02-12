import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type ChatsState } from "./types";
import {fetchLoadChats} from "../../App/api";


const initialState: ChatsState = {
    chats: [],
    error: undefined,
    // loading: true,
    };

export const loadChats = createAsyncThunk('chats/load', ()=> fetchLoadChats())

// export const deleteUser = createAsyncThunk('users/delete', (id:userId)=> fetchDeleteUser(id))
const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
        .addCase(loadChats.fulfilled, (state,action) => {
            state.chats = action.payload
        }) 
        .addCase(loadChats.rejected, (state, action) => {
            state.error = action.error.message;
        })  
    
        
        // .addCase(deleteUser.fulfilled, (state, action) => {
        //     state.users = state.users.filter((user) => user.id !== +action.payload);
        //   })
        // .addCase(deleteUser.rejected, (state, action) => {
        //     state.error = action.error.message;
        // })
    }
})
// dispatch({ type: 'users/load', payload: data.users });

// export const { stopLoading } = tasksSlice.actions;

export default chatsSlice.reducer;