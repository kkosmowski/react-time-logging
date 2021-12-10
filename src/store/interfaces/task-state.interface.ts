import { TaskModel } from '@interfaces/task.interface';

export interface TaskState {
  tasks: TaskModel[];
  addInProgress: boolean;
  tasksLoading: boolean;
}