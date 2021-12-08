import { ReactElement, useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import Column from '@components/Column';
import { BoardSection } from './Board.styled';
import { TaskInterface, TaskModel } from '@interfaces/task.interface';
import boardSelectors from '@store/selectors/board.selectors';
import { Week } from '@interfaces/week.interface';
import { DATE_FORMAT, DAYS_IN_WEEK } from '@consts/date.consts';
import taskSelectors from '@store/selectors/task.selectors';
import taskActionCreators from '@store/actionCreators/task-action.creators';
import { EntityUid } from '@mytypes/entity-uid.type';

const Board = (): ReactElement => {
  const week: Week | null = useSelector(boardSelectors.week);
  const tasks: TaskModel[] = useSelector(taskSelectors.tasks);
  const [filteredTasks, setFilteredTasks] = useState<Record<string, TaskInterface[]>>({});
  const [columns, setColumns] = useState<ReactElement[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    taskActionCreators.getAll()(dispatch);
  }, []);

  useEffect(() => {
    const filtered: Record<string, TaskInterface[]> = {};

    tasks.forEach((task, index) => {
      const taskFormattedDate = moment(task.date).format(DATE_FORMAT);

      if (!Array.isArray(filtered[taskFormattedDate])) {
        filtered[taskFormattedDate] = []
      }

      filtered[taskFormattedDate].push({ ...task, numericId: index });
    });

    setFilteredTasks(filtered);
  }, [tasks]);

  useEffect(() => {
    if (week) {
      const items: ReactElement[] = [];

      for (let i = 0; i < DAYS_IN_WEEK; i++) {
        const date = moment(week.start).add(i, 'days');
        items.push(
          <Column
            date={ date }
            tasks={ filteredTasks[date.format(DATE_FORMAT)] || [] }
            key={ i }
          />
        )
      }

      setColumns(items);
    }
  }, [week, filteredTasks]);

  const handleDragEnd = (result: DropResult): void => {
    console.log(result)
    const draggedTaskId: EntityUid = result.draggableId;
    const newDate = result.destination?.droppableId;

    if (newDate) {
      taskActionCreators.update(draggedTaskId, { date: newDate })(dispatch);
    }
  };

  return (
    <DragDropContext onDragEnd={ handleDragEnd }>
      <BoardSection>
        { columns }
      </BoardSection>
    </DragDropContext>
  );
};

export default Board;