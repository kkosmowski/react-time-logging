import { Moment } from 'moment';

export interface TaskFormInterface {
  title: string;
  date: Moment;
  description: string;
  duration: string;
}