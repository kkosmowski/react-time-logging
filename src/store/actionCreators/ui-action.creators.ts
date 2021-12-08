import { Action } from 'redux';

import uiActions from '../actions/ui.actions';
import { ConfirmationAction } from '@enums/confirmation-action.enum';
import { TaskDialogPayload } from '@payloads/task-dialog.payload';

const uiActionCreators = {
  openTaskDialog(payload: TaskDialogPayload): Action {
    return uiActions.openTaskDialog(payload);
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

  openSettingsDialog(): Action {
    return uiActions.openSettingsDialog();
  },
  closeSettingsDialog(): Action {
    return uiActions.closeSettingsDialog();
  },
}

export default uiActionCreators;