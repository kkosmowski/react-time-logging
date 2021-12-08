import { createAction } from '@reduxjs/toolkit';

import { Task } from '@interfaces/task.interface';
import { UpdatePayload } from '@payloads/task-update.payload';
import { EntityUid } from '@mytypes/entity-uid.type';

const taskActions = {
  add: createAction<void>('ADD_TASK'),
  addSuccess: createAction<Task>('ADD_TASK_SUCCESS'),

  getAll: createAction<void>('GET_TASKS'),
  getAllSuccess: createAction<Task[]>('GET_TASKS_SUCCESS'),

  update: createAction<void>('UPDATE_TASK'),
  updateSuccess: createAction<UpdatePayload<Task>>('UPDATE_TASK_SUCCESS'),

  delete: createAction<void>('DELETE_TASK'),
  deleteSuccess: createAction<EntityUid>('DELETE_TASK_SUCCESS'),

  duplicate: createAction<void>('DUPLICATE_TASK'),
  duplicateSuccess: createAction<Task>('DUPLICATE_TASK_SUCCESS'),
};

export default taskActions;