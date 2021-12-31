import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateDaysToRender } from '@utils/calculate-days-to-render.util';
import { WeekendDisplay } from '@enums/weekend-display.enum';
import styled from 'styled-components/macro';
import { minutesToHoursAndMinutes } from '@utils/task.utils';
import { ColumnInterface } from '@interfaces/column.interface';

interface Props {
  weekendDisplay: WeekendDisplay;
  dayTarget: number;
  columns: ColumnInterface[];
}

const TotalTime = ({ weekendDisplay, dayTarget, columns }: Props): ReactElement => {
  const { t } = useTranslation('HEADER');
  const visibleDaysCount = calculateDaysToRender(weekendDisplay);
  const weekTargetHours = visibleDaysCount * dayTarget;
  const totalFilteredTime = minutesToHoursAndMinutes(columns.reduce((sum, column) => sum + column.filteredMinutes, 0));
  const totalTime = minutesToHoursAndMinutes(columns.reduce((sum, column) => sum + column.totalMinutes, 0));

  return (
    <StyledSpan>
      { t('TOTAL_TIME_THIS_WEEK') }: <strong>{ totalFilteredTime }</strong>
      { totalFilteredTime !== totalTime && <>&nbsp;(<strong>{ totalTime }</strong>)</> }
      &nbsp;/ <strong>{ weekTargetHours }h</strong>
    </StyledSpan>
  )
};

export default TotalTime;

const StyledSpan = styled.span`
  margin-left: auto;
  white-space: nowrap;
  padding-left: 40px;
`;