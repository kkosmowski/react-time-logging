import { BoardState } from './board-state.interface';
import { UiState } from './ui-state.interface';
import { TaskState } from './task-state.interface';
import { CategoryState } from './category-state.interface';

export interface RootState {
  board: BoardState;
  ui: UiState;
  task: TaskState;
  category: CategoryState;
}