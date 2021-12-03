import { createAction } from '@reduxjs/toolkit';
import { Moment } from 'moment';

import { Week } from '@interfaces/week.interface';

const boardActions = {
  setViewedDate: createAction<Moment>('SET_VIEWED_DATE'),
  setWeek: createAction<Week>('SET_WEEK'),
};

export default boardActions;