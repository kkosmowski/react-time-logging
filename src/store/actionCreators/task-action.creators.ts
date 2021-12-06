import { Dispatch } from 'redux';

import taskActions from '@store/actions/task.actions';
import { Task } from '@interfaces/task.interface';
import { StorageService } from '@services/storage.service';

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
}

export default taskActionCreators;