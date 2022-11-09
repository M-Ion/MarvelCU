export function findElement<T>(
  elements: T[] | readonly T[],
  element: T
): boolean {
  return Boolean(elements.find((el) => el === element));
}
