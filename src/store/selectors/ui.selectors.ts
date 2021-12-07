import { createSelector } from 'reselect';

import { RootState } from '../interfaces/root-state.interface';

const uiSelector = (state: RootState) => state.ui;

const uiSelectors = {
  taskDialog: createSelector(uiSelector, ui => ui.taskDialog),
  taskDialogOpened: createSelector(uiSelector, ui => ui.taskDialog.opened),

  confirmationDialogOpened: createSelector(uiSelector, ui => ui.confirmationDialog.opened),
  confirmationDialog: createSelector(uiSelector, ui => ui.confirmationDialog),
}

export default uiSelectors;