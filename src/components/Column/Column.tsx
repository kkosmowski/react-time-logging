import { ReactElement, useEffect, useState } from 'react';
import { Row } from 'antd';
import moment, { Moment } from 'moment';
import { useDispatch } from 'react-redux';

import {
  ColumnBody,
  ColumnHeader,
  ColumnWrapper,
  DayDate,
  DayName,
  HoursDetails,
} from './Column.styled';
import { Task } from '@interfaces/task.interface';
import {
  COLUMN_DATE_FORMAT,
  DATE_FORMAT,
  DAY_NAME_FORMAT
} from '@consts/date.consts';
import { ZERO } from '@consts/numbers.consts';
import AddTask from '@components/AddTask';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import { minutesToHoursAndMinutes } from '@utils/date.utils';
import TaskCard from '@components/TaskCard';
import TimeIndicator from './TimeIndicator';

interface Props {
  date: Moment;
  tasks: Task[];
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
    dispatch(uiActionCreators.openAddTaskDialog(date.toISOString()));
  };

  useEffect(() => {
    checkIfIsToday();
  }, [date]);

  useEffect(() => {
    const cardsArray: ReactElement[] = [];
    let minutes = 0;

    tasks.forEach((task) => {
      cardsArray.push(
        <TaskCard task={ task } key={ task.id } />
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

      <ColumnBody>
        { cards }
        <AddTask onAdd={ handleAddTask } />
      </ColumnBody>
    </ColumnWrapper>
  );
};

export default Column;