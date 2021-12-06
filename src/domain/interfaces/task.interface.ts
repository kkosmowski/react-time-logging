import { EntityUid } from '@mytypes/entity-uid.type';
import { AddTaskFormInterface } from './add-task-form.interface';

export interface Task extends Omit<AddTaskFormInterface, 'date' | 'duration'> {
  id: EntityUid;
  date: string;
  duration: number;
}