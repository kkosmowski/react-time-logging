import { EntityUid } from '@mytypes/entity-uid.type';
import { Moment } from 'moment';
import { AddTaskFormInterface } from './add-task-form.interface';

export interface Task extends Omit<AddTaskFormInterface, 'duration'> {
  id: EntityUid;
  date: Moment;
  duration: number;
}