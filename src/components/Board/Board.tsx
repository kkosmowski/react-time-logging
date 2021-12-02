import { ReactElement } from 'react';
import { v4 } from 'uuid';

import Column from '@components/Column';
import { BoardSection } from './Board.styled';
import { Task } from '@interfaces/task.interface';
import { EntityUid } from '@mytypes/entity-uid.type';

const Board = (): ReactElement => {
  const id: EntityUid = v4();

  const mockedTasks: Task[] = [
    { id: v4(), title: 'Test 1', duration: 120 },
    { id: v4(), title: 'Test 2', duration: 240 },
    { id: v4(), title: 'Test 3', duration: 90 },
  ]

  return (
    <BoardSection>
      <Column tasks={ mockedTasks } />
    </BoardSection>
  );
};

export default Board;