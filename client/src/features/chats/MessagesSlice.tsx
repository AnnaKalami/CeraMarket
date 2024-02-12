import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type MessagesState } from "./types";
import { fetchLoadMessages } from "../../App/api";

const initialState: MessagesState = {
    messages: [],
    error: undefined,
    // loading: true,
    };


export const loadMessages = createAsyncThunk('messages/load', ()=>fetchLoadMessages())

const messagesSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
        .addCase(loadMessages.fulfilled, (state,action) => {
            state.messages = action.payload
        }) 
        .addCase(loadMessages.rejected, (state, action) => {
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

export default messagesSlice.reducer;