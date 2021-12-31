import { Moment } from 'moment';

import { Week } from '@interfaces/week.interface';
import { ColumnInterface } from '@interfaces/column.interface';

export interface BoardState {
  viewedDate: Moment | null;
  week: Week | null;
  columns: ColumnInterface[];
}