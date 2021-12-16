import { Dispatch } from 'redux';

import { ConfirmationAction } from '@enums/confirmation-action.enum';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import { ConfirmationDialogPayload } from '@components/ConfirmationDialog/domain/confirmation-dialog.payload';
import taskActionCreators from '@store/actionCreators/task-action.creators';
import { TaskModel } from '@interfaces/task.interface';
import { DeleteTasksPayload } from '@payloads/delete-tasks.payload';

export const handleConfirmedAction = (dispatch: Dispatch, payload: ConfirmationDialogPayload): void => {
  switch (payload.action) {
    case ConfirmationAction.LeaveProgress: {
      dispatch(uiActionCreators.closeTaskDialog());
      break;
    }

    case ConfirmationAction.DeleteTask: {
      if (payload.data) {
        taskActionCreators.delete((payload.data as TaskModel).id)(dispatch);
        dispatch(uiActionCreators.closeTaskDialog());
      }
      break;
    }

    case ConfirmationAction.DeleteMultipleTasks: {
      if (payload.data) {
        const { column, taskIds } = payload.data as DeleteTasksPayload;
        taskActionCreators.deleteMultiple(taskIds)(dispatch);
        dispatch(taskActionCreators.toggleSelectionMode({ column, value: false }));
        dispatch(uiActionCreators.closeTaskDialog());
      }
      break;
    }
  }

  dispatch(uiActionCreators.closeConfirmationDialog(true));
};