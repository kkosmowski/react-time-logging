import { Dispatch } from 'redux';

import { ConfirmationAction } from '@enums/confirmation-action.enum';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import { ConfirmationDialogPayload } from '@components/ConfirmationDialog/domain/confirmation-dialog.payload';
import taskActionCreators from '@store/actionCreators/task-action.creators';

export const handleConfirmedAction = (dispatch: Dispatch, payload: ConfirmationDialogPayload): void => {
  switch (payload.action) {
    case ConfirmationAction.LeaveProgress: {
      dispatch(uiActionCreators.closeTaskDialog());
      break;
    }

    case ConfirmationAction.DeleteTask: {
      if (payload.data) {
        taskActionCreators.delete(payload.data.id)(dispatch);
        dispatch(uiActionCreators.closeTaskDialog());
      }
      break;
    }
  }

  dispatch(uiActionCreators.closeConfirmationDialog(true));
};