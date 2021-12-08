import { TaskDialogPayload } from '@payloads/task-dialog.payload';

export interface TaskDialogState {
  opened: boolean;
  data: TaskDialogPayload | null;
}