import { Action } from 'redux';

import uiActions from '@store/actions/ui.actions';
import moment from 'moment';
import { DATE_FORMAT } from '@consts/date.consts';

const uiActionCreators = {
  openAddTaskDialog(date: string = moment().format(DATE_FORMAT)): Action {
    return uiActions.openAddTaskDialog(date);
  },
  closeAddTaskDialog(): Action {
    return uiActions.closeAddTaskDialog();
  },
}

export default uiActionCreators;