import { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
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
import { Language } from '@enums/language.enum';
import { DAYS_OPTIONS, SHORT_DAYS } from '@consts/date.consts';

moment.locale('en-US');

const Main = (): ReactElement => {
  const [locale, setLocale] = useState<any>(enUS);
  const { language } = useSelector(uiSelectors.settings);
  const taskDialogOpened = useSelector(uiSelectors.taskDialogOpened);
  const confirmationDialogOpened = useSelector(uiSelectors.confirmationDialogOpened);
  const settingsDialogOpened = useSelector(uiSelectors.settingsDialogOpened);
  const dispatch = useDispatch();
  const { t } = useTranslation('COMMON');

  useEffect(() => {
    uiActionCreators.fetchSettings()(dispatch);
  }, []);

  useLayoutEffect(() => {
    i18next.changeLanguage(language).then(() => {
      const week = {
        week: {
          dow: 1
        },
        weekdays: DAYS_OPTIONS.map(day => t(day.label)),
        weekdaysShort: SHORT_DAYS.map(day => t(day)),
      };

      moment.locale(language, week);
      // @todo: locale change seems to be incorrect
      if (language === Language.EN) {
        setLocale(enUS);
      } else {
        setLocale(plPL);
      }
    });
  }, [language]);

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