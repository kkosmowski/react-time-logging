import { BoardState } from '@store/interfaces/board-state.interface';
import { UiState } from '@store/interfaces/ui-state.interface';

export interface RootState {
  board: BoardState;
  ui: UiState;
}