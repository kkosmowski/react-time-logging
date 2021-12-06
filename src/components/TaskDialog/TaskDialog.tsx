import { ReactElement } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { v4 } from 'uuid';

import uiActionCreators from '@store/actionCreators/ui-action.creators';
import { TaskFormInterface } from '@components/TaskDialog/domain/task-form.interface';
import addTaskValidationSchema from './validationSchema';
import initialAddTaskFormValues from './initial-form';
import TaskDialogForm from './TaskDialogForm';
import taskActionCreators from '@store/actionCreators/task-action.creators';
import { calculateDurationFromString } from '@utils/task.utils';
import uiSelectors from '@store/selectors/ui.selectors';
import { DIALOG_WIDTH_SMALL } from '@consts/dialog.consts';
import { ConfirmationAction } from '@enums/confirmation-action.enum';
import { TaskDialogState } from '@components/TaskDialog/domain/task-dialog-state.interface';

const TaskDialog = (): ReactElement => {
  const state: TaskDialogState = useSelector(uiSelectors.taskDialog);
  const dispatch = useDispatch();
  const formik = useFormik<TaskFormInterface>({
    initialValues: initialAddTaskFormValues(state.data),
    validationSchema: addTaskValidationSchema,
    onSubmit: (values) => {
      dispatch(taskActionCreators.add({
        id: v4(),
        date: values.date.toISOString(),
        title: values.title,
        description: values.description,
        duration: calculateDurationFromString(values.duration)
      }));
      close();
    },
  });
  const { submitForm, dirty } = formik;

  const close = (): void => {
    dispatch(uiActionCreators.closeTaskDialog());
  }

  const handleClose = (): void => {
    if (dirty) {
      dispatch(uiActionCreators.openConfirmationDialog(ConfirmationAction.LeaveProgress));
    } else {
      close();
    }
  };

  return (
    <Modal
      visible
      width={ DIALOG_WIDTH_SMALL }
      title={ 'Add task' }
      onCancel={ handleClose }
      onOk={ submitForm }
      okText={ 'Add' }
    >
      <TaskDialogForm formik={ formik } />
    </Modal>
  )
};

export default TaskDialog;