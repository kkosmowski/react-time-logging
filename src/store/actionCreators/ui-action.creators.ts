import { Action } from 'redux';

import uiActions from '../actions/ui.actions';
import { ConfirmationAction } from '@enums/confirmation-action.enum';
import { TaskDialogPayload } from '@payloads/task-dialog.payload';
import { TaskModel } from '@interfaces/task.interface';
import { ClipboardPayload } from '@payloads/clipboard.payload';

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

  setClipboard(payload: ClipboardPayload): Action<string> {
    return uiActions.setClipboard(payload);
  },

  modifyClipboardAfterPastedCut(): Action<string> {
    return uiActions.modifyClipboardAfterPastedCut();
  },
}

export default uiActionCreators;