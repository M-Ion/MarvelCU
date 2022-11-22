import { Rating } from "@mui/material";
import React, { FC, SetStateAction, SyntheticEvent, useState } from "react";
import { Op } from "../../../types/enums/operations.enum";
import { ReqFilter } from "../../../types/request.types";
import { remove, replace } from "../../../utils/array.utils";
import FilterGroup from "../filterGroup";

interface RatingFilterProps {
  filtersState: [ReqFilter[], (value: SetStateAction<ReqFilter[]>) => void];
}

const RatingFilter: FC<RatingFilterProps> = ({ filtersState }) => {
  const [filters, setFilters] = filtersState;
  const [rating, setRating] = useState<ReqFilter | null>(null);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    let newFilter: ReqFilter = {
      prop: "rating",
      operation: Op.Eq,
      value: value as number,
    };

    if (value === null) {
      setFilters(remove(filters, rating as ReqFilter));
      setRating(null);

      return;
    }
    let newFilters: ReqFilter[] = [];

    if (!rating) {
      newFilters = [...filters, newFilter];
    } else {
      newFilters = replace(filters, rating, newFilter);
    }

    setFilters(newFilters);
    setRating(newFilter);
  };

  return (
    <FilterGroup title={"Rating"}>
      <Rating onChange={handleChange} value={rating?.value ?? 0} />
    </FilterGroup>
  );
};

export default RatingFilter;
