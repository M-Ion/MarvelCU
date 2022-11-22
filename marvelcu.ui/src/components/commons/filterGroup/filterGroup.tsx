import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, ReactNode } from "react";
import { boxSx } from "./styles";

interface FilterGroupProps {
  children: ReactNode[] | ReactNode;
  title: string;
}

const FilterGroup: FC<FilterGroupProps> = ({ children, title }) => {
  return (
    <Box sx={boxSx}>
      <Typography>{title}</Typography>
      <Divider />
      {children}
    </Box>
  );
};

export default FilterGroup;
