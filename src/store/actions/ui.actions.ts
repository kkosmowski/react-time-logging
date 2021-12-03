import { createAction } from '@reduxjs/toolkit';

const uiActions = {
  openAddTaskDialog: createAction<void>('OPEN_ADD_TASK_DIALOG'),
  closeAddTaskDialog: createAction<void>('CLOSE_ADD_TASK_DIALOG'),
};

export default uiActions;