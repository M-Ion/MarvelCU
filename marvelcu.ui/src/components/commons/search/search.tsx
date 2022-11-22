import React, { ChangeEvent, FC, SetStateAction, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Op } from "../../../types/enums/operations.enum";
import { ReqFilter } from "../../../types/request.types";
import { replace } from "../../../utils/array.utils";
import { IconWrapper, InputBaseStyled, SearchDivStyled } from "./styles";

interface SearchProps {
  filtersState: [ReqFilter[], (value: SetStateAction<ReqFilter[]>) => void];
  operation: Op;
  prop: string;
}

const Search: FC<SearchProps> = ({ filtersState, operation, prop }) => {
  const [filters, setFilters] = filtersState;
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  const searchFilter: ReqFilter = { prop, operation, value: "" };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);

    let { value } = event.currentTarget;

    const newTimer = setTimeout(() => {
      const newSearchFilter: ReqFilter = { ...searchFilter, value };
      const newFilters = replace(filters, searchFilter, newSearchFilter);

      setFilters(newFilters);
    }, 1000); // 1s

    setTimer(newTimer);
  };

  return (
    <SearchDivStyled className="fullWidth">
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>
      <InputBaseStyled onChange={handleChange} placeholder="Search…" />
    </SearchDivStyled>
  );
};

export default Search;
