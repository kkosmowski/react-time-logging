import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import Header from '@components/Header';
import Board from '@components/Board';
import { MainWrapper } from './Main.styled';
import uiSelectors from '@store/selectors/ui.selectors';
import AddTaskDialog from '@components/AddTaskDialog';

const Main = (): ReactElement => {
  const addTaskDialogOpened = useSelector(uiSelectors.addTaskDialogOpened);

  return (
    <MainWrapper>
      <Header />
      <Board />
      { addTaskDialogOpened && <AddTaskDialog /> }
    </MainWrapper>
  );
};

export default Main;