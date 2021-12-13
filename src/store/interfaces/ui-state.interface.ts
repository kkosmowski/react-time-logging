import { TaskDialogState } from '@components/TaskDialog';
import { ConfirmationDialogState } from '@components/ConfirmationDialog';
import { ClipboardPayload } from '@payloads/clipboard.payload';
import { SettingsInterface } from '@interfaces/settings.interface';

export interface UiState {
  taskDialog: TaskDialogState;
  confirmationDialog: ConfirmationDialogState;
  settingsDialogOpened: boolean;
  clipboard: ClipboardPayload | null;
  settingsLoading: boolean;
  settingsUpdateInProgress: boolean;
  settings: SettingsInterface;
}