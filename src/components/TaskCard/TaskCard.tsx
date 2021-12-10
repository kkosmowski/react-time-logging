import { ReactElement } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { TaskInterface } from '@interfaces/task.interface';
import { minutesToHoursAndMinutes } from '@utils/task.utils';
import { Description, Duration, StyledCard } from './TaskCard.styled';

interface Props {
  onClick: (task: TaskInterface) => void;
  task: TaskInterface;
}

const TaskCard = ({ task, onClick }: Props): ReactElement => {
  const handleClick = (): void => {
    onClick(task);
  };

  return (
    <Draggable draggableId={ task.id } index={ task.numericId }>
      { (provided) => (
        <div
          ref={ provided.innerRef }
          { ...provided.draggableProps }
          { ...provided.dragHandleProps }
        >
          <StyledCard
            onClick={ handleClick }
            title={ task.title }
            size="small"
            hoverable
          >
            <Description>{ task.description }</Description>
            <span>{ task.numericId }</span>
            <Duration>{ minutesToHoursAndMinutes(task.duration) }</Duration>
          </StyledCard>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;