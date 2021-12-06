import { ConfirmationAction } from '@enums/confirmation-action.enum';

export interface ConfirmationDialogState {
  opened: boolean;
  action: ConfirmationAction | null;
  result: boolean | null;
}