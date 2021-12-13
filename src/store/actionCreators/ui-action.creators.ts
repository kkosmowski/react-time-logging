import { Action, Dispatch } from 'redux';

import uiActions from '../actions/ui.actions';
import { ConfirmationAction } from '@enums/confirmation-action.enum';
import { TaskDialogPayload } from '@payloads/task-dialog.payload';
import { TaskModel } from '@interfaces/task.interface';
import { ClipboardPayload } from '@payloads/clipboard.payload';
import { SettingsInterface, SettingsModel } from '@interfaces/settings.interface';
import { StorageService } from '@services/storage.service';
import { INITIAL_SETTINGS_MODEL } from '@consts/initial-settings-model.const';

const uiActionCreators = {
  openTaskDialog(payload: TaskDialogPayload): Action<string> {
    return uiActions.openTaskDialog(payload);
  },
  closeTaskDialog(): Action<string> {
    return uiActions.closeTaskDialog();
  },

  openConfirmationDialog(action: ConfirmationAction, data?: TaskModel): Action<string> {
    return uiActions.openConfirmationDialog({ action, data });
  },
  closeConfirmationDialog(result: boolean): Action<string> {
    return uiActions.closeConfirmationDialog(result);
  },

  openSettingsDialog(): Action<string> {
    return uiActions.openSettingsDialog();
  },
  closeSettingsDialog(): Action<string> {
    return uiActions.closeSettingsDialog();
  },

  setClipboard(payload: ClipboardPayload): Action<string> {
    return uiActions.setClipboard(payload);
  },

  modifyClipboardAfterPastedCut(): Action<string> {
    return uiActions.modifyClipboardAfterPastedCut();
  },

  fetchSettings():  (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(uiActions.fetchSettings());

      let settings: SettingsModel = await StorageService.getAll('settings');

      if (!settings.length) {
        settings = await createInitialSettings();
      }

      const transformedSettings: SettingsInterface = settings
        .map((setting) => {
          const { id, ...value } = setting;
          return value;
        })
        .reduce((object, value) => ({ ...object, ...value }), {} as SettingsInterface);

      dispatch(uiActions.fetchSettingsSuccess(transformedSettings));
    }
  },

  updateSetting<T extends string>(settingName: keyof SettingsInterface, value: T): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(uiActions.updateSetting());

      await StorageService.update(
        'settings',
        { id: settingName },
        { [(settingName).toString()]: value }
      );

      dispatch(uiActions.updateSettingSuccess({ settingName, value }));
    }
  },
}

const createInitialSettings = async (): Promise<SettingsModel> => {
  return StorageService.set('settings', null, INITIAL_SETTINGS_MODEL);
};

export default uiActionCreators;