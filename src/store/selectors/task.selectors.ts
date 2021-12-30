import { createSelector } from 'reselect';

import { RootState } from '../interfaces/root-state.interface';

const taskSelector = (state: RootState) => state.task;

const taskSelectors = {
  tasks: createSelector(taskSelector, task => task.tasks),
  filtered: createSelector(taskSelector, task => task.filteredTasks),
  tasksLoading: createSelector(taskSelector, task => task.tasksLoading),
  addInProgress: createSelector(taskSelector, task => task.addInProgress),
  totalMinutesOnDate: (date: string) => createSelector(taskSelector, task => task.tasks
    .filter(t => t.date === date)
    .reduce((total, task) => total + task.duration, 0)
  ),
  selectionMode: (date: string) => createSelector(taskSelector, task => task.selectionMode[date]),
  selected: (date: string) => createSelector(taskSelector, task => task.selected[date]),
}

export default taskSelectors;