import { TaskFormInterface } from '@components/TaskDialog/domain/task-form.interface';
import moment from 'moment';

const initialAddTaskFormValues = (dateString: string | null): TaskFormInterface => ({
  title: '',
  description: '',
  date: moment(dateString),
  duration: '',
});

export default initialAddTaskFormValues;