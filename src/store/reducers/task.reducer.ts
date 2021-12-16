import { createReducer } from '@reduxjs/toolkit';

import { TaskState } from '../interfaces/task-state.interface';
import taskActions from '../actions/task.actions';

export const initialTaskState: TaskState = {
  tasks: [],
  addInProgress: false,
  tasksLoading: false,
  selectionMode: {},
  selected: {},
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

    .addCase(taskActions.deleteMultiple, (state) => {
      state.tasksLoading = true;
    })
    .addCase(taskActions.deleteMultipleSuccess, (state, { payload }) => {
      state.tasksLoading = false;
      state.tasks = state.tasks.filter(task => !payload.includes(task.id));
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

    .addCase(taskActions.toggleSelectionMode, (state, { payload }) => {
      const { column, value } = payload;

      state.selectionMode[column] = value;

      if (!payload.value) {
        state.selected[column] = [];
      }
    })
    .addCase(taskActions.select, (state, { payload }) => {
      const { column, taskId } = payload;

      if (!Array.isArray(state.selected[column])) {
        state.selected[column] = [];
      }

      state.selected[column].push(taskId);
    })
    .addCase(taskActions.deselect, (state, { payload }) => {
      const { column, taskId } = payload;
      state.selected[column] = state.selected[column].filter(id => id !== taskId);
    })
});

export default taskReducer;