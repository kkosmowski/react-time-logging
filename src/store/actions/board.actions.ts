import { createAction } from '@reduxjs/toolkit';
import { Moment } from 'moment';

import { Week } from '@interfaces/week.interface';
import { ColumnInterface } from '@interfaces/column.interface';

const boardActions = {
  setViewedDate: createAction<Moment>('SET_VIEWED_DATE'),
  setWeek: createAction<Week>('SET_WEEK'),
  setColumns: createAction<ColumnInterface[]>('SET_COLUMNS'),
};

export default boardActions;