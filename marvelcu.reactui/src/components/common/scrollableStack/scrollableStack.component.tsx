import { FC, ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { StyledPaper, Title } from "./scrollableStack.styles";

type Props = {
  direction: "row" | "column";
  title: string;
  children: ReactNode | ReactNode[];
};

const ScrollableStack: FC<Props> = ({ direction, children, title }) => {
  return (
    <Box sx={{ marginTop: 5 }}>
      <Title variant="h4">{title}</Title>
      <StyledPaper>
        <Stack direction={direction} spacing={3}>
          {children}
        </Stack>
      </StyledPaper>
    </Box>
  );
};

export default ScrollableStack;
