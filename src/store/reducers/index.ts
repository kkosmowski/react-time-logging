import { combineReducers } from 'redux';

import boardReducer from './board.reducer';
import uiReducer from './ui.reducer';
import taskReducer from './task.reducer';
import categoryReducer from './task.reducer';

const rootReducer = combineReducers({
  board: boardReducer,
  ui: uiReducer,
  task: taskReducer,
  category: categoryReducer,
});

export default rootReducer;
export { boardReducer, uiReducer, taskReducer, categoryReducer };