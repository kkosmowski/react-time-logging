import { createAction } from '@reduxjs/toolkit';

import { TaskDialogPayload } from '@payloads/task-dialog.payload';
import { ConfirmationDialogPayload } from '@components/ConfirmationDialog/domain/confirmation-dialog.payload';
import { ClipboardPayload } from '@payloads/clipboard.payload';
import { UpdateSettingSuccessPayload } from '@payloads/update-setting-success.payload';
import { SettingsInterface } from '@interfaces/settings.interface';

const uiActions = {
  openTaskDialog: createAction<TaskDialogPayload>('OPEN_TASK_DIALOG'),
  closeTaskDialog: createAction<void>('CLOSE_TASK_DIALOG'),

  openConfirmationDialog: createAction<ConfirmationDialogPayload>('OPEN_CONFIRMATION_DIALOG'),
  closeConfirmationDialog: createAction<boolean>('CLOSE_CONFIRMATION_DIALOG'),

  openSettingsDialog: createAction<void>('OPEN_SETTINGS_DIALOG'),
  closeSettingsDialog: createAction<void>('CLOSE_SETTINGS_DIALOG'),

  setClipboard: createAction<ClipboardPayload>('SET_CLIPBOARD'),
  modifyClipboardAfterPastedCut: createAction<void>('MODIFY_CLIPBOARD_AFTER_PASTED_CUT'),

  fetchSettings: createAction<void>('FETCH_SETTINGS'),
  fetchSettingsSuccess: createAction<SettingsInterface>('FETCH_SETTINGS_SUCCESS'),

  updateSetting: createAction<void>('UPDATE_SETTING'),
  updateSettingSuccess: createAction<UpdateSettingSuccessPayload>('UPDATE_SETTING_SUCCESS'),
};

export default uiActions;