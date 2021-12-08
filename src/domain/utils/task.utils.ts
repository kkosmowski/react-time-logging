import { MINUTES_IN_HOUR } from '@consts/date.consts';

export const calculateDurationFromString = (string: string): number => {
  //@todo for now I assume it is either "%h" or "%m", "%h%m" or "%h %m", % = any number
  const initialValue = 0;
  return string
    .split('h')
    .reduce((prev, curr) => curr && curr.includes('m')
      ? (prev + parseInt(curr))
      : (prev + (MINUTES_IN_HOUR * +curr))
      , initialValue);
};

export const minutesToHoursAndMinutes = (minutes: number): string => {
  if (!minutes) {
    return '0h';
  }

  const minutesLeft = minutes % MINUTES_IN_HOUR;

  if (minutes < MINUTES_IN_HOUR) {
    return `${ minutesLeft }m`;
  }

  const hours = Math.floor(minutes / MINUTES_IN_HOUR);
  const hoursString = hours ? `${ hours }h` : '';
  const minutesString = minutesLeft ? `${ minutesLeft }m` : '';

  return `${ hoursString } ${ minutesString }`;
};