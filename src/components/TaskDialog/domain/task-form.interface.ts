import { Moment } from 'moment';

import { Category } from '@interfaces/category.interface';

export interface TaskFormInterface {
  title: string;
  categories: Category[];
  date: Moment;
  description: string;
  duration: string;
}