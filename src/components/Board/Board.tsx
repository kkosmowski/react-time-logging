import { ReactElement, useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';

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
import { DragData } from '@interfaces/drag-data.interface';
import { ColumnInterface } from '@interfaces/column.interface';
import boardActionCreators from '@store/actionCreators/board-action.creators';

const Board = (): ReactElement => {
  const week: Week | null = useSelector(boardSelectors.week);
  const tasks: TaskModel[] = useSelector(taskSelectors.tasks);
  const filteredTasks: TaskModel[] = useSelector(taskSelectors.filtered);
  const { weekendDisplay, weekStart } = useSelector(uiSelectors.settings);
  const tasksLoading = useSelector(taskSelectors.tasksLoading);
  const [organizedTasks, setOrganizedTasks] = useState<Record<string, TaskModel[]>>({});
  const [columnElements, setColumnElements] = useState<ReactElement[]>([]);
  const [dragData, setDragData] = useState<DragData>({});
  const [daysToRender, setDaysToRender] = useState(0);
  const dispatch = useDispatch();

  const getTotalMinutes = (tasks: TaskModel[], dateString: string): number => {
    return tasks
      .filter(task => task.date === dateString)
      .reduce((sum, task) => sum + task.duration, 0);
  }

  useEffect(() => {
    taskActionCreators.getAll()(dispatch);
  }, []);

  useEffect(() => {
    setDaysToRender(calculateDaysToRender(weekendDisplay));
  }, [setDaysToRender, weekendDisplay]);

  useEffect(() => {
    const organized: Record<string, TaskModel[]> = {};

    filteredTasks.forEach((task) => {
      const taskFormattedDate = moment(task.date).toISOString();

      if (!Array.isArray(organized[taskFormattedDate])) {
        organized[taskFormattedDate] = [];
      }

      organized[taskFormattedDate].push(task);
    });

    setOrganizedTasks(organized);
  }, [filteredTasks]);

  useEffect(() => {
    if (week && daysToRender) {
      const items: ReactElement[] = [];
      const columns: ColumnInterface[] = [];
      const newWeek = moment(week.start.toISOString());

      for (let i = 0; i < daysToRender; i++) {
        const daysToAdd = (i + weekStart - 1) % daysToRender;
        const date = moment(newWeek).add(daysToAdd, 'days');
        const dateString = date.toISOString();
        const totalMinutes = getTotalMinutes(tasks, dateString);

        columns.push({
          totalMinutes,
          filteredMinutes: getTotalMinutes(filteredTasks, dateString),
        });

        items.push(
          <Column
            date={ date }
            tasks={ organizedTasks[dateString] || [] }
            totalMinutes={ totalMinutes }
            dragData={ dragData }
            key={ i }
          />
        )
      }

      setColumnElements(items);
      dispatch(boardActionCreators.setColumns(columns));
    }
  }, [week, daysToRender, weekStart, organizedTasks, dragData]);

  const handleDragStart = (initial: DragStart): void => {
    const taskId = initial.draggableId;
    const column = initial.source.droppableId;

    setDragData({
      task: tasks.find((task) => task.id === taskId),
      sourceColumn: column,
    });
  };

  const handleDragEnd = async (result: DropResult): Promise<void> => {
    setDragData({});

    if (!result.destination) return;

    const oldDate = result.source.droppableId;
    const newDate = result.destination.droppableId;
    const oldColumn = organizedTasks[oldDate];
    const newColumn = organizedTasks[newDate];

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
    <DragDropContext onDragEnd={ handleDragEnd } onDragStart={ handleDragStart }>
      <BoardSection>
        { columnElements }
        { tasksLoading && <BoardOverlay /> }
      </BoardSection>
    </DragDropContext>
  );
};

export default Board;