import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useEffect, useState } from "react";
import _ from "lodash";

export function not<T>(a: T[], b: T[]) {
  return a.filter((item) => !Boolean(b.find((el) => _.isEqual(el, item))));
}

export default function useTransferList<T>(
  fetch: UseQuery<QueryDefinition<any, any, any, any>>,
  choosen: T[] = [],
  ...args: any
) {
  const data = fetch(undefined).data as T[] | undefined;

  const [checked, setChecked] = useState<readonly T[]>([]);
  const [left, setLeft] = useState<readonly T[]>(data ?? []);
  const [right, setRight] = useState<readonly T[]>(choosen);

  useEffect(() => {
    if (data) {
      setLeft(not(data, choosen));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    data,
    checkedState: [checked, setChecked],
    leftState: [left, setLeft],
    rightState: [right, setRight],
  };
}

export type TranferListType<T> = {
  data: T[] | undefined;
  checkedState: [
    readonly T[],
    React.Dispatch<React.SetStateAction<readonly T[]>>
  ];
  leftState: [readonly T[], React.Dispatch<React.SetStateAction<readonly T[]>>];
  rightState: [
    readonly T[],
    React.Dispatch<React.SetStateAction<readonly T[]>>
  ];
};
