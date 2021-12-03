import { createSelector } from 'reselect';
import { RootState } from '@store/interfaces/root-state.interface';

const boardSelector = (state: RootState) => state.board;

const boardSelectors = {
  viewedDate: createSelector(boardSelector, board => board.viewedDate),
  week: createSelector(boardSelector, board => board.week)
}

export default boardSelectors;