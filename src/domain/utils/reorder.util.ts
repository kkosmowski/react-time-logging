export const reorder = <T>(array: T[], startIndex: number, endIndex: number): T[] => {
  const modifier = startIndex < endIndex ? -1 : 0;
  const itemsToRemove = 1;
  const result = [...array];
  const [removed] = result.splice(startIndex, itemsToRemove);

  result.splice(endIndex + modifier, 0, removed);

  return result;
}
