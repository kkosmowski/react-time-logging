import { EntityUid } from '@mytypes/entity-uid.type';
import { TaskFormInterface } from '@components/TaskDialog/domain/task-form.interface';

export interface TaskModel extends Omit<TaskFormInterface, 'date' | 'duration'> {
  id: EntityUid;
  date: string;
  duration: number;
}

export interface TaskInterface extends TaskModel {
  numericId: number;
}