import { ReactElement } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { DIALOG_WIDTH_SMALL } from '@consts/dialog.consts';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import uiSelectors from '@store/selectors/ui.selectors';
import { ConfirmationDialogState } from './domain/confirmation-dialog-state.interface';
import { handleConfirmedAction } from './handle-confirmed-action.util';
import { ConfirmationDialogText } from './domain/ConfirmationDialog.styled';

const ConfirmationDialog = (): ReactElement => {
  const state: ConfirmationDialogState = useSelector(uiSelectors.confirmationDialog);
  const dispatch = useDispatch();
  const { t } = useTranslation('CONFIRMATION_DIALOG');

  const handleCancel = (): void => {
    dispatch(uiActionCreators.closeConfirmationDialog(false));
  };

  const handleConfirm = (): void => {
    if (state.action) {
      handleConfirmedAction(dispatch, {
        action: state.action,
        data: state.data,
      });
    }
  };

  return state.action
    ? (
      <Modal
        visible
        width={ DIALOG_WIDTH_SMALL }
        title={ t(`TITLE_${ state.action }`) }
        onCancel={ handleCancel }
        onOk={ handleConfirm }
        okText={ t('CONFIRM') }
      >
        <ConfirmationDialogText>
          { t(state.action, { name: state.data?.title || '' }) }
        </ConfirmationDialogText>
      </Modal>
    )
    : <></>;
};

export default ConfirmationDialog;