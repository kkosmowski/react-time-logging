import { ReactElement, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { v4 } from 'uuid';
import { useTranslation } from 'react-i18next';

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
import categorySelectors from '@store/selectors/category.selectors';
import { Category } from '@interfaces/category.interface';
import categoryActionCreators from '@store/actionCreators/category-action.creators';

const TaskDialog = (): ReactElement => {
  const state: TaskDialogState = useSelector(uiSelectors.taskDialog);
  const categories: Category[] = useSelector(categorySelectors.categories);
  const dispatch = useDispatch();
  const formik = useFormik<TaskFormInterface>({
    initialValues: initialAddTaskFormValues(state.data),
    validationSchema: addTaskValidationSchema,
    onSubmit: (values) => {
      dispatch(taskActionCreators.add({
        id: v4(),
        title: values.title,
        categories: values.categories,
        date: values.date.toISOString(),
        description: values.description,
        duration: calculateDurationFromString(values.duration)
      }));
      close();
    },
  });
  const { submitForm, dirty, isValid } = formik;
  const { t } = useTranslation('TASK_DIALOG');

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

  useEffect(() => {
    dispatch(categoryActionCreators.getAll());
  }, []);

  return (
    <Modal
      visible
      width={ DIALOG_WIDTH_SMALL }
      title={ t('ADD_TASK') }
      onCancel={ handleClose }
      cancelText={ t('COMMON:CANCEL') }
      onOk={ submitForm }
      okText={ t('COMMON:ADD') }
      okButtonProps={ { disabled: !isValid } }
    >
      <TaskDialogForm formik={ formik } categories={ categories } />
    </Modal>
  )
};

export default TaskDialog;