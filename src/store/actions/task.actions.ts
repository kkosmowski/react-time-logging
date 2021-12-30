import { createAction } from '@reduxjs/toolkit';

import { TaskModel } from '@interfaces/task.interface';
import { UpdatePayload } from '@payloads/update.payload';
import { EntityUid } from '@mytypes/entity-uid.type';
import { SelectionModePayload } from '@payloads/selection-mode.payload';
import { SelectTaskPayload } from '@payloads/select-task.payload';
import { FiltersInterface } from '@interfaces/filters.interface';

const taskActions = {
  add: createAction<void>('ADD_TASK'),
  addSuccess: createAction<TaskModel>('ADD_TASK_SUCCESS'),

  getAll: createAction<void>('GET_TASKS'),
  getAllSuccess: createAction<TaskModel[]>('GET_TASKS_SUCCESS'),

  update: createAction<void>('UPDATE_TASK'),
  updateSuccess: createAction<UpdatePayload<TaskModel>>('UPDATE_TASK_SUCCESS'),

  delete: createAction<void>('DELETE_TASK'),
  deleteSuccess: createAction<EntityUid>('DELETE_TASK_SUCCESS'),

  deleteMultiple: createAction<void>('DELETE_MULTIPLE_TASKS'),
  deleteMultipleSuccess: createAction<EntityUid[]>('DELETE_MULTIPLE_TASKS_SUCCESS'),

  duplicate: createAction<void>('DUPLICATE_TASK'),
  duplicateSuccess: createAction<TaskModel>('DUPLICATE_TASK_SUCCESS'),

  reorder: createAction<void>('TASKS_REORDER'),
  reorderSuccess: createAction<TaskModel[]>('TASKS_REORDER_SUCCESS'),

  paste: createAction<void>('PASTE_TASK'),
  pasteCutTaskSuccess: createAction<TaskModel>('PASTE_CUT_TASK_SUCCESS'),

  toggleSelectionMode: createAction<SelectionModePayload>('TOGGLE_SELECTION_MODE'),
  select: createAction<SelectTaskPayload>('SELECT_TASK'),
  deselect: createAction<SelectTaskPayload>('DESELECT_TASK'),

  updateFilters: createAction<FiltersInterface>('UPDATE_FILTERS'),
};

export default taskActions;