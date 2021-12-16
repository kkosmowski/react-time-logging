import { Action, Dispatch } from 'redux';
import { v4 } from 'uuid';
import { Moment } from 'moment';
import i18next from 'i18next';

import taskActions from '../actions/task.actions';
import { TaskModel } from '@interfaces/task.interface';
import { StorageService } from '@services/storage.service';
import { EntityUid } from '@mytypes/entity-uid.type';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import { TaskDialogType } from '@enums/task-dialog-type.enum';
import store from '@store/store';
import { RootState } from '@store/interfaces/root-state.interface';
import { reorder } from '@utils/reorder.util';
import { ClipboardAction } from '@enums/clipboard-action.enum';
import { ClipboardPayload } from '@payloads/clipboard.payload';
import { SelectionModePayload } from '@payloads/selection-mode.payload';
import { SelectTaskPayload } from '@payloads/select-task.payload';

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

  duplicate(task: TaskModel): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(taskActions.duplicate());
      const taskDialogOpened = (store.getState() as RootState).ui.taskDialog.opened;

      if (taskDialogOpened) {
        dispatch(uiActionCreators.closeTaskDialog());
      }

      const copyOfTask = i18next.t('COMMON:COPY_OF_TASK', { title: task.title });

      const duplicatedTask = {
        ...task,
        title: copyOfTask,
        id: v4(),
      };
      await StorageService.add<TaskModel>('tasks', duplicatedTask);

      dispatch(taskActions.duplicateSuccess(duplicatedTask));

      if (taskDialogOpened) {
        dispatch(uiActionCreators.openTaskDialog({
          type: TaskDialogType.ExistingTask,
          task: duplicatedTask,
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
        await taskActionCreators.duplicate({ ...clipboard.task, ...update})(dispatch);
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
}

export default taskActionCreators;