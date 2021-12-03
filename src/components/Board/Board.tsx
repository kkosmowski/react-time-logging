import { ReactElement, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import moment from 'moment';
import { useSelector } from 'react-redux';

import Column from '@components/Column';
import { BoardSection } from './Board.styled';
import { Task } from '@interfaces/task.interface';
import boardSelectors from '@store/selectors/board.selectors';
import { Week } from '@interfaces/week.interface';
import { DAYS_IN_WEEK } from '@consts/date.consts';

const Board = (): ReactElement => {
  const week: Week | null = useSelector(boardSelectors.week);
  const [columns, setColumns] = useState<ReactElement[]>([]);

  const mockedTasks: Task[] = [
    { id: v4(), title: 'Test 1', description: '', duration: 120, date: moment() },
    { id: v4(), title: 'Test 2', description: '', duration: 240, date: moment() },
    { id: v4(), title: 'Test 3', description: '', duration: 90, date: moment() },
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