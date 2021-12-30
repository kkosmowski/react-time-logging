import { createReducer, Draft } from '@reduxjs/toolkit';

import { TaskState } from '../interfaces/task-state.interface';
import taskActions from '../actions/task.actions';
import { TaskModel } from '@interfaces/task.interface';
import { EntityUid } from '@mytypes/entity-uid.type';
import { INITIAL_FILTERS } from '@consts/task.consts';

export const initialTaskState: TaskState = {
  tasks: [],
  filteredTasks: [],
  addInProgress: false,
  tasksLoading: false,
  selectionMode: {},
  selected: {},
  filters: INITIAL_FILTERS,
};

const filterTasksHelper = (state: Draft<TaskState>): void => {
  state.filteredTasks = state.tasks.filter((task) => {
    if (state.filters.categories.length === 0) {
      return true;
    }

    const taskCategories: EntityUid[] = task.categories.map(category => category.id);

    if (state.filters.allCategoriesRequired) {
      return state.filters.categories.every((category) => taskCategories.includes(category.id));
    } else {
      return state.filters.categories.some((category) => taskCategories.includes(category.id));
    }
  });
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
      filterTasksHelper(state);
    })

    .addCase(taskActions.update, (state) => {
      state.tasksLoading = true;
    })
    .addCase(taskActions.updateSuccess, (state, { payload }) => {
      const mapFn = (task: TaskModel) => task.id === payload.id
        ? { ...task, ...payload.update }
        : task;

      state.tasksLoading = false;
      state.tasks = state.tasks.map(mapFn);
      state.filteredTasks = state.filteredTasks.map(mapFn);
    })

    .addCase(taskActions.delete, (state) => {
      state.tasksLoading = true;
    })
    .addCase(taskActions.deleteSuccess, (state, { payload }) => {
      const filterFn = (task: TaskModel) => task.id !== payload;
      state.tasksLoading = false;
      state.tasks = state.tasks.filter(filterFn);
      state.filteredTasks = state.filteredTasks.filter(filterFn);
    })

    .addCase(taskActions.deleteMultiple, (state) => {
      state.tasksLoading = true;
    })
    .addCase(taskActions.deleteMultipleSuccess, (state, { payload }) => {
      const filterFn = (task: TaskModel) => !payload.includes(task.id);

      state.tasksLoading = false;
      state.tasks = state.tasks.filter(filterFn);
      state.filteredTasks = state.filteredTasks.filter(filterFn);
    })

    .addCase(taskActions.duplicate, (state) => {
      state.tasksLoading = true;
    })
    .addCase(taskActions.duplicateSuccess, (state, { payload }) => {
      state.tasksLoading = false;
      state.tasks = [...state.tasks, payload];
      filterTasksHelper(state);
    })

    .addCase(taskActions.reorder, (state) => {
      state.tasksLoading = true;
    })
    .addCase(taskActions.reorderSuccess, (state, { payload }) => {
      state.tasksLoading = false;
      state.tasks = payload;
      filterTasksHelper(state);
    })

    .addCase(taskActions.paste, (state) => {
      state.tasksLoading = true;
    })
    .addCase(taskActions.pasteCutTaskSuccess, (state, { payload }) => {
      state.tasksLoading = false;
      state.tasks = state.tasks.map(task => task.id === payload.id ? payload : task);
      filterTasksHelper(state);
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

    .addCase(taskActions.updateFilters, (state, { payload }) => {
      state.filters = payload;
      filterTasksHelper(state);
    })
});

export default taskReducer;