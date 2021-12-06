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
