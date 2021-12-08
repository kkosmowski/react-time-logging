import { createReducer } from '@reduxjs/toolkit';

import { TaskState } from '../interfaces/task-state.interface';
import taskActions from '../actions/task.actions';

export const initialTaskState: TaskState = {
  tasks: [],
  addInProgress: false,
  tasksLoading: false,
  updateInProgress: false,
  deleteInProgress: false,
  duplicationInProgress: false,
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
      state.updateInProgress = true;
    })
    .addCase(taskActions.updateSuccess, (state, { payload }) => {
      state.updateInProgress = false;
      state.tasks = state.tasks.map(task => task.id === payload.id
        ? { ...task, ...payload.update }
        : task
      );
    })

    .addCase(taskActions.delete, (state) => {
      state.deleteInProgress = true;
    })
    .addCase(taskActions.deleteSuccess, (state, { payload }) => {
      state.deleteInProgress = false;
      state.tasks = state.tasks.filter(task => task.id !== payload);
    })

    .addCase(taskActions.duplicate, (state) => {
      state.duplicationInProgress = true;
    })
    .addCase(taskActions.duplicateSuccess, (state, { payload }) => {
      state.duplicationInProgress = false;
      state.tasks = [...state.tasks, payload];
    })
});

export default taskReducer;