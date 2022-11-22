import _ from "lodash";

export const not = <T>(a: T[] | readonly T[], b: T[] | readonly T[]) => {
  return a.filter((item) => !Boolean(b.find((el) => _.isEqual(el, item))));
};

export const intersection = <T>(
  a: T[] | readonly T[],
  b: T[] | readonly T[]
) => {
  return a.filter((item) => Boolean(b.find((el) => _.isEqual(el, item))));
};

export const findIndex = <T>(a: T[] | readonly T[], b: T) =>
  a.findIndex((item) => _.isEqual(item, b));

export const spliceArray = <T>(a: T[] | readonly T[], b: T) => {
  const index = findIndex(a, b);
  let copy = [...a];

  if (index > -1) {
    copy.splice(index, 1);
  }

  return copy;
};

export const replace = <T>(a: T[] | readonly T[], b: T, c: T) => {
  const newItems = spliceArray(a, b);
  return [...newItems, c];
};

export const remove = <T>(a: T[] | readonly T[], b: T) => {
  return a.filter((item) => !_.isEqual(item, b));
};
