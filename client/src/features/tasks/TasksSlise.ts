import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAddAnswer, fetchAddMasterInTask, fetchAddTask, fetchAddTaskWork, fetchConfirmFinishedTask, fetchFinishedTask, fetchLoadTasks, fetchRemoveTask } from '../../App/api';
import type { AnswerWithOutId, TaskId,  TasksState } from './types';
import type { UserId } from '../auth/types';



const initialState: TasksState = {
    tasks: [],
    error: undefined,
    loading: true,
  };

  export const loadTasks = createAsyncThunk('tasks/load', ()=> fetchLoadTasks())
  export const addTask = createAsyncThunk('tasks/add', (formData: FormData) => fetchAddTask(formData));
  export const removeTask = createAsyncThunk('tasks/remove', (taskId:TaskId)=> fetchRemoveTask(taskId))
  export const addTaskAnswer = createAsyncThunk('tasks/addAnswer', (answer: AnswerWithOutId) => fetchAddAnswer(answer));
  export const addMasterInTask = createAsyncThunk('tasks/addMasterInTask', ({userId,taskId}:{userId:UserId,taskId:TaskId}) => fetchAddMasterInTask({userId,taskId}));
  export const addTaskWork = createAsyncThunk('tasks/addWorkTask', (taskId:TaskId) => fetchAddTaskWork(taskId));
  export const finishedTask = createAsyncThunk('tasks/finishedTask', (taskId:TaskId) => fetchFinishedTask(taskId));
  export const confirmFinishedTask = createAsyncThunk('tasks/confirmFinishedTask', (taskId:TaskId) => fetchConfirmFinishedTask(taskId));
  
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        stopLoading: (state) => {
            state.loading = true;
          },
    },
    extraReducers: (builder)=> {
        builder
        .addCase(loadTasks.fulfilled, (state,action) => {
            state.tasks = action.payload
        })
        .addCase(loadTasks.pending, (state) => {
            state.loading = false;
          })
        .addCase(loadTasks.rejected, (state, action) => {
            state.error = action.error.message;
        })
        .addCase(addTask.fulfilled, (state, action) => {
            state.tasks.push(action.payload);
          })
        .addCase(addTask.rejected, (state, action) => {
            state.error = action.error.message;
        })
        .addCase(removeTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== +action.payload);
          })
        .addCase(removeTask.rejected, (state, action) => {
            state.error = action.error.message;
        })
        .addCase(addTaskAnswer.fulfilled, (state, action) => {
            
            state.tasks = state.tasks.map((task)=> task.id === action.payload.id? action.payload: task)
          })
        .addCase(addTaskAnswer.rejected, (state, action) => {
            state.error = action.error.message;
        })
        .addCase(addMasterInTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.map((task)=> task.id === action.payload.id? action.payload: task)
          })
        .addCase(addMasterInTask.rejected, (state, action) => {
            state.error = action.error.message;
        })
        .addCase(addTaskWork.fulfilled, (state, action) => {
            state.tasks = state.tasks.map((task)=> task.id === action.payload.id? action.payload: task)
          })
        .addCase(addTaskWork.rejected, (state, action) => {
            state.error = action.error.message;
        })
        .addCase(finishedTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.map((task)=> task.id === action.payload.id? action.payload: task)
          })
        .addCase(finishedTask.rejected, (state, action) => {
            state.error = action.error.message;
        })
        .addCase(confirmFinishedTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.map((task)=> task.id === action.payload.id? action.payload: task)
          })
        .addCase(confirmFinishedTask.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
})

// export const { stopLoading } = tasksSlice.actions;
export default tasksSlice.reducer;