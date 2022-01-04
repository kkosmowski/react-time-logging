import { ReactElement, useEffect, useState } from 'react';
import { Button, Dropdown, Menu, Row, Tooltip } from 'antd';
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
import {
  COLUMN_DATE_FORMAT,
  DATE_FORMAT,
  DAY_NAME_FORMAT,
  MINUTES_IN_HOUR
} from '@consts/date.consts';
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
import { useTranslation } from 'react-i18next';
import { DragData } from '@interfaces/drag-data.interface';

interface Props {
  date: Moment;
  tasks: TaskModel[];
  totalMinutes: number;
  dragData: DragData;
}

const Column = ({ date, tasks, totalMinutes, dragData }: Props): ReactElement => {
  const dateString = date.toISOString();
  const clipboard = useSelector(uiSelectors.clipboard);
  const { dayTarget, dayLimit } = useSelector(uiSelectors.settings);
  const selectionMode = useSelector(taskSelectors.selectionMode(dateString));
  const selectedTasks = useSelector(taskSelectors.selected(dateString));
  const [cards, setCards] = useState<ReactElement[]>([]);
  const [isDropDisabled, setIsDropDisabled] = useState(false);
  const [isToday, setIsToday] = useState(false);
  const [isPasteDisabled, setIsPasteDisabled] = useState(false);
  const dayLimitInMinutes = dayLimit * MINUTES_IN_HOUR;
  const { t } = useTranslation('COLUMN');
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
        totalColumnMinutes: totalMinutes,
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
    if (!dragData.task || dragData.sourceColumn === dateString) {
      setIsDropDisabled(false);
      return;
    }

    const maxAllowedMinutes = dayLimitInMinutes - totalMinutes;
    setIsDropDisabled(dragData.task.duration > maxAllowedMinutes);
  }, [dragData]);

  useEffect(() => {
    checkIfIsToday();
  }, [date]);

  useEffect(() => {
    const cardsArray: ReactElement[] = [];
    let minutes = 0;

    tasks.forEach((task, index) => {
      const isTaskCut = clipboard?.action === ClipboardAction.Cut && clipboard.task.id === task.id;

      cardsArray.push(
        <TaskCard
          onClick={ handleTaskCardClick }
          onCut={ handleTaskCut }
          onCopy={ handleTaskCopy }
          task={ {...task, numericId: index } }
          selected={ selectedTasks?.includes(task.id) }
          selectable={ selectionMode }
          cut={ isTaskCut }
          key={ task.id }
        />
      );
      minutes += task.duration;
    });

    totalMinutes = minutes;
    setCards(cardsArray);
  }, [tasks, selectedTasks, selectionMode, clipboard]);

  useEffect(() => {
    setIsPasteDisabled(clipboard?.task
      ? clipboard.task.duration + totalMinutes > dayLimitInMinutes
      : false
    );
  }, [clipboard, cards]);

  const menu = (
    <Menu>
        <Menu.Item onClick={ handlePaste } disabled={ !clipboard || isPasteDisabled } key="paste">
          <Tooltip
            title={ isPasteDisabled
              ? t('CANNOT_PASTE_BECAUSE_OF_LIMIT', { limit: dayLimit } )
              : !clipboard
                ? t('NOTHING_TO_PASTE')
                : ''
            }
          >
            { t('COMMON:PASTE') }
          </Tooltip>
        </Menu.Item>
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

      <Droppable droppableId={ dateString } isDropDisabled={ isDropDisabled }>
        { (provided, snapshot) => (
          <Dropdown overlay={ menu } trigger={ ['contextMenu'] }>
            <ColumnBody
              ref={ provided.innerRef }
              draggedOver={ snapshot.isDraggingOver }
              isDropDisabled={ isDropDisabled }
              { ...provided.droppableProps }
            >
              { cards }
              { provided.placeholder }

              <Controls className="controls">
                <Button onClick={ handleAddTask } shape="circle" icon={ <PlusCircleOutlined /> } />

                <Button
                  onClick={ handleSelectTasks }
                  shape="circle"
                  disabled={ !cards.length }
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

              { isDropDisabled && (
                <div className="drop-limit-warning">
                  { t('CANNOT_DROP_BECAUSE_OF_LIMIT', { limit: dayLimit }) }
                </div>
              ) }
            </ColumnBody>
          </Dropdown>
        ) }
      </Droppable>
    </ColumnWrapper>
  );
};

export default Column;