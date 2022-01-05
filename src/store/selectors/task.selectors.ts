import { createSelector, Selector } from 'reselect';

import { RootState } from '../interfaces/root-state.interface';
import { EntityUid } from '@mytypes/entity-uid.type';

const taskSelector = (state: RootState) => state.task;

const taskSelectors = {
  tasks: createSelector(taskSelector, task => task.tasks),
  filtered: createSelector(taskSelector, task => task.filteredTasks),
  tasksLoading: createSelector(taskSelector, task => task.tasksLoading),
  addInProgress: createSelector(taskSelector, task => task.addInProgress),
  totalMinutesOnDate: (date: string): Selector<RootState, number> => createSelector(taskSelector, task => task.tasks
    .filter(task => task.date === date)
    .reduce((total, task) => total + task.duration, 0)
  ),
  selectionMode: (date: string): Selector<RootState, boolean> => createSelector(taskSelector, task => task.selectionMode[date]),
  selected: (date: string): Selector<RootState, EntityUid[]> => createSelector(taskSelector, task => task.selected[date]),
  filters: createSelector(taskSelector, task => task.filters),
  defaultFilters: createSelector(taskSelector, task => task.defaultFilters),
}

export default taskSelectors;