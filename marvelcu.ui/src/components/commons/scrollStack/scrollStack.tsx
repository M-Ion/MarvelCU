import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { boxSx, paperSx, titleSx } from "./styles";

interface ScrollStackProp {
  children: ReactNode | ReactNode[];
  direction: "row" | "column";
  title: string;
}

const ScrollStack: FC<ScrollStackProp> = ({ children, direction, title }) => {
  return (
    <Box sx={boxSx}>
      <Typography sx={titleSx} variant="h4">
        {title}
      </Typography>
      <Paper sx={paperSx}>
        <Stack direction={direction} spacing={3}>
          {children}
        </Stack>
      </Paper>
    </Box>
  );
};

export default ScrollStack;
