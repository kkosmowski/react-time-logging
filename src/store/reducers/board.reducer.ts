import { createReducer } from '@reduxjs/toolkit';

import { BoardState } from '../interfaces/board-state.interface';
import boardActions from '../actions/board.actions';

export const initialBoardState: BoardState = {
  viewedDate: null,
  week: null,
};

const boardReducer = createReducer(initialBoardState, (builder) => {
  builder
    .addCase(boardActions.setViewedDate, (state, { payload }) => {
      state.viewedDate = payload;
    })

    .addCase(boardActions.setWeek, (state, { payload }) => {
      state.week = payload;
    })
});

export default boardReducer;