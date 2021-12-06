import { createAction } from '@reduxjs/toolkit';
import { Task } from '@interfaces/task.interface';

const taskActions = {
  add: createAction<void>('ADD_TASK'),
  addSuccess: createAction<Task>('ADD_TASK_SUCCESS'),

  getAll: createAction<void>('GET_TASKS'),
  getAllSuccess: createAction<Task[]>('GET_TASKS_SUCCESS'),
};

export default taskActions;