import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { FC, SetStateAction, useEffect } from "react";
import { SortingDirection } from "../../../types/enums/sortings.enum";
import { ReqSorting } from "../../../types/request.types";
import { formControllerSx } from "./styles";

interface SortSelectorProps {
  sortingProps: string[];
  sortingState: [ReqSorting, (value: SetStateAction<ReqSorting>) => void];
}

const SortSelector: FC<SortSelectorProps> = ({
  sortingProps,
  sortingState,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sorting, setSorting] = sortingState;

  const defaultSorting: ReqSorting = {
    sort: sortingProps[0],
    direction: SortingDirection.Asc,
  };

  useEffect(() => {
    setSorting(defaultSorting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;

    let newSorting: ReqSorting = {
      sort: value,
      direction: SortingDirection.Asc,
    };

    setSorting(newSorting);
  };

  return (
    <FormControl variant="filled" sx={formControllerSx}>
      <InputLabel>Sort</InputLabel>
      {
        <Select
          label="Sort"
          value={(sorting.sort ?? defaultSorting.sort) as string}
          onChange={handleChange}
        >
          {/* For disable MUI warning */}
          <MenuItem value="name" sx={{ display: "none" }} />

          {sortingProps.map((prop, index) => (
            <MenuItem key={index} value={prop}>
              {prop}
            </MenuItem>
          ))}
        </Select>
      }
    </FormControl>
  );
};

export default SortSelector;
