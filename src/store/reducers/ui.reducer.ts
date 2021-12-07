import { createReducer } from '@reduxjs/toolkit';

import { UiState } from '../interfaces/ui-state.interface';
import uiActions from '../actions/ui.actions';

export const initialUiState: UiState = {
  taskDialog: {
    opened: false,
    data: null,
  },
  confirmationDialog: {
    opened: false,
    action: null,
    result: null,
  },
  settingsDialogOpened: false,
};

const uiReducer = createReducer(initialUiState, (builder) => {
  builder
    .addCase(uiActions.openTaskDialog, (state, { payload }) => {
      state.taskDialog = {
        opened: true,
        data: payload,
      };
    })
    .addCase(uiActions.closeTaskDialog, (state) => {
      state.taskDialog = {
        opened: false,
        data: null,
      };
    })

    .addCase(uiActions.openConfirmationDialog, (state, { payload }) => {
      state.confirmationDialog = {
        opened: true,
        action: payload,
        result: null,
      };
    })
    .addCase(uiActions.closeConfirmationDialog, (state, { payload }) => {
      state.confirmationDialog = {
        opened: false,
        action: null,
        result: payload,
      };
    })

    .addCase(uiActions.openSettingsDialog, (state) => {
      state.settingsDialogOpened = true;
    })
    .addCase(uiActions.closeSettingsDialog, (state) => {
      state.settingsDialogOpened = false;
    })
});

export default uiReducer;