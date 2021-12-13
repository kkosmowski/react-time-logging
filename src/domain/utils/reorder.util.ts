import { ONE, ZERO } from '@consts/numbers.consts';

export const reorder = <T>(array: T[], startIndex: number, endIndex: number): T[] => {
  const modifier = startIndex < endIndex ? -ONE : ZERO;
  const itemsToRemove = 1;
  const result = [...array];
  const [removed] = result.splice(startIndex, itemsToRemove);

  result.splice(endIndex + modifier, ZERO, removed);

  return result;
}
