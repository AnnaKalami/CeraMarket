import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ItemId, ItemWithOutId, ItemsState } from './types';
import { fetchAddItem, fetchLoadItems, fetchRemoveItem } from '../../App/api';


const initialState: ItemsState = {
    items: [],
    error: undefined,
    loading: true,
  };

  export const loadItems = createAsyncThunk('items/load', ()=> fetchLoadItems())
  export const addItem = createAsyncThunk('items/add', (item: ItemWithOutId) => fetchAddItem(item));
  export const removeItem = createAsyncThunk('items/remove', (itemId:ItemId)=> fetchRemoveItem(itemId))
  
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
        .addCase(addItem.fulfilled, (state, action) => {
            state.items.push(action.payload);
          })
        .addCase(addItem.rejected, (state, action) => {
            state.error = action.error.message;
        })
        .addCase(removeItem.fulfilled, (state, action) => {
            state.items = state.items.filter((item) => item.id !== +action.payload);
          })
        .addCase(removeItem.rejected, (state, action) => {
            state.error = action.error.message;
        });
    }
})

export const { stopLoading } = itemsSlice.actions;
export default itemsSlice.reducer;