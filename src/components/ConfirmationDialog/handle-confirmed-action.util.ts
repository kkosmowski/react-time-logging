import { Dispatch } from "redux";
import { ConfirmationAction } from '@enums/confirmation-action.enum';
import uiActionCreators from '@store/actionCreators/ui-action.creators';

export const handleConfirmedAction = (dispatch: Dispatch, action: ConfirmationAction | null): void => {
  if (action) {
    switch (action) {
      case ConfirmationAction.LeaveProgress: {
        dispatch(uiActionCreators.closeTaskDialog());
        break;
      }
    }
  }

  dispatch(uiActionCreators.closeConfirmationDialog(true));
};