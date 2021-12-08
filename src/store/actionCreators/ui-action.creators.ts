import { Action } from 'redux';

import uiActions from '../actions/ui.actions';
import { ConfirmationAction } from '@enums/confirmation-action.enum';
import { TaskDialogPayload } from '@payloads/task-dialog.payload';
import { TaskModel } from '@interfaces/task.interface';

const uiActionCreators = {
  openTaskDialog(payload: TaskDialogPayload): Action<string> {
    return uiActions.openTaskDialog(payload);
  },
  closeTaskDialog(): Action<string> {
    return uiActions.closeTaskDialog();
  },

  openConfirmationDialog(action: ConfirmationAction, data?: TaskModel): Action<string> {
    return uiActions.openConfirmationDialog({ action, data });
  },
  closeConfirmationDialog(result: boolean): Action<string> {
    return uiActions.closeConfirmationDialog(result);
  },

  openSettingsDialog(): Action<string> {
    return uiActions.openSettingsDialog();
  },
  closeSettingsDialog(): Action<string> {
    return uiActions.closeSettingsDialog();
  },
}

export default uiActionCreators;