import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import Header from '@components/Header';
import Board from '@components/Board';
import { MainWrapper } from './Main.styled';
import uiSelectors from '@store/selectors/ui.selectors';
import TaskDialog from '@components/TaskDialog';
import ConfirmationDialog from '@components/ConfirmationDialog';

const Main = (): ReactElement => {
  const taskDialogOpened = useSelector(uiSelectors.taskDialogOpened);
  const confirmationDialogOpened = useSelector(uiSelectors.confirmationDialogOpened);

  return (
    <MainWrapper>
      <Header />
      <Board />
      { taskDialogOpened && <TaskDialog /> }
      { confirmationDialogOpened && <ConfirmationDialog /> }
    </MainWrapper>
  );
};

export default Main;