import { TaskModel } from '@interfaces/task.interface';
import { EntityUid } from '@mytypes/entity-uid.type';
import { FiltersInterface } from '@interfaces/filters.interface';

export interface TaskState {
  tasks: TaskModel[];
  filteredTasks: TaskModel[];
  addInProgress: boolean;
  tasksLoading: boolean;
  selectionMode: Record<string, boolean>;
  selected: Record<string, EntityUid[]>;
  filters: FiltersInterface;
  defaultFilters: FiltersInterface;
}