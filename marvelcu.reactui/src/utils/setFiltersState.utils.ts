import IFilter from "../types/processing/IFilter.model";

export const AddInFiltersState = (
  filters: IFilter[],
  filter: IFilter,
  replace: boolean = false
) => {
  let copyFilters = [...filters];

  if (replace) {
    const index = filters.findIndex((el) => el.prop === filter.prop);

    if (index > -1) {
      copyFilters.splice(index, 1);
    }
  }

  return [...copyFilters, filter];
};

export const RemoveFromFiltersState = (filters: IFilter[], filter: IFilter) => {
  let copyFilters = [...filters];

  const index = filters.findIndex((el) => el.prop === filter.prop);

  if (index > -1) {
    copyFilters.splice(index, 1);
  }

  return copyFilters;
};
