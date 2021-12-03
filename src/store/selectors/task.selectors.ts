import { createSelector } from 'reselect';
import { RootState } from '@store/interfaces/root-state.interface';

const taskSelector = (state: RootState) => state.task;

const taskSelectors = {
  tasks: createSelector(taskSelector, task => task.tasks)
}

export default taskSelectors;