import { createSelector } from 'reselect';

import { RootState } from '../interfaces/root-state.interface';

const boardSelector = (state: RootState) => state.board;

const boardSelectors = {
  viewedDate: createSelector(boardSelector, board => board.viewedDate),
  week: createSelector(boardSelector, board => board.week),
  columns: createSelector(boardSelector, board => board.columns),
}

export default boardSelectors;