import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import moment from 'moment';
import enUS from 'antd/lib/locale/en_US';
import plPL from 'antd/lib/locale/pl_PL';
import 'moment/locale/pl';
import { ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';

import Header from '@components/Header';
import Board from '@components/Board';
import { MainWrapper } from './Main.styled';
import uiSelectors from '@store/selectors/ui.selectors';
import TaskDialog from '@components/TaskDialog';
import ConfirmationDialog from '@components/ConfirmationDialog';
import SettingsDialog from '@components/SettingsDialog';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import { getLocaleWeek } from '@utils/get-locale-week.util';
import { Language } from '@enums/language.enum';

moment.locale('en-US');

const Main = (): ReactElement => {
  const [locale, setLocale] = useState(enUS);
  const { language, theme, condensed } = useSelector(uiSelectors.settings);
  const taskDialogOpened = useSelector(uiSelectors.taskDialogOpened);
  const confirmationDialogOpened = useSelector(uiSelectors.confirmationDialogOpened);
  const settingsDialogOpened = useSelector(uiSelectors.settingsDialogOpened);
  const dispatch = useDispatch();
  const { t } = useTranslation('COMMON');

  useEffect(() => {
    uiActionCreators.fetchSettings()(dispatch);
  }, []);

  useEffect(() => {
    i18next.changeLanguage(language)
    moment.locale(language, getLocaleWeek(t));

    if (language === Language.EN) {
      setLocale(enUS);
    } else {
      setLocale(plPL);
    }
  }, [language]);

  useEffect(() => {
    document.body.className = theme + (condensed ? ' --condensed' : '');
  }, [theme, condensed]);

  return (
    <ConfigProvider locale={ locale }>
      <MainWrapper>
        <Header />
        <Board />
        { taskDialogOpened && <TaskDialog /> }
        { confirmationDialogOpened && <ConfirmationDialog /> }
        { settingsDialogOpened && <SettingsDialog /> }
      </MainWrapper>
    </ConfigProvider>
  );
};

export default Main;