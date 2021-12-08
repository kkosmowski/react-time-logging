import { ConfirmationAction } from '@enums/confirmation-action.enum';
import { Task } from '@interfaces/task.interface';

export interface ConfirmationDialogPayload {
  action: ConfirmationAction;
  data?: Task;
}