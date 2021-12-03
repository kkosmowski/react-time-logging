import { createReducer } from '@reduxjs/toolkit';

import { UiState } from '@store/interfaces/ui-state.interface';
import uiActions from '@store/actions/ui.actions';

export const initialUiState: UiState = {
  addTaskDialogOpened: false,
};

const uiReducer = createReducer(initialUiState, (builder) => {
  builder
    .addCase(uiActions.openAddTaskDialog, (state) => {
      state.addTaskDialogOpened = true;
    })

    .addCase(uiActions.closeAddTaskDialog, (state) => {
      state.addTaskDialogOpened = false;
    })
});

export default uiReducer;