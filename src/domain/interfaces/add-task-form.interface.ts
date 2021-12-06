import { Moment } from 'moment';

export interface AddTaskFormInterface {
  title: string;
  date: Moment;
  description: string;
  duration: string;
}