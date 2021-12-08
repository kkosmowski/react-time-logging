import { TaskDialogType } from '@enums/task-dialog-type.enum';
import { TaskModel } from '@interfaces/task.interface';

export interface TaskDialogPayload {
  type: TaskDialogType;
  date?: string;
  task?: TaskModel;
}