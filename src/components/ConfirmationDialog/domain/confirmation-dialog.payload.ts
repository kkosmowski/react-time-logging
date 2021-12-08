import { ConfirmationAction } from '@enums/confirmation-action.enum';
import { TaskModel } from '@interfaces/task.interface';

export interface ConfirmationDialogPayload {
  action: ConfirmationAction;
  data?: TaskModel;
}