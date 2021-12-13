import { createSelector } from 'reselect';

import { RootState } from '../interfaces/root-state.interface';

const uiSelector = (state: RootState) => state.ui;

const uiSelectors = {
  taskDialog: createSelector(uiSelector, ui => ui.taskDialog),
  taskDialogOpened: createSelector(uiSelector, ui => ui.taskDialog.opened),

  confirmationDialogOpened: createSelector(uiSelector, ui => ui.confirmationDialog.opened),
  confirmationDialog: createSelector(uiSelector, ui => ui.confirmationDialog),

  settingsDialogOpened: createSelector(uiSelector, ui => ui.settingsDialogOpened),

  clipboard: createSelector(uiSelector, ui => ui.clipboard),

  settings: createSelector(uiSelector, ui => ui.settings),
}

export default uiSelectors;