import { ChangeEvent, FC, SetStateAction, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import { AddInFiltersState } from "../../../utils/setFiltersState.utils";
import { Search, SearchIconWrapper, StyledInputBase } from "./searchBar.styles";
import IFilter from "../../../types/processing/IFilter.model";
import Op from "../../../types/processing/Op";

type Props = {
  filters: IFilter[];
  setFilters: (value: SetStateAction<IFilter[]>) => void;
};

const SearchBar: FC<Props> = ({ filters, setFilters }) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);

    let input = event.currentTarget.value;

    const newTimer = setTimeout(() => {
      let searchFilter: IFilter = {
        prop: "name",
        operation: Op.Ct,
        value: input,
      };
      setFilters(AddInFiltersState(filters, searchFilter, true));
    }, 1 * 1000);

    setTimer(newTimer);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={handleChange}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default SearchBar;
