import { ReactElement } from 'react';

import { MINUTES_IN_HOUR } from '@consts/date.consts';
import { PRECISION_CONST } from '@consts/numbers.consts';
import { IndicatorBackground, IndicatorForeground } from './TimeIndicator.styled';

interface Props {
  value: number;
  dayTarget: number;
  dayLimit: number;
}

const TimeIndicator = ({ value, dayTarget, dayLimit }: Props): ReactElement => {
  const targetMinutes = MINUTES_IN_HOUR * dayTarget;
  const limitMinutes = MINUTES_IN_HOUR * dayLimit;
  const maxFraction = 1;
  const fractionValue = Math.min(maxFraction, value / targetMinutes).toPrecision(PRECISION_CONST);

  return (
    <IndicatorBackground>
      <IndicatorForeground
        exceeded={ value > limitMinutes }
        overtime={ value > targetMinutes }
        style={ { transform: `scaleX(${ fractionValue })` } }
      />
    </IndicatorBackground>
  )
};

export default TimeIndicator;