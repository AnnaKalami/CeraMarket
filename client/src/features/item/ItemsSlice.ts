import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ItemsState } from './types';
import { fetchLoadItems } from '../../App/api';


const initialState: ItemsState = {
    items: [],
    error: undefined,
    loading: true,
  };

  export const loadItems = createAsyncThunk('items/load', ()=> fetchLoadItems())

  
const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        stopLoading: (state) => {
            state.loading = false;
          },
    },
    extraReducers: (builder)=> {
        builder
        .addCase(loadItems.fulfilled, (state,action) => {
            state.items = action.payload
        })
        .addCase(loadItems.pending, (state) => {
            state.loading = true;
          })
        .addCase(loadItems.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
})

export const { stopLoading } = itemsSlice.actions;
export default itemsSlice.reducer;