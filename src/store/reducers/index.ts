import { combineReducers } from 'redux';

import boardReducer from './board.reducer';
import uiReducer from './ui.reducer';
import taskReducer from '@store/reducers/task.reducer';

const rootReducer = combineReducers({
  board: boardReducer,
  ui: uiReducer,
  task: taskReducer,
});

export default rootReducer;
export { boardReducer, uiReducer, taskReducer };