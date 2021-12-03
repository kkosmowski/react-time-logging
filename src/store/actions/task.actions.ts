import { createAction } from '@reduxjs/toolkit';
import { Task } from '@interfaces/task.interface';

const taskActions = {
  add: createAction<Task>('ADD_TASK'),
};

export default taskActions;