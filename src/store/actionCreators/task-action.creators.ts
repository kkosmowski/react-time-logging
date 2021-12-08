import { Dispatch } from 'redux';

import taskActions from '../actions/task.actions';
import { Task } from '@interfaces/task.interface';
import { StorageService } from '@services/storage.service';
import { EntityUid } from '@mytypes/entity-uid.type';
import { v4 } from 'uuid';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import { TaskDialogType } from '@enums/task-dialog-type.enum';

const taskActionCreators = {
  add(task: Task): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(taskActions.add());
      await StorageService.add<Task>('tasks', task);
      dispatch(taskActions.addSuccess(task));
    }
  },

  getAll(): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(taskActions.getAll());
      const tasks = await StorageService.getAll<Task[]>('tasks');
      dispatch(taskActions.getAllSuccess(tasks));
    }
  },

  update(taskId: EntityUid, update: Partial<Task>): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(taskActions.update());
      await StorageService.update<Task>('tasks', { id: taskId }, update);
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

  duplicate(task: Task): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(taskActions.duplicate());
      dispatch(uiActionCreators.closeTaskDialog());

      const duplicatedTask = { ...task, id: v4() };
      await StorageService.add('tasks', duplicatedTask);

      dispatch(taskActions.duplicateSuccess(duplicatedTask));
      dispatch(uiActionCreators.openTaskDialog({
        type: TaskDialogType.ExistingTask,
        task: duplicatedTask,
      }));
    }
  },
}

export default taskActionCreators;