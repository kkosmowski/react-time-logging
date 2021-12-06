import { ReactElement } from 'react';

import { MINUTES_IN_HOUR } from '@consts/date.consts';
import { PRECISION_CONST } from '@consts/numbers.consts';
import { IndicatorBackground, IndicatorForeground } from './TimeIndicator.styled';

interface Props {
  value: number;
}

const TimeIndicator = ({ value }: Props): ReactElement => {
  const targetHours = 8;
  const targetMinutes = MINUTES_IN_HOUR * targetHours;
  const maxFraction = 1;
  const fractionValue = Math.min(maxFraction, value / targetMinutes).toPrecision(PRECISION_CONST);

  return (
    <IndicatorBackground>
      <IndicatorForeground style={ { transform: `scaleX(${ fractionValue })` } } />
    </IndicatorBackground>
  )
};

export default TimeIndicator;