import { ReactElement, useEffect, useState } from 'react';
import { Dropdown, Menu, Row } from 'antd';
import moment, { Moment } from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import {
  ColumnBody,
  ColumnHeader,
  ColumnWrapper,
  DayDate,
  DayName,
  HoursDetails,
} from './Column.styled';
import { TaskInterface, TaskModel } from '@interfaces/task.interface';
import { COLUMN_DATE_FORMAT, DATE_FORMAT, DAY_NAME_FORMAT } from '@consts/date.consts';
import { ZERO } from '@consts/numbers.consts';
import AddTask from '@components/AddTask';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import { minutesToHoursAndMinutes } from '@utils/task.utils';
import TaskCard from '@components/TaskCard';
import TimeIndicator from './TimeIndicator';
import { TaskDialogType } from '@enums/task-dialog-type.enum';
import { ClipboardAction } from '@enums/clipboard-action.enum';
import uiSelectors from '@store/selectors/ui.selectors';
import taskActionCreators from '@store/actionCreators/task-action.creators';

interface Props {
  date: Moment;
  tasks: TaskModel[];
}

const Column = ({ date, tasks }: Props): ReactElement => {
  const clipboard = useSelector(uiSelectors.clipboard);
  const [totalMinutes, setTotalMinutes] = useState(ZERO);
  const [cards, setCards] = useState<ReactElement[]>([]);
  const [isToday, setIsToday] = useState(false);
  const dispatch = useDispatch();

  const checkIfIsToday = (): void => {
    setIsToday(moment().format(DATE_FORMAT) === date.format(DATE_FORMAT));
  };

  const handleAddTask = (): void => {
    dispatch(uiActionCreators.openTaskDialog({
      type: TaskDialogType.NewTask,
      date: date.toISOString(),
    }));
  };

  const handleTaskCardClick = (task: TaskInterface): void => {
    const { numericId, ...taskModel } = task;
    dispatch(uiActionCreators.openTaskDialog({
      type: TaskDialogType.ExistingTask,
      task: taskModel,
    }));
  };

  const setClipboard = (action: ClipboardAction, task: TaskInterface): void => {
    const { numericId, ...taskModel } = task;
    dispatch(uiActionCreators.setClipboard({ action, task: taskModel }));
  };

  const handleTaskCut = (task: TaskInterface): void => {
    setClipboard(ClipboardAction.Cut, task);
  };

  const handleTaskCopy = (task: TaskInterface): void => {
    setClipboard(ClipboardAction.Copy, task);
  };

  const handlePaste = (): void => {
    if (clipboard) {
      taskActionCreators.paste(clipboard, date)(dispatch);
    }
  };

  useEffect(() => {
    checkIfIsToday();
  }, [date]);

  useEffect(() => {
    const cardsArray: ReactElement[] = [];
    let minutes = 0;

    tasks.forEach((task, index) => {
      cardsArray.push(
        <TaskCard
          onClick={ handleTaskCardClick }
          onCut={ handleTaskCut }
          onCopy={ handleTaskCopy }
          task={ {...task, numericId: index } }
          key={ task.id }
        />
      );
      minutes += task.duration;
    });

    setCards(cardsArray);
    setTotalMinutes(minutes);
  }, [tasks]);

  const menu = (
    <Menu>
      <Menu.Item onClick={ handlePaste } disabled={ !clipboard } key="paste">Paste</Menu.Item>
    </Menu>
  )

  return (
    <ColumnWrapper className={ isToday ? '--today' : '' }>
      <ColumnHeader>
        <Row justify="space-between">
          <p>
            <DayName>{ date.format(DAY_NAME_FORMAT) }</DayName>
            <DayDate>{ date.format(COLUMN_DATE_FORMAT) }</DayDate>
          </p>

          <HoursDetails>
            { minutesToHoursAndMinutes(totalMinutes) }
          </HoursDetails>
        </Row>
      </ColumnHeader>

      <TimeIndicator value={ totalMinutes } />

      <Droppable droppableId={ date.toISOString() }>
        { (provided, snapshot) => (
          <Dropdown overlay={ menu } trigger={ ['contextMenu'] }>
            <ColumnBody
              ref={ provided.innerRef }
              draggedOver={ snapshot.isDraggingOver }
              { ...provided.droppableProps }
            >
              { cards }
              { provided.placeholder }
              <AddTask onAdd={ handleAddTask } />
            </ColumnBody>
          </Dropdown>
        ) }
      </Droppable>
    </ColumnWrapper>
  );
};

export default Column;