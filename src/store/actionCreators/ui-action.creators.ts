import { Action } from 'redux';
import moment from 'moment';

import uiActions from '../actions/ui.actions';
import { DATE_FORMAT } from '@consts/date.consts';
import { ConfirmationAction } from '@enums/confirmation-action.enum';

const uiActionCreators = {
  openTaskDialog(date: string = moment().format(DATE_FORMAT)): Action {
    return uiActions.openTaskDialog(date);
  },
  closeTaskDialog(): Action {
    return uiActions.closeTaskDialog();
  },

  openConfirmationDialog(action: ConfirmationAction): Action {
    return uiActions.openConfirmationDialog(action);
  },
  closeConfirmationDialog(result: boolean): Action {
    return uiActions.closeConfirmationDialog(result);
  },
}

export default uiActionCreators;