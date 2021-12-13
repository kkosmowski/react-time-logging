import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '@components/Header';
import Board from '@components/Board';
import { MainWrapper } from './Main.styled';
import uiSelectors from '@store/selectors/ui.selectors';
import TaskDialog from '@components/TaskDialog';
import ConfirmationDialog from '@components/ConfirmationDialog';
import SettingsDialog from '@components/SettingsDialog';
import uiActionCreators from '@store/actionCreators/ui-action.creators';

const Main = (): ReactElement => {
  const taskDialogOpened = useSelector(uiSelectors.taskDialogOpened);
  const confirmationDialogOpened = useSelector(uiSelectors.confirmationDialogOpened);
  const settingsDialogOpened = useSelector(uiSelectors.settingsDialogOpened);
  const dispatch = useDispatch();

  useEffect(() => {
    uiActionCreators.fetchSettings()(dispatch);
  }, []);

  return (
    <MainWrapper>
      <Header />
      <Board />
      { taskDialogOpened && <TaskDialog /> }
      { confirmationDialogOpened && <ConfirmationDialog /> }
      { settingsDialogOpened && <SettingsDialog /> }
    </MainWrapper>
  );
};

export default Main;