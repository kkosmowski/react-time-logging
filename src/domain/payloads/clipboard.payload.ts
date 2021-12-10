import { ClipboardAction } from '@enums/clipboard-action.enum';
import { TaskModel } from '@interfaces/task.interface';

export interface ClipboardPayload {
  action: ClipboardAction;
  task: TaskModel;
}