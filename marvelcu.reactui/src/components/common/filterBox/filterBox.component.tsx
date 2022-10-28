import { Divider, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

import { FilterBoxStyled } from "./filterBox.styles";

type Props = {
  title: string;
  children: ReactNode[] | ReactNode;
};

const FilterBox: FC<Props> = ({ children, title }) => {
  return (
    <FilterBoxStyled>
      <Typography>{title}</Typography>
      <Divider />
      {children}
    </FilterBoxStyled>
  );
};

export default FilterBox;
