import { ReactElement } from 'react';

import { Task } from '@interfaces/task.interface';
import { minutesToHoursAndMinutes } from '@utils/task.utils';
import { Description, Duration, StyledCard } from './TaskCard.styled';

interface Props {
  onClick: (task: Task) => void;
  task: Task;
}

const TaskCard = ({ task, onClick }: Props): ReactElement => {
  const handleClick = (): void => {
    onClick(task);
  };

  return (
    <StyledCard
      onClick={ handleClick }
      title={ task.title }
      size="small"
      hoverable
    >
      <Description>{ task.description }</Description>
      <Duration>{ minutesToHoursAndMinutes(task.duration) }</Duration>
    </StyledCard>
  );
};

export default TaskCard;