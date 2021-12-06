import { createReducer } from '@reduxjs/toolkit';

import { UiState } from '@store/interfaces/ui-state.interface';
import uiActions from '@store/actions/ui.actions';

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
});

export default uiReducer;