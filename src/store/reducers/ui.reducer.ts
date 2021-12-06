import { createReducer } from '@reduxjs/toolkit';

import { UiState } from '@store/interfaces/ui-state.interface';
import uiActions from '@store/actions/ui.actions';

export const initialUiState: UiState = {
  addTaskDialogOpened: false,
  addTaskDialogData: null
};

const uiReducer = createReducer(initialUiState, (builder) => {
  builder
    .addCase(uiActions.openAddTaskDialog, (state, { payload }) => {
      state.addTaskDialogOpened = true;
      state.addTaskDialogData = payload;
    })

    .addCase(uiActions.closeAddTaskDialog, (state) => {
      state.addTaskDialogOpened = false;
      state.addTaskDialogData = null;
    })
});

export default uiReducer;