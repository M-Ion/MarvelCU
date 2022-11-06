import { Box, Paper, styled } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  [theme.breakpoints.up(600)]: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    padding: theme.spacing(3),
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  width: "auto",
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  [theme.breakpoints.up(600)]: {
    width: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));
