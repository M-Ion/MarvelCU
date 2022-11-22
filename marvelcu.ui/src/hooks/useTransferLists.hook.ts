import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useEffect, useState } from "react";
import { not } from "../utils/array.utils";

export default function useTransferList<T>(
  fetch: UseQuery<QueryDefinition<any, any, any, any>>,
  choosen: T[] | readonly T[] = [],
  ...args: any
): TranferListType<T> {
  const data = fetch(args).data as T[] | undefined;

  const [checked, setChecked] = useState<readonly T[]>([]);
  const [left, setLeft] = useState<readonly T[]>(data ?? []);
  const [right, setRight] = useState<readonly T[]>(choosen);

  useEffect(() => {
    if (data) {
      setLeft(not(data, choosen));
    }
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
