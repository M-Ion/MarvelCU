import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { FC, SetStateAction, useEffect } from "react";
import ISortingRequest from "../../../types/processing/ISortingRequest.model";
import SortDirection from "../../../types/processing/SortDirection.model";

type Props = {
  setSort: (value: SetStateAction<ISortingRequest>) => void;
  sort: ISortingRequest;
  sortFields: string[];
};

const SortSelector: FC<Props> = ({ setSort, sort, sortFields }) => {
  useEffect(() => {
    let sortReq: ISortingRequest = {
      sort: sortFields[0] as string,
      direction: SortDirection.Asc,
    };

    setSort(sortReq);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    let sortReq: ISortingRequest = {
      sort: event.target.value as string,
      direction: SortDirection.Asc,
    };
    setSort(sortReq);
  };

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">Sort</InputLabel>
      {sortFields && (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Sort"
          value={sort.sort ?? "name"}
          onChange={handleChange}
          defaultValue=""
        >
          {/* For disable MUI warning */}
          <MenuItem value="name" sx={{ display: "none" }} />
          {sortFields.map((field, i) => (
            <MenuItem key={i} value={field}>
              {field}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default SortSelector;
