import { Checkbox, FormControlLabel } from "@mui/material";
import { findIndex, spliceArray } from "../../../utils/array.utils";
import React, {
  ChangeEvent,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ReqFilter } from "../../../types/request.types";
import { formControllerSx } from "./styles";

interface FilterProps {
  appliedFilter: ReqFilter;
  filtersState: [ReqFilter[], (value: SetStateAction<ReqFilter[]>) => void];
  label: string;
}

const Filter: FC<FilterProps> = ({ appliedFilter, label, filtersState }) => {
  const [filters, setFilters] = filtersState;
  const [check, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const found = findIndex(filters, appliedFilter) > -1;

    if (found) setChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!check) setFilters([...filters, appliedFilter]);
    else {
      const newFilters = spliceArray(filters, appliedFilter);
      setFilters(newFilters);
    }

    setChecked(!check);
  };

  return (
    <FormControlLabel
      sx={formControllerSx}
      label={label}
      control={<Checkbox checked={check} onChange={handleChange} />}
    />
  );
};

export default Filter;
