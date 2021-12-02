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
import { MINUTES_IN_HOUR } from '@consts/date.consts';
import { PRECISION_CONST } from '@consts/numbers.consts';

interface Props {
  tasks: Task[];
}

const Column = ({ tasks }: Props): ReactElement => {
  const [totalTime, setTotalTime] = useState(0);
  const [cards, setCards] = useState<ReactElement[]>([]);

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
    <ColumnWrapper>
      <ColumnHeader>
        <Row justify="space-between">
          <p>
            <DayName>Monday</DayName>
            <DayDate>02–12</DayDate>
          </p>

          <HoursDetails>
            { (totalTime / MINUTES_IN_HOUR).toPrecision(PRECISION_CONST) }h
          </HoursDetails>
        </Row>
        <TimeIndicator />
      </ColumnHeader>
      <ColumnBody>
        { cards }
      </ColumnBody>
    </ColumnWrapper>
  );
};

export default Column;