import { createReducer } from '@reduxjs/toolkit';

import { TaskState } from '@store/interfaces/task-state.interface';
import taskActions from '@store/actions/task.actions';

export const initialTaskState: TaskState = {
  tasks: [],
};

const taskReducer = createReducer(initialTaskState, (btasklder) => {
  btasklder
    .addCase(taskActions.add, (state, { payload }) => {
      state.tasks = [payload, ...state.tasks];
    })
});

export default taskReducer;