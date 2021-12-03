import { ReactElement } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import uiActionCreators from '@store/actionCreators/ui-action.creators';
import { AddTaskFormInterface } from '@interfaces/add-task-form.interface';
import addTaskValidationSchema from './validationSchema';
import initialAddTaskFormValues from './initial-form';
import AddTaskDialogForm from './AddTaskDialogForm';
import taskActionCreators from '@store/actionCreators/task-action.creators';
import { v4 } from 'uuid';
import moment from 'moment';
import { calculateDurationFromString } from '@utils/task.utils';

const AddTaskDialog = (): ReactElement => {
  const dispatch = useDispatch();
  const formik = useFormik<AddTaskFormInterface>({
    initialValues: initialAddTaskFormValues,
    validationSchema: addTaskValidationSchema,
    onSubmit: (values) => {
      dispatch(taskActionCreators.add({
        id: v4(),
        date: moment(),
        title: values.title,
        description: values.description,
        duration: calculateDurationFromString(values.duration)
      }));
      dispatch(uiActionCreators.closeAddTaskDialog());
    },
  });
  const { submitForm } = formik;

  const handleClose = (): void => {
    dispatch(uiActionCreators.closeAddTaskDialog());
  };

  return (
    <Modal
      visible
      width={ 400 }
      title={ 'Add task' }
      onCancel={ handleClose }
      onOk={ submitForm }
      okText={ 'Add' }
    >
      <AddTaskDialogForm formik={ formik } />
    </Modal>
  )
};

export default AddTaskDialog;