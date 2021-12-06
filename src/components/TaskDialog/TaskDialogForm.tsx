import { ReactElement } from 'react';
import { FormikProps } from 'formik';
import { TaskFormInterface } from '@components/TaskDialog/domain/task-form.interface';
import { DatePicker, Input } from 'antd';
import ErrorText from '@components/ErrorText';
import { StyledForm } from './TaskDialogForm.styled';
import { DATE_FORMAT } from '@consts/date.consts';

interface Props {
  formik: FormikProps<TaskFormInterface>;
}
const TaskDialogForm = ({ formik }: Props): ReactElement => {
  const { handleChange, handleBlur, setFieldValue, values, touched, errors } = formik;

  return (
    <StyledForm>
      <Input
        id="title"
        name="title"
        placeholder="Task name"
        onChange={ handleChange }
        onBlur={ handleBlur }
        value={ values.title }
      />
      <ErrorText>{ touched.title ? errors.title : '' }</ErrorText>

      <Input
        id="description"
        name="description"
        placeholder="Description"
        onChange={ handleChange }
        onBlur={ handleBlur }
        value={ values.description }
      />
      <ErrorText>{ touched.description ? errors.description : '' }</ErrorText>

      <DatePicker
        id="date"
        name="date"
        placeholder="When?"
        onChange={ date => setFieldValue('date', date) }
        format={ DATE_FORMAT }
        onBlur={ handleBlur }
        value={ values.date }
        allowClear={ false }
      />

      <Input
        id="duration"
        name="duration"
        placeholder={ '"1h", "30m", "2h 15m" etc.' }
        onChange={ handleChange }
        onBlur={ handleBlur }
        value={ values.duration }
      />
      <ErrorText>{ touched.duration ? errors.duration : '' }</ErrorText>
    </StyledForm>
  )
};

export default TaskDialogForm;