import { ReactElement } from 'react';

import { Task } from '@interfaces/task.interface';
import { minutesToHoursAndMinutes } from '@utils/date.utils';
import { Description, Duration, StyledCard } from './TaskCard.styled';

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props): ReactElement => {
  return (
    <StyledCard title={ task.title } hoverable size="small">
      <Description>{ task.description }</Description>
      <Duration>{ minutesToHoursAndMinutes(task.duration) }</Duration>
    </StyledCard>
  );
};

export default TaskCard;