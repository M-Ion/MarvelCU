import { styled, Paper, Typography } from "@mui/material";

export const StyledPaper = styled(Paper)({
  marginTop: 15,
  maxHeight: 200,
  overflow: "auto",
  padding: 25,
});

export const Title = styled(Typography)({
  textAlign: "start",
  textTransform: "capitalize",
});
