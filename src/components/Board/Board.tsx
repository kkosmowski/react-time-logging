import { ReactElement, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import Column from '@components/Column';
import { BoardSection } from './Board.styled';
import { Task } from '@interfaces/task.interface';
import { useSelector } from 'react-redux';
import boardSelectors from '@store/selectors/board.selectors';
import { Week } from '@interfaces/week.interface';
import { DAYS_IN_WEEK } from '@consts/date.consts';
import moment from 'moment';

const Board = (): ReactElement => {
  const week: Week | null = useSelector(boardSelectors.week);
  const [columns, setColumns] = useState<ReactElement[]>([]);

  const mockedTasks: Task[] = [
    { id: v4(), title: 'Test 1', duration: 120 },
    { id: v4(), title: 'Test 2', duration: 240 },
    { id: v4(), title: 'Test 3', duration: 90 },
  ];

  useEffect(() => {
    if (week) {
      const items: ReactElement[] = [];

      for (let i = 0; i < DAYS_IN_WEEK; i++) {
        items.push(
          <Column
            date={ moment(week.start).add(i, 'days') }
            tasks={ mockedTasks }
            key={ i }
          />
        )
      }

      setColumns(items);
    }
  }, [week]);

  return (
    <BoardSection>
      { columns }
    </BoardSection>
  );
};

export default Board;