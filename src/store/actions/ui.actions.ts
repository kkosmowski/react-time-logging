import { createAction } from '@reduxjs/toolkit';

import { ConfirmationAction } from '@enums/confirmation-action.enum';

const uiActions = {
  openTaskDialog: createAction<string>('OPEN_TASK_DIALOG'),
  closeTaskDialog: createAction<void>('CLOSE_TASK_DIALOG'),

  openConfirmationDialog: createAction<ConfirmationAction>('OPEN_CONFIRMATION_DIALOG'),
  closeConfirmationDialog: createAction<boolean>('CLOSE_CONFIRMATION_DIALOG'),
};

export default uiActions;