import { Action } from 'redux';

import taskActions from '@store/actions/task.actions';
import { Task } from '@interfaces/task.interface';

const taskActionCreators = {
  add(task: Task): Action {
    return taskActions.add(task);
  },
}

export default taskActionCreators;