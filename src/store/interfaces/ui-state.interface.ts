import { TaskDialogState } from '@components/TaskDialog';
import { ConfirmationDialogState } from '@components/ConfirmationDialog';
import { ClipboardPayload } from '@payloads/clipboard.payload';

export interface UiState {
  taskDialog: TaskDialogState;
  confirmationDialog: ConfirmationDialogState;
  settingsDialogOpened: boolean;
  clipboard: ClipboardPayload | null;
}