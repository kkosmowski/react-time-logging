import { ReactElement, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { DIALOG_WIDTH_SMALL } from '@consts/dialog.consts';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import uiSelectors from '@store/selectors/ui.selectors';
import { ConfirmationDialogState } from './domain/confirmation-dialog-state.interface';
import { handleConfirmedAction } from './handle-confirmed-action.util';
import { ConfirmationDialogText } from './domain/ConfirmationDialog.styled';
import { TaskModel } from '@interfaces/task.interface';
import { DeleteTasksPayload } from '@payloads/delete-tasks.payload';

const ConfirmationDialog = (): ReactElement => {
  const state: ConfirmationDialogState = useSelector(uiSelectors.confirmationDialog);
  const [translationDetails, setTranslationDetails] = useState<{ name?: string; count?: number; }>({});
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

  useEffect(() => {
    if (state.data) {
      if ((state.data as TaskModel)?.title) {
        setTranslationDetails({ name: (state.data as TaskModel).title });
      } else {
        setTranslationDetails({ count: (state.data as DeleteTasksPayload).taskIds.length });
      }
    }
  }, [state]);

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
          { t(state.action, { ...translationDetails }) }
        </ConfirmationDialogText>
      </Modal>
    )
    : <></>;
};

export default ConfirmationDialog;