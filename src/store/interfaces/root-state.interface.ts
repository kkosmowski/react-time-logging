import { BoardState } from '@store/interfaces/board-state.interface';
import { UiState } from '@store/interfaces/ui-state.interface';
import { TaskState } from '@store/interfaces/task-state.interface';

export interface RootState {
  board: BoardState;
  ui: UiState;
  task: TaskState;
}