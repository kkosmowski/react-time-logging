import { AddTaskFormInterface } from '@interfaces/add-task-form.interface';
import moment from 'moment';

const initialAddTaskFormValues: AddTaskFormInterface = {
  title: '',
  description: '',
  date: moment(),
  duration: '',
};

export default initialAddTaskFormValues;