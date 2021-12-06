import { EntityUid } from '@mytypes/entity-uid.type';
import { TaskFormInterface } from '@components/TaskDialog/domain/task-form.interface';

export interface Task extends Omit<TaskFormInterface, 'date' | 'duration'> {
  id: EntityUid;
  date: string;
  duration: number;
}