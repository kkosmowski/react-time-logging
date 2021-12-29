import { MINUTES_IN_HOUR } from '@consts/date.consts';

export const calculateDurationFromString = (string: string): number => {
  const types = string.split('').filter(char => ['h', 'm'].includes(char)) as ('h' | 'm')[];
  const numbers = string.split(/[m|h]/);
  let totalMinutes = 0;

  for (let i = 0; i < numbers.length -1; i++) {
    if (!numbers[i]) {
      continue;
    }

    let value = parseFloat(numbers[i].replace(',', '.'));

    if (types[i] === 'h') {
      value *= MINUTES_IN_HOUR;
    }

    totalMinutes += value;
  }

  return Math.round(totalMinutes);
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

  return minutesLeft ? `${ hoursString } ${ minutesLeft }m` : hoursString;
};

export const improveDurationString = (string: string): string =>
  minutesToHoursAndMinutes(calculateDurationFromString(string));
