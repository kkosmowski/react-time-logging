import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateDaysToRender } from '@utils/calculate-days-to-render.util';
import { WeekendDisplay } from '@enums/weekend-display.enum';
import styled from 'styled-components/macro';
import { minutesToHoursAndMinutes } from '@utils/task.utils';

interface Props {
  weekendDisplay: WeekendDisplay;
  dayLimit: number;
}

const TotalTime = ({ weekendDisplay, dayLimit }: Props): ReactElement => {
  const { t } = useTranslation('HEADER');
  const visibleDaysCount = calculateDaysToRender(weekendDisplay);
  const weekTargetHours = visibleDaysCount * dayLimit;
  const totalFilteredTime = minutesToHoursAndMinutes(330);
  const totalTime = minutesToHoursAndMinutes(670);

  return (
    <StyledSpan>
      { t('TOTAL_TIME_THIS_WEEK') }: <strong>{ totalFilteredTime }</strong> (<strong>{ totalTime }</strong>) / <strong>{ weekTargetHours }h</strong>
    </StyledSpan>
  )
};

export default TotalTime;

const StyledSpan = styled.span`
  margin-left: auto;
`;