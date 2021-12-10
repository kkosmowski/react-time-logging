import { createReducer } from '@reduxjs/toolkit';

import { TaskState } from '../interfaces/task-state.interface';
import taskActions from '../actions/task.actions';

export const initialTaskState: TaskState = {
  tasks: [],
  addInProgress: false,
  tasksLoading: false,
};

const taskReducer = createReducer(initialTaskState, (builder) => {
  builder
    .addCase(taskActions.add, (state) => {
      state.addInProgress = true;
    })
    .addCase(taskActions.addSuccess, (state, { payload }) => {
      state.addInProgress = false;
      state.tasks = [...state.tasks, payload];
    })

    .addCase(taskActions.getAll, (state) => {
      state.tasksLoading = true;
    })
    .addCase(taskActions.getAllSuccess, (state, { payload }) => {
      state.tasksLoading = false;
      state.tasks = payload;
    })

    .addCase(taskActions.update, (state) => {
      state.tasksLoading = true;
    })
    .addCase(taskActions.updateSuccess, (state, { payload }) => {
      state.tasksLoading = false;
      state.tasks = state.tasks.map(task => task.id === payload.id
        ? { ...task, ...payload.update }
        : task
      );
    })

    .addCase(taskActions.delete, (state) => {
      state.tasksLoading = true;
    })
    .addCase(taskActions.deleteSuccess, (state, { payload }) => {
      state.tasksLoading = false;
      state.tasks = state.tasks.filter(task => task.id !== payload);
    })

    .addCase(taskActions.duplicate, (state) => {
      state.tasksLoading = true;
    })
    .addCase(taskActions.duplicateSuccess, (state, { payload }) => {
      state.tasksLoading = false;
      state.tasks = [...state.tasks, payload];
    })

    .addCase(taskActions.reorder, (state) => {
      state.tasksLoading = true;
    })
    .addCase(taskActions.reorderSuccess, (state, { payload }) => {
      state.tasksLoading = false;
      state.tasks = payload;
    })

    .addCase(taskActions.paste, (state) => {
      state.tasksLoading = true;
    })
    .addCase(taskActions.pasteCutTaskSuccess, (state, { payload }) => {
      state.tasksLoading = false;
      state.tasks = state.tasks.map(task => task.id === payload.id ? payload : task);
    })
});

export default taskReducer;