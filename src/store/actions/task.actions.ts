import { createAction } from '@reduxjs/toolkit';

import { Task } from '@interfaces/task.interface';
import { UpdatePayload } from '@payloads/task-update.payload';

const taskActions = {
  add: createAction<void>('ADD_TASK'),
  addSuccess: createAction<Task>('ADD_TASK_SUCCESS'),

  getAll: createAction<void>('GET_TASKS'),
  getAllSuccess: createAction<Task[]>('GET_TASKS_SUCCESS'),

  update: createAction<void>('UPDATE_TASK'),
  updateSuccess: createAction<UpdatePayload<Task>>('UPDATE_TASK_SUCCESS'),
};

export default taskActions;