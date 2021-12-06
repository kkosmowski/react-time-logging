import { createReducer } from '@reduxjs/toolkit';

import { TaskState } from '@store/interfaces/task-state.interface';
import taskActions from '@store/actions/task.actions';

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
});

export default taskReducer;