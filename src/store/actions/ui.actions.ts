import { createAction } from '@reduxjs/toolkit';

import { TaskDialogPayload } from '@payloads/task-dialog.payload';
import { ConfirmationDialogPayload } from '@components/ConfirmationDialog/domain/confirmation-dialog.payload';

const uiActions = {
  openTaskDialog: createAction<TaskDialogPayload>('OPEN_TASK_DIALOG'),
  closeTaskDialog: createAction<void>('CLOSE_TASK_DIALOG'),

  openConfirmationDialog: createAction<ConfirmationDialogPayload>('OPEN_CONFIRMATION_DIALOG'),
  closeConfirmationDialog: createAction<boolean>('CLOSE_CONFIRMATION_DIALOG'),

  openSettingsDialog: createAction<void>('OPEN_SETTINGS_DIALOG'),
  closeSettingsDialog: createAction<void>('CLOSE_SETTINGS_DIALOG'),
};

export default uiActions;