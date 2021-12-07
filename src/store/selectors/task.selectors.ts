import { createSelector } from 'reselect';

import { RootState } from '../interfaces/root-state.interface';

const taskSelector = (state: RootState) => state.task;

const taskSelectors = {
  tasks: createSelector(taskSelector, task => task.tasks),
  tasksLoading: createSelector(taskSelector, task => task.tasksLoading),
  addInProgress: createSelector(taskSelector, task => task.addInProgress),
}

export default taskSelectors;