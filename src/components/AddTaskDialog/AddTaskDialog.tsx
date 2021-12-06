import { ReactElement, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { v4 } from 'uuid';
import moment from 'moment';

import uiActionCreators from '@store/actionCreators/ui-action.creators';
import { AddTaskFormInterface } from '@interfaces/add-task-form.interface';
import addTaskValidationSchema from './validationSchema';
import initialAddTaskFormValues from './initial-form';
import AddTaskDialogForm from './AddTaskDialogForm';
import taskActionCreators from '@store/actionCreators/task-action.creators';
import { calculateDurationFromString } from '@utils/task.utils';
import uiSelectors from '@store/selectors/ui.selectors';

const AddTaskDialog = (): ReactElement => {
  const data: string | null = useSelector(uiSelectors.addTaskDialogData);
  const dispatch = useDispatch();
  const formik = useFormik<AddTaskFormInterface>({
    initialValues: initialAddTaskFormValues,
    validationSchema: addTaskValidationSchema,
    onSubmit: (values) => {
      dispatch(taskActionCreators.add({
        id: v4(),
        date: values.date.toISOString(),
        title: values.title,
        description: values.description,
        duration: calculateDurationFromString(values.duration)
      }));
      dispatch(uiActionCreators.closeAddTaskDialog());
    },
  });
  const { submitForm, setFieldValue } = formik;

  const handleClose = (): void => {
    dispatch(uiActionCreators.closeAddTaskDialog());
  };

  useEffect(() => {
    if (data !== null) {
      setFieldValue('date', moment(data));
    }
  }, [data]);

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