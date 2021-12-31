import { Moment } from 'moment';
import { Action, Dispatch } from 'redux';

import boardActions from '../actions/board.actions';
import { getWeek } from '@utils/date.utils';
import { ColumnInterface } from '@interfaces/column.interface';

const boardActionCreators = {
  setViewedDate(date: Moment): (d: Dispatch) => void {
    return function (dispatch: Dispatch): void {
      dispatch(boardActions.setViewedDate(date));
      dispatch(boardActions.setWeek(getWeek(date)));
    }
  },

  setColumns(columns: ColumnInterface[]): Action {
    return boardActions.setColumns(columns);
  },
}

export default boardActionCreators;