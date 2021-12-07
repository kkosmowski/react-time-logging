import * as yup from 'yup';

import {
  TASK_DESCRIPTION_MAX_LENGTH,
  TASK_TITLE_MAX_LENGTH,
  TASK_TITLE_MIN_LENGTH
} from '@consts/task.consts';

const addTaskValidationSchema = yup.object().shape({
  title: yup.string()
    .trim()
    .min(TASK_TITLE_MIN_LENGTH, `Title must be longer than ${ TASK_TITLE_MIN_LENGTH } characters`)
    .max(TASK_TITLE_MAX_LENGTH, `Title must not be longer than ${ TASK_TITLE_MAX_LENGTH} characters`)
    .required('Title is required'),
  categories: yup.array(),
  description: yup.string()
    .trim()
    .max(TASK_DESCRIPTION_MAX_LENGTH, `Description must not be longer than ${ TASK_DESCRIPTION_MAX_LENGTH} characters`),
  date: yup.object().required(),
  duration: yup.string()
    .matches(/(\d{1,2}[h]\s\d{1,2}m)|(\d{1,2}[h|m])/, 'Invalid time input')
    .required('Duration is required')
});

export default addTaskValidationSchema