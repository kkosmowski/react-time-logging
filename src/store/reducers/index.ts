import { combineReducers } from 'redux';

import boardReducer from './board.reducer';
import uiReducer from './ui.reducer';

const rootReducer = combineReducers({
  board: boardReducer,
  ui: uiReducer,
});

export default rootReducer;
export { boardReducer, uiReducer };