import React, { ReactElement } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Dropdown, Menu } from 'antd';

import { TaskInterface } from '@interfaces/task.interface';
import { minutesToHoursAndMinutes } from '@utils/task.utils';
import { Description, Duration, StyledCard } from './TaskCard.styled';
import { stopPropagation } from '@utils/stop-propagation.util';
import { useTranslation } from 'react-i18next';

interface Props {
  onClick: (task: TaskInterface) => void;
  onCut: (task: TaskInterface) => void;
  onCopy: (task: TaskInterface) => void;
  onEdit: (task: TaskInterface) => void;
  onDelete: (task: TaskInterface) => void;
  task: TaskInterface;
  selected: boolean;
  selectable: boolean;
  cut: boolean;
}

const TaskCard = (
  { task, selected, selectable, cut, onClick, onCut, onCopy, onEdit, onDelete }: Props
): ReactElement => {
  const { t } = useTranslation('COMMON');

  const getClassName = (): string => {
    let result = '';

    if (selected) {
      result += '--selected ';
    } else if (selectable) {
      result += '--selectable ';
    }

    if (cut) {
      result += '--cut';
    }

    return result.trimRight();
  }

  const handleClick = (): void => { onClick(task); };
  const handleCut = (): void => { onCut(task); };
  const handleCopy = (): void => { onCopy(task); };
  const handleEdit = (): void => { onEdit(task); };
  const handleDelete = (): void => { onDelete(task); };

  const menu = (
    <Menu>
      <Menu.Item onClick={ handleCut } key="cut">{ t('CUT') }</Menu.Item>
      <Menu.Item onClick={ handleCopy } key="copy">{ t('COPY') }</Menu.Item>
      <Menu.Item onClick={ handleEdit } key="edit">{ t('EDIT') }</Menu.Item>
      <Menu.Item onClick={ handleDelete } danger key="delete">{ t('DELETE') }</Menu.Item>
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
                className={ getClassName() }
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