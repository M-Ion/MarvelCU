import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material";

export const StyledButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginLeft: "auto",
}));
