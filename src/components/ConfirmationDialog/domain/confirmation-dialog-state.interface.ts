import { ConfirmationAction } from '@enums/confirmation-action.enum';
import { ConfirmationDialogPayload } from '@components/ConfirmationDialog/domain/confirmation-dialog.payload';

export interface ConfirmationDialogState extends Omit<ConfirmationDialogPayload, 'action'> {
  opened: boolean;
  action: ConfirmationAction | null;
  result: boolean | null;
}