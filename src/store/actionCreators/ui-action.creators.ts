import { Action } from 'redux';

import uiActions from '@store/actions/ui.actions';

const uiActionCreators = {
  openAddTaskDialog(): Action {
    return uiActions.openAddTaskDialog();
  },
  closeAddTaskDialog(): Action {
    return uiActions.closeAddTaskDialog();
  },
}

export default uiActionCreators;