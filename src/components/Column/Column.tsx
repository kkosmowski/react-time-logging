import { ReactElement, useEffect, useState } from 'react';
import { Button, Dropdown, Menu, Row } from 'antd';
import moment, { Moment } from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';

import {
  ColumnBody,
  ColumnHeader,
  ColumnWrapper,
  Controls,
  DayDate,
  DayName,
  HoursDetails,
} from './Column.styled';
import { TaskInterface, TaskModel } from '@interfaces/task.interface';
import { COLUMN_DATE_FORMAT, DATE_FORMAT, DAY_NAME_FORMAT } from '@consts/date.consts';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import { minutesToHoursAndMinutes } from '@utils/task.utils';
import TaskCard from '@components/TaskCard';
import TimeIndicator from './TimeIndicator';
import { TaskDialogType } from '@enums/task-dialog-type.enum';
import { ClipboardAction } from '@enums/clipboard-action.enum';
import uiSelectors from '@store/selectors/ui.selectors';
import taskActionCreators from '@store/actionCreators/task-action.creators';
import { ConfirmationAction } from '@enums/confirmation-action.enum';
import taskSelectors from '@store/selectors/task.selectors';
import { SelectTaskPayload } from '@payloads/select-task.payload';

interface Props {
  date: Moment;
  tasks: TaskModel[];
}

const Column = ({ date, tasks }: Props): ReactElement => {
  const dateString = date.toISOString();
  const clipboard = useSelector(uiSelectors.clipboard);
  const { dayTarget, dayLimit } = useSelector(uiSelectors.settings);
  const selectionMode = useSelector(taskSelectors.selectionMode(dateString));
  const selectedTasks = useSelector(taskSelectors.selected(dateString));
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [cards, setCards] = useState<ReactElement[]>([]);
  const [isToday, setIsToday] = useState(false);
  const dispatch = useDispatch();

  const checkIfIsToday = (): void => {
    setIsToday(moment().format(DATE_FORMAT) === date.format(DATE_FORMAT));
  };

  const handleAddTask = (): void => {
    dispatch(uiActionCreators.openTaskDialog({
      type: TaskDialogType.NewTask,
      date: dateString,
    }));
  };

  const handleSelectTasks = (): void => {
    dispatch(taskActionCreators.toggleSelectionMode({
      column: dateString,
      value: !selectionMode,
    }));
  };

  const handleDeleteTasks = (): void => {
    if (selectedTasks?.length === 1) {
      const taskToDelete = tasks.find(t => t.id === selectedTasks[0]);

      if (taskToDelete) {
        dispatch(uiActionCreators.openConfirmationDialog(
          ConfirmationAction.DeleteTask,
          taskToDelete,
        ));
      }
    } else if (selectedTasks?.length > 1) {
      dispatch(uiActionCreators.openConfirmationDialog(
        ConfirmationAction.DeleteMultipleTasks,
        {
          column: dateString,
          taskIds: selectedTasks,
        },
      ));
    } else {
      dispatch(taskActionCreators.toggleSelectionMode({
        column: dateString,
        value: false,
      }));
    }
  };

  const handleTaskCardClick = (task: TaskInterface): void => {
    if (selectionMode) {
      const payload: SelectTaskPayload = { column: dateString, taskId: task.id };

      if (selectedTasks?.includes(task.id)) {
        dispatch(taskActionCreators.deselect(payload));
      } else {
        dispatch(taskActionCreators.select(payload));
      }
    } else {
      const { numericId, ...taskModel } = task;

      dispatch(uiActionCreators.openTaskDialog({
        type: TaskDialogType.ExistingTask,
        task: taskModel,
      }));
    }
  };

  const setClipboard = (action: ClipboardAction, task: TaskInterface): void => {
    const { numericId, ...taskModel } = task;
    dispatch(uiActionCreators.setClipboard({ action, task: taskModel }));
  };

  const handleTaskCut = (task: TaskInterface): void => {
    setClipboard(ClipboardAction.Cut, task);
  };

  const handleTaskCopy = (task: TaskInterface): void => {
    setClipboard(ClipboardAction.Copy, task);
  };

  const handlePaste = (): void => {
    if (clipboard) {
      taskActionCreators.paste(clipboard, date)(dispatch);
    }
  };

  useEffect(() => {
    checkIfIsToday();
  }, [date]);

  useEffect(() => {
    const cardsArray: ReactElement[] = [];
    let minutes = 0;

    tasks.forEach((task, index) => {
      cardsArray.push(
        <TaskCard
          onClick={ handleTaskCardClick }
          onCut={ handleTaskCut }
          onCopy={ handleTaskCopy }
          task={ {...task, numericId: index } }
          selected={ selectedTasks?.includes(task.id) }
          selectable={ selectionMode }
          key={ task.id }
        />
      );
      minutes += task.duration;
    });

    setCards(cardsArray);
    setTotalMinutes(minutes);
  }, [tasks, selectedTasks, selectionMode]);

  const menu = (
    <Menu>
      <Menu.Item onClick={ handlePaste } disabled={ !clipboard } key="paste">Paste</Menu.Item>
    </Menu>
  );

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

      <TimeIndicator value={ totalMinutes } dayTarget={ dayTarget } dayLimit={ dayLimit } />

      <Droppable droppableId={ dateString }>
        { (provided, snapshot) => (
          <Dropdown overlay={ menu } trigger={ ['contextMenu'] }>
            <ColumnBody
              ref={ provided.innerRef }
              draggedOver={ snapshot.isDraggingOver }
              { ...provided.droppableProps }
            >
              { cards }
              { provided.placeholder }

              <Controls className="controls">
                <Button onClick={ handleAddTask } shape="circle" icon={ <PlusCircleOutlined /> } />

                <Button
                  onClick={ handleSelectTasks }
                  shape="circle"
                  icon={ selectionMode ? <CloseCircleOutlined /> : <CheckCircleOutlined /> }
                />

                { selectionMode &&
                  <Button
                    onClick={ handleDeleteTasks }
                    shape="circle"
                    icon={ <DeleteOutlined /> }
                  />
                }
              </Controls>
            </ColumnBody>
          </Dropdown>
        ) }
      </Droppable>
    </ColumnWrapper>
  );
};

export default Column;