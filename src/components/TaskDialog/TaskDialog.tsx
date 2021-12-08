import { ReactElement, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
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
import { TaskDialogType } from '@enums/task-dialog-type.enum';

const TaskDialog = (): ReactElement => {
  const state: TaskDialogState = useSelector(uiSelectors.taskDialog);
  const isNewTask = state.data?.type === TaskDialogType.NewTask;
  const categories: Category[] = useSelector(categorySelectors.categories);
  const [isEditMode, setIsEditMode] = useState(isNewTask);
  const titleTranslationKey = isNewTask
    ? 'ADD_TASK'
    : isEditMode ? 'EDIT_TASK' : 'VIEW_TASK';
  const dispatch = useDispatch();
  const formik = useFormik<TaskFormInterface>({
    initialValues: initialAddTaskFormValues(state.data),
    validationSchema: addTaskValidationSchema,
    onSubmit: (values) => {
      if (isNewTask) {
        handleAddTask(values);
      } else {
        handleUpdateTask(values);
      }
    },
  });
  const { submitForm, dirty, isValid, resetForm } = formik;
  const { t } = useTranslation('TASK_DIALOG');

  const handleAddTask = (values: TaskFormInterface): void => {
    dispatch(taskActionCreators.add({
      id: v4(),
      title: values.title,
      categories: values.categories,
      date: values.date.toISOString(),
      description: values.description,
      duration: calculateDurationFromString(values.duration)
    }));
    close();
  };

  const handleUpdateTask = (values: TaskFormInterface): void => {
    if (!state.data?.task) return;

    dispatch(taskActionCreators.update(
      state.data.task.id,
      {
        ...state.data.task,
        title: values.title,
        description: values.description,
        categories: values.categories,
        date: values.date.toISOString(),
        duration: calculateDurationFromString(values.duration),
      }
    ));
    resetForm({ values });
    setIsEditMode(false);
  }

  const close = (): void => {
    dispatch(uiActionCreators.closeTaskDialog());
  };

  const handleClose = (): void => {
    if (dirty) {
      dispatch(uiActionCreators.openConfirmationDialog(ConfirmationAction.LeaveProgress));
    } else {
      close();
    }
  };

  const handleEdit = (): void => {
    setIsEditMode(true);
  };

  useEffect(() => {
    dispatch(categoryActionCreators.getAll());
  }, []);

  // useEffect(() => {
  //   if (state.data) {
  //     setIsEditMode(isNewTask);
  //   }
  // }, [setIsEditMode, state]);

  return (
    <Modal
      visible
      width={ DIALOG_WIDTH_SMALL }
      title={ t(titleTranslationKey) }
      onCancel={ handleClose }
      footer={ [
        !isNewTask && !isEditMode ? (
          <Button key="submit" type="primary" onClick={ handleEdit }>
            { t('COMMON:EDIT') }
          </Button>
        ) : null,
        <Button key="back" onClick={ handleClose }>
          { t(isEditMode ? 'COMMON:CANCEL' : 'COMMON:CLOSE' ) }
        </Button>,
        isEditMode ? (
          <Button key="submit" type="primary" onClick={ submitForm }>
          { t(isNewTask ? 'COMMON:ADD' : 'COMMON:SAVE') }
        </Button>
          ) : null,
      ] }
      okButtonProps={ { disabled: !isValid } }
    >
      <TaskDialogForm formik={ formik } isEditMode={ isEditMode } categories={ categories } />
    </Modal>
  )
};

export default TaskDialog;