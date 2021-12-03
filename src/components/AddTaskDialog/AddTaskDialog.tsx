import { ReactElement } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import uiActionCreators from '@store/actionCreators/ui-action.creators';
import { AddTaskFormInterface } from '@interfaces/add-task-form.interface';
import addTaskValidationSchema from './validationSchema';
import initialAddTaskFormValues from './initial-form';
import AddTaskDialogForm from './AddTaskDialogForm';

const AddTaskDialog = (): ReactElement => {
  const dispatch = useDispatch();
  const formik = useFormik<AddTaskFormInterface>({
    initialValues: initialAddTaskFormValues,
    validationSchema: addTaskValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { submitForm, validateForm, values } = formik;

  const handleClose = (): void => {
    dispatch(uiActionCreators.closeAddTaskDialog());
  };

  const handleAdd = (): void => {
    console.log('test');
    submitForm();
  }

  return (
    <Modal
      visible
      width={ 400 }
      title={ 'Add task' }
      onCancel={ handleClose }
      onOk={ handleAdd }
      okText={ 'Add' }
    >
      <AddTaskDialogForm formik={ formik } />
    </Modal>
  )
};

export default AddTaskDialog;