import { Action, Dispatch } from 'redux';
import { v4 } from 'uuid';
import { Moment } from 'moment';
import i18next from 'i18next';

import taskActions from '../actions/task.actions';
import { TaskModel } from '@interfaces/task.interface';
import { StorageService } from '@services/storage.service';
import { EntityUid } from '@mytypes/entity-uid.type';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import store from '@store/store';
import { RootState } from '@store/interfaces/root-state.interface';
import { reorder } from '@utils/reorder.util';
import { ClipboardAction } from '@enums/clipboard-action.enum';
import { ClipboardPayload } from '@payloads/clipboard.payload';
import { SelectionModePayload } from '@payloads/selection-mode.payload';
import { SelectTaskPayload } from '@payloads/select-task.payload';
import { TaskDialogPayload } from '@payloads/task-dialog.payload';
import { FiltersInterface, FiltersModel } from '@interfaces/filters.interface';
import { INITIAL_FILTERS } from '@consts/task.consts';
import { filtersInterfaceToModel, filtersModelToInterface } from '@utils/filters.utils';

const taskActionCreators = {
  add(task: TaskModel): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(taskActions.add());
      await StorageService.add<TaskModel>('tasks', task);
      dispatch(taskActions.addSuccess(task));
    }
  },

  getAll(): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(taskActions.getAll());
      const tasks = await StorageService.getAll<TaskModel[]>('tasks');
      dispatch(taskActions.getAllSuccess(tasks));
    }
  },

  update(taskId: EntityUid, update: Partial<TaskModel>): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(taskActions.update());
      await StorageService.update<TaskModel>('tasks', { id: taskId }, update);
      dispatch(taskActions.updateSuccess({ id: taskId, update }));
    }
  },

  delete(taskId: EntityUid): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(taskActions.delete());
      await StorageService.delete('tasks', taskId);
      dispatch(taskActions.deleteSuccess(taskId));
    }
  },
  deleteMultiple(taskIds: EntityUid[]): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(taskActions.deleteMultiple());

      taskIds.forEach(async (id) => {
        await StorageService.delete('tasks', id).catch();
      });

      dispatch(taskActions.deleteMultipleSuccess(taskIds));
    }
  },

  duplicate(taskId: EntityUid, update?: Partial<TaskModel>): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(taskActions.duplicate());
      const uiReducer = (store.getState() as RootState).ui;
      const taskDialogOpened = uiReducer.taskDialog.opened;
      const taskDialogPayload: TaskDialogPayload | null = uiReducer.taskDialog.data;

      if (taskDialogOpened) {
        dispatch(uiActionCreators.closeTaskDialog());
      }

      const task: TaskModel | undefined = (store.getState() as RootState).task.tasks
        .find((task) => task.id === taskId);

      if (!task) return;

      const copyOfTask = i18next.t('COMMON:COPY_OF_TASK', { title: task.title });
      const duplicatedTask = {
        ...task,
        ...update,
        title: copyOfTask,
        id: v4(),
      };
      await StorageService.add<TaskModel>('tasks', duplicatedTask);

      dispatch(taskActions.duplicateSuccess(duplicatedTask));

      if (taskDialogOpened && taskDialogPayload) {
        dispatch(uiActionCreators.openTaskDialog({
          ...taskDialogPayload,
          task: duplicatedTask,
          totalColumnMinutes: (taskDialogPayload.totalColumnMinutes || 0) + duplicatedTask.duration,
        }));
      }
    }
  },

  reorder(startId: EntityUid, endId: EntityUid, modifier = 0): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(taskActions.reorder());
      const tasks: TaskModel[] = (store.getState() as RootState).task.tasks;
      const taskIds: EntityUid[] = tasks.map(task => task.id);
      const reorderedTasks = reorder(tasks, taskIds.indexOf(startId), taskIds.indexOf(endId) + modifier);
      await StorageService.set<TaskModel[]>('tasks', null, reorderedTasks);
      dispatch(taskActions.reorderSuccess(reorderedTasks));
    }
  },

  paste(clipboard: ClipboardPayload, columnDate: Moment): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(taskActions.paste());

      const update: Partial<TaskModel> = { date: columnDate.toISOString() };

      if (clipboard.action === ClipboardAction.Cut) {
        dispatch(uiActionCreators.modifyClipboardAfterPastedCut());
        await taskActionCreators.update(clipboard.task.id, update)(dispatch);
      } else {
        await taskActionCreators.duplicate(clipboard.task.id, update)(dispatch);
      }
    }
  },

  toggleSelectionMode(payload: SelectionModePayload): Action {
    return taskActions.toggleSelectionMode(payload);
  },
  select(payload: SelectTaskPayload): Action {
    return taskActions.select(payload);
  },
  deselect(payload: SelectTaskPayload): Action {
    return taskActions.deselect(payload);
  },

  updateFilters(filters: FiltersInterface): Action {
    return taskActions.updateFilters(filters);
  },

  setDefaultFilters(filters: FiltersInterface): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      await StorageService.set<FiltersModel>(
        'filters',
        null,
        filtersInterfaceToModel(filters),
      );

      dispatch(taskActions.setDefaultFilters(filters));
    }
  },

  loadDefaultFilters(): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(taskActions.loadDefaultFilters());

      const model = await StorageService.getAll<FiltersModel>('filters');
      let filters: FiltersInterface;

      if (model.length) {
        filters = filtersModelToInterface(model);
      } else {
        await StorageService.set<FiltersModel>('filters', null, filtersInterfaceToModel(INITIAL_FILTERS));
        dispatch(taskActions.createDefaultFilters());
        filters = INITIAL_FILTERS;
      }

      dispatch(taskActions.loadDefaultFiltersSuccess(filters));
    }
  },
}

export default taskActionCreators;