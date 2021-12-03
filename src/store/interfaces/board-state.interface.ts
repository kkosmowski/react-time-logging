import { Moment } from 'moment';
import { Week } from '@interfaces/week.interface';

export interface BoardState {
  viewedDate: Moment | null;
  week: Week | null;
}