import { createSelector } from 'reselect';
import { RootState } from '@store/interfaces/root-state.interface';

const uiSelector = (state: RootState) => state.ui;

const uiSelectors = {
  addTaskDialogOpened: createSelector(uiSelector, ui => ui.addTaskDialogOpened)
}

export default uiSelectors;