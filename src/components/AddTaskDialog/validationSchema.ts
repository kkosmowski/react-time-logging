import * as yup from 'yup';

const addTaskValidationSchema = yup.object().shape({
  title: yup.string()
    .trim()
    .min(2, 'Title must be longer than 2 characters')
    .max(255, 'Title must not be longer than 255 characters')
    .required('Title is required'),
  description: yup.string().trim(),
  duration: yup.string()
    .matches(/(\d{1,2}[h]\s\d{1,2}m)|(\d{1,2}[h|m])/, 'Invalid time input')
    .required('Duration is required')
});

export default addTaskValidationSchema