import { Moment } from 'moment';
import { Dispatch } from 'redux';

import boardActions from '@store/actions/board.actions';
import { getWeek } from '@utils/date.utils';

const boardActionCreators = {
  setViewedDate(date: Moment): (d: Dispatch) => void {
    return function (dispatch: Dispatch): void {
      dispatch(boardActions.setViewedDate(date));
      dispatch(boardActions.setWeek(getWeek(date)));
    }
  },
}

export default boardActionCreators;