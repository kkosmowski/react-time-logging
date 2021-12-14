import { ReactElement, useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import Column from '@components/Column';
import { BoardSection } from './Board.styled';
import { TaskModel } from '@interfaces/task.interface';
import boardSelectors from '@store/selectors/board.selectors';
import { Week } from '@interfaces/week.interface';
import taskSelectors from '@store/selectors/task.selectors';
import taskActionCreators from '@store/actionCreators/task-action.creators';
import { EntityUid } from '@mytypes/entity-uid.type';
import BoardOverlay from './BoardOverlay';
import uiSelectors from '@store/selectors/ui.selectors';
import { calculateDaysToRender } from '@utils/calculate-days-to-render.util';
import { DAYS_IN_WEEK } from '@consts/date.consts';

const Board = (): ReactElement => {
  const week: Week | null = useSelector(boardSelectors.week);
  const tasks: TaskModel[] = useSelector(taskSelectors.tasks);
  const { weekendDisplay, weekStart, language } = useSelector(uiSelectors.settings);
  const tasksLoading = useSelector(taskSelectors.tasksLoading);
  const [filteredTasks, setFilteredTasks] = useState<Record<string, TaskModel[]>>({});
  const [columns, setColumns] = useState<ReactElement[]>([]);
  const [daysToRender, setDaysToRender] = useState(DAYS_IN_WEEK);
  const dispatch = useDispatch();

  useEffect(() => {
    taskActionCreators.getAll()(dispatch);
  }, []);

  useEffect(() => {
    setDaysToRender(calculateDaysToRender(weekendDisplay));
  }, [setDaysToRender, weekendDisplay]);

  useEffect(() => {
    const filtered: Record<string, TaskModel[]> = {};

    tasks.forEach((task) => {
      const taskFormattedDate = moment(task.date).toISOString();

      if (!Array.isArray(filtered[taskFormattedDate])) {
        filtered[taskFormattedDate] = [];
      }

      filtered[taskFormattedDate].push(task);
    });

    setFilteredTasks(filtered);
  }, [tasks]);

  useEffect(() => {
    if (week) {
      const items: ReactElement[] = [];

      for (let i = 0; i < daysToRender; i++) {
        const daysToAdd = (i + weekStart - 1) % daysToRender;
        const date = moment(week.start.toISOString()).add(daysToAdd, 'days');

        items.push(
          <Column
            date={ date }
            tasks={ filteredTasks[date.toISOString()] || [] }
            key={ i }
          />
        )
      }

      setColumns(items);
    }
  }, [week, filteredTasks, daysToRender, weekStart, language]);

  const handleDragEnd = async (result: DropResult): Promise<void> => {
    if (!result.destination) return;

    const oldDate = result.source.droppableId;
    const newDate = result.destination.droppableId;
    const oldColumn = filteredTasks[oldDate];
    const newColumn = filteredTasks[newDate];

    if (newDate) {
      const startId: EntityUid = oldColumn[result.source.index].id;
      let endId: EntityUid;
      let modifier = 0;

      if (newDate === oldDate) {
        if (result.source.index === result.destination.index) return;

        endId = oldColumn[result.destination.index].id;
        await taskActionCreators.reorder(startId, endId)(dispatch);
      } else {
        await taskActionCreators.update(result.draggableId, { date: newDate })(dispatch);

        if (newColumn?.length) {
          if (result.destination.index >= newColumn.length) {
            // there is no next element, so take id of previous el, but later compensate the position with modifier
            endId = newColumn[result.destination.index - 1].id;
            modifier = 1;
          } else {
            endId = newColumn[result.destination.index].id;
          }
          await taskActionCreators.reorder(startId, endId, modifier)(dispatch);
        }
      }
    }
  };

  return (
    <DragDropContext onDragEnd={ handleDragEnd }>
      <BoardSection>
        { columns }
        { tasksLoading && <BoardOverlay /> }
      </BoardSection>
    </DragDropContext>
  );
};

export default Board;