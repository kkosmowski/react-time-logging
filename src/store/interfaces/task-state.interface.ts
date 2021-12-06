import { Task } from '@interfaces/task.interface';

export interface TaskState {
  tasks: Task[];
  addInProgress: boolean;
  tasksLoading: boolean;
}