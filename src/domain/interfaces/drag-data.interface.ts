import { TaskModel } from '@interfaces/task.interface';

export interface DragData {
  task?: TaskModel;
  sourceColumn?: string;
}