import { TaskDialogState } from '@components/TaskDialog';
import { ConfirmationDialogState } from '@components/ConfirmationDialog';

export interface UiState {
  taskDialog: TaskDialogState;
  confirmationDialog: ConfirmationDialogState;
  settingsDialogOpened: boolean;
}