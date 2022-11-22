import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { FC } from "react";
import { btnSx } from "./styles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: FC<TabPanelProps> = ({ children, index, value }) => {
  return (
    <Container maxWidth="md" role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={btnSx}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default TabPanel;
