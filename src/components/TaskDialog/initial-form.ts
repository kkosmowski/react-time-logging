import { TaskFormInterface } from '@components/TaskDialog/domain/task-form.interface';
import moment from 'moment';
import { TaskDialogPayload } from '@payloads/task-dialog.payload';
import { TaskDialogType } from '@enums/task-dialog-type.enum';
import { minutesToHoursAndMinutes } from '@utils/task.utils';

const initialAddTaskFormValues = (data: TaskDialogPayload | null): TaskFormInterface => {
  if (data?.type === TaskDialogType.EditTask) {
    if (data?.task) {
      return {
        ...data.task,
        date: moment(data.task.date),
        duration: minutesToHoursAndMinutes(data.task.duration),
      };
    }
    throw new Error('Task Dialog payload type is EditTask but no task is provided.');
  } else if (data?.type === TaskDialogType.NewTask) {
    if (data?.date) {
      return {
        title: '',
        description: '',
        categories: [],
        date: moment(data.date),
        duration: '',
      };
    }
    throw new Error('Task Dialog payload type is NewTask but no date is provided.');
  } else {
    throw new Error('Unknown Task Dialog payload type.');
  }
};

export default initialAddTaskFormValues;