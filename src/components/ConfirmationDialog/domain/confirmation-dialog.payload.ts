import { ConfirmationAction } from '@enums/confirmation-action.enum';
import { TaskModel } from '@interfaces/task.interface';
import { DeleteTasksPayload } from '@payloads/delete-tasks.payload';

export type ConfirmationDialogData = TaskModel | DeleteTasksPayload;

export interface ConfirmationDialogPayload {
  action: ConfirmationAction;
  data?: ConfirmationDialogData;
}