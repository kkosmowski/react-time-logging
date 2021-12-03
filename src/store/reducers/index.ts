import { combineReducers } from 'redux';

import boardReducer from './board.reducer';

const rootReducer = combineReducers({
  board: boardReducer,
});

export default rootReducer;
export { boardReducer };