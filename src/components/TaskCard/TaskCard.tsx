import React, { ReactElement } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Dropdown, Menu } from 'antd';

import { TaskInterface } from '@interfaces/task.interface';
import { minutesToHoursAndMinutes } from '@utils/task.utils';
import { Description, Duration, StyledCard } from './TaskCard.styled';
import { stopPropagation } from '@utils/stop-propagation.util';

interface Props {
  onClick: (task: TaskInterface) => void;
  onCut: (task: TaskInterface) => void;
  onCopy: (task: TaskInterface) => void;
  task: TaskInterface;
  selected: boolean;
  selectable: boolean;
}

const TaskCard = ({ task, selected, selectable, onClick, onCut, onCopy }: Props): ReactElement => {
  const handleClick = (): void => {
    onClick(task);
  };

  const handleCut = (): void => {
    onCut(task);
  };

  const handleCopy = (): void => {
    onCopy(task);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={ handleCut } key="cut">Cut</Menu.Item>
      <Menu.Item onClick={ handleCopy } key="copy">Copy</Menu.Item>
    </Menu>
  );

  return (
    <Draggable draggableId={ task.id } index={ task.numericId }>
      { (provided) => (
        <div
          onContextMenu={ stopPropagation }
          ref={ provided.innerRef }
          { ...provided.draggableProps }
          { ...provided.dragHandleProps }
        >
          <Dropdown overlay={ menu } trigger={ ['contextMenu'] }>
            <div>
              <StyledCard
                onClick={ handleClick }
                title={ task.title }
                className={ selected ? '--selected' : selectable ? '--selectable' : '' }
                size="small"
                hoverable
              >
                <Description>{ task.description }</Description>
                <Duration>{ minutesToHoursAndMinutes(task.duration) }</Duration>
              </StyledCard>
            </div>
          </Dropdown>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;