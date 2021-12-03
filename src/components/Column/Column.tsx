import { ReactElement, useEffect, useState } from 'react';
import { Row } from 'antd';

import {
  ColumnBody,
  ColumnHeader,
  ColumnWrapper,
  DayDate,
  DayName,
  HoursDetails,
  TimeIndicator
} from './Column.styled';
import { Task } from '@interfaces/task.interface';
import {
  COLUMN_DATE_FORMAT,
  DATE_FORMAT,
  DAY_NAME_FORMAT,
  MINUTES_IN_HOUR
} from '@consts/date.consts';
import { PRECISION_CONST } from '@consts/numbers.consts';
import moment, { Moment } from 'moment';
import AddTask from '@components/AddTask';
import { useDispatch } from 'react-redux';
import uiActionCreators from '@store/actionCreators/ui-action.creators';

interface Props {
  date: Moment;
  tasks: Task[];
}

const Column = ({ date, tasks }: Props): ReactElement => {
  const [totalTime, setTotalTime] = useState(0);
  const [cards, setCards] = useState<ReactElement[]>([]);
  const [isToday, setIsToday] = useState(false);
  const dispatch = useDispatch();

  const checkIfIsToday = (): void => {
    setIsToday(moment().format(DATE_FORMAT) === date.format(DATE_FORMAT));
  };

  const handleAddTask = (): void => {
    dispatch(uiActionCreators.openAddTaskDialog());
  };

  useEffect(() => {
    checkIfIsToday();
  }, [date]);

  useEffect(() => {
    const cardsArray: ReactElement[] = [];
    let time = 0;

    tasks.forEach((task) => {
      cardsArray.push(
        <div key={ task.id }>{ task.title }</div>
      );
      time += task.duration;
    });

    setCards(cardsArray);
    setTotalTime(time);

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
            { (totalTime / MINUTES_IN_HOUR).toPrecision(PRECISION_CONST) }h
          </HoursDetails>
        </Row>
      </ColumnHeader>

      <TimeIndicator />

      <ColumnBody>
        { cards }
        <AddTask onAdd={ handleAddTask } />
      </ColumnBody>
    </ColumnWrapper>
  );
};

export default Column;