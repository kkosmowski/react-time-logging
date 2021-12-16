import { TaskModel } from '@interfaces/task.interface';
import { EntityUid } from '@mytypes/entity-uid.type';

export interface TaskState {
  tasks: TaskModel[];
  addInProgress: boolean;
  tasksLoading: boolean;
  selectionMode: Record<string, boolean>;
  selected: Record<string, EntityUid[]>;
}