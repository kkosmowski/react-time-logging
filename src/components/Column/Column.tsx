import { ReactElement, useEffect, useState } from 'react';
import { Row } from 'antd';
import moment, { Moment } from 'moment';
import { useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import {
  ColumnBody,
  ColumnHeader,
  ColumnWrapper,
  DayDate,
  DayName,
  HoursDetails,
} from './Column.styled';
import { TaskInterface } from '@interfaces/task.interface';
import { COLUMN_DATE_FORMAT, DATE_FORMAT, DAY_NAME_FORMAT } from '@consts/date.consts';
import { ZERO } from '@consts/numbers.consts';
import AddTask from '@components/AddTask';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import { minutesToHoursAndMinutes } from '@utils/task.utils';
import TaskCard from '@components/TaskCard';
import TimeIndicator from './TimeIndicator';
import { TaskDialogType } from '@enums/task-dialog-type.enum';

interface Props {
  date: Moment;
  tasks: TaskInterface[];
}

const Column = ({ date, tasks }: Props): ReactElement => {
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

  useEffect(() => {
    checkIfIsToday();
  }, [date]);

  useEffect(() => {
    const cardsArray: ReactElement[] = [];
    let minutes = 0;

    tasks.forEach((task) => {
      cardsArray.push(
        <TaskCard onClick={ handleTaskCardClick } task={ task } key={ task.id } />
      );
      minutes += task.duration;
    });

    setCards(cardsArray);
    setTotalMinutes(minutes);

  }, [tasks]);

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
          <ColumnBody
            ref={ provided.innerRef }
            draggedOver={ snapshot.isDraggingOver }
            { ...provided.droppableProps }
          >
            { cards }
            <AddTask onAdd={ handleAddTask } />
          </ColumnBody>
        ) }
      </Droppable>
    </ColumnWrapper>
  );
};

export default Column;