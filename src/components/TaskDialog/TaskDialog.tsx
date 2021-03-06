import { ReactElement, useEffect, useState } from 'react';
import { Button, Modal, Tooltip } from 'antd';
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
import { TaskDialogType } from '@enums/task-dialog-type.enum';
import taskSelectors from '@store/selectors/task.selectors';
import { MINUTES_IN_HOUR } from '@consts/date.consts';

const TaskDialog = (): ReactElement => {
  const state: TaskDialogState = useSelector(uiSelectors.taskDialog);
  const isNewTask = state.data?.type === TaskDialogType.NewTask;
  const { weekendDisplay, dayLimit, disableTimeCheck } = useSelector(uiSelectors.settings);
  const categories: Category[] = useSelector(categorySelectors.categories);
  const [isEditMode, setIsEditMode] = useState(isNewTask || !!state.data?.editMode);
  const titleTranslationKey = isNewTask
    ? 'ADD_TASK'
    : isEditMode ? 'EDIT_TASK' : 'VIEW_TASK';
  const dispatch = useDispatch();
  const formik = useFormik<TaskFormInterface>({
    initialValues: initialAddTaskFormValues(state.data),
    validationSchema: addTaskValidationSchema,
    onSubmit: (values) => {
      if (!isValid) return;

      if (isNewTask) {
        handleAddTask(values);
      } else {
        handleUpdateTask(values);
      }
    },
  });
  const { submitForm, dirty, isValid, resetForm, values } = formik;
  const totalMinutesOnDate = useSelector(taskSelectors.totalMinutesOnDate(values.date.toISOString()));
  const [isDuplicateDisabled, setIsDuplicateDisabled] = useState(false);
  const { t } = useTranslation('TASK_DIALOG');

  const handleAddTask = (values: TaskFormInterface): void => {
    taskActionCreators.add({
      id: v4(),
      title: values.title,
      categories: values.categories,
      date: values.date.toISOString(),
      description: values.description,
      duration: calculateDurationFromString(values.duration)
    })(dispatch);
    close();
  };

  const handleUpdateTask = (values: TaskFormInterface): void => {
    if (!state.data?.task) return;

    taskActionCreators.update(
      state.data.task.id,
      {
        ...state.data.task,
        title: values.title,
        description: values.description,
        categories: values.categories,
        date: values.date.toISOString(),
        duration: calculateDurationFromString(values.duration),
      }
    )(dispatch);

    resetForm({ values });
    setIsEditMode(false);
  }

  const close = (): void => {
    dispatch(uiActionCreators.closeTaskDialog());
  };

  const handleCancel = (): void => {
    if (dirty) {
      dispatch(uiActionCreators.openConfirmationDialog(ConfirmationAction.LeaveProgress));
    } else if (isEditMode && !isNewTask) {
      resetForm();
      setIsEditMode(false);
    } else {
      close();
    }
  };

  const handleEdit = (): void => {
    setIsEditMode(true);
  };

  const handleDelete = (): void => {
    dispatch(uiActionCreators.openConfirmationDialog(ConfirmationAction.DeleteTask, state.data?.task));
  };

  const handleDuplicate = (): void => {
    if (state.data?.task) {
      taskActionCreators.duplicate(state.data.task.id)(dispatch);
    }
  };

  useEffect(() => {
    if (disableTimeCheck) {
      setIsDuplicateDisabled(false);
    } else if (state.data?.task && typeof state.data?.totalColumnMinutes === 'number') {
      const totalMinutes = state.data.totalColumnMinutes;
      const taskMinutes = state.data.task.duration;
      const dayLimitInMinutes = dayLimit * MINUTES_IN_HOUR;

      setIsDuplicateDisabled(totalMinutes + taskMinutes > dayLimitInMinutes);
    }
  }, [state]);

  return (
    <Modal
      visible
      width={ DIALOG_WIDTH_SMALL }
      title={ t(titleTranslationKey) }
      onCancel={ handleCancel }
      footer={ [
        !isNewTask ? (
          <Button key="delete" danger onClick={ handleDelete }>
            { t('COMMON:DELETE') }
          </Button>
        ) : null,
        ...(!isNewTask && !isEditMode ? [
          <Tooltip
            title={ isDuplicateDisabled ? t('CANNOT_DUPLICATE_BECAUSE_OF_LIMIT', { limit: dayLimit } ) : '' }
            key="cannot-duplicate"
          >
            <Button key="duplicate" onClick={ handleDuplicate } disabled={ isDuplicateDisabled }>
              { t('COMMON:DUPLICATE') }
            </Button>
          </Tooltip>,
          <Button key="submit" type="primary" onClick={ handleEdit }>
            { t('COMMON:EDIT') }
          </Button>,
        ] : []),
        <Button key="back" onClick={ handleCancel }>
          { t(isEditMode ? 'COMMON:CANCEL' : 'COMMON:CLOSE' ) }
        </Button>,
        isEditMode ? (
          <Button key="submit" type="primary" onClick={ submitForm } disabled={ !isValid }>
          { t(isNewTask ? 'COMMON:ADD' : 'COMMON:SAVE') }
        </Button>
          ) : null,
      ] }
      okButtonProps={ { disabled: !isValid } }
    >
      <TaskDialogForm
        formik={ formik }
        isEditMode={ isEditMode }
        categories={ categories }
        weekendDisplay={ weekendDisplay }
        dayLimit={ dayLimit }
        disableTimeCheck={ disableTimeCheck }
        originalDuration={ !isNewTask && state.data && state.data.task ? state.data.task.duration : 0 }
        totalMinutes={ totalMinutesOnDate }
      />
    </Modal>
  )
};

export default TaskDialog;