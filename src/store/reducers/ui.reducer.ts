import { createReducer } from '@reduxjs/toolkit';

import { UiState } from '../interfaces/ui-state.interface';
import uiActions from '../actions/ui.actions';
import { ClipboardAction } from '@enums/clipboard-action.enum';
import { WeekendDisplay } from '@enums/weekend-display.enum';

export const initialUiState: UiState = {
  taskDialog: {
    opened: false,
    data: null,
  },
  confirmationDialog: {
    opened: false,
    action: null,
    result: null,
  },
  settingsDialogOpened: false,
  clipboard: null,
  settingsLoading: false,
  settingsUpdateInProgress: false,
  settings: {
    weekendDisplay: WeekendDisplay.Full,
  }
};

const uiReducer = createReducer(initialUiState, (builder) => {
  builder
    .addCase(uiActions.openTaskDialog, (state, { payload }) => {
      state.taskDialog = {
        opened: true,
        data: payload,
      };
    })
    .addCase(uiActions.closeTaskDialog, (state) => {
      state.taskDialog = {
        opened: false,
        data: null,
      };
    })

    .addCase(uiActions.openConfirmationDialog, (state, { payload }) => {
      state.confirmationDialog = {
        opened: true,
        action: payload.action,
        result: null,
        data: payload.data,
      };
    })
    .addCase(uiActions.closeConfirmationDialog, (state, { payload }) => {
      state.confirmationDialog = {
        opened: false,
        action: null,
        result: payload,
      };
    })

    .addCase(uiActions.openSettingsDialog, (state) => {
      state.settingsDialogOpened = true;
    })
    .addCase(uiActions.closeSettingsDialog, (state) => {
      state.settingsDialogOpened = false;
    })

    .addCase(uiActions.setClipboard, (state, { payload }) => {
      state.clipboard = payload;
    })
    .addCase(uiActions.modifyClipboardAfterPastedCut, (state ) => {
      if (state.clipboard) {
        state.clipboard.action = ClipboardAction.Copy;
      }
    })

    .addCase(uiActions.fetchSettings, (state) => {
      state.settingsLoading = true;
    })
    .addCase(uiActions.fetchSettingsSuccess, (state, { payload } ) => {
      state.settingsLoading = false;
      state.settings = payload;
    })

    .addCase(uiActions.updateSetting, (state) => {
      state.settingsUpdateInProgress = true;
    })
    .addCase(uiActions.updateSettingSuccess, (state, { payload } ) => {
      state.settingsUpdateInProgress = false;
      state.settings = {
        ...state.settings,
        [payload.settingName]: payload.value as WeekendDisplay,
      };
    })
});

export default uiReducer;