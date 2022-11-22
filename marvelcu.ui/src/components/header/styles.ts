import { Box, styled, SxProps } from "@mui/material";

export const iconSx: SxProps = {
  display: "flex",
  fontSize: "75px",
  marginRight: "16px",

  img: {
    display: "flex",
    height: "inherit",
    width: "inherit",
  },
};

export const btnSx: SxProps = {
  color: "white",
  display: "block",
  margin: "16px 0",
};

export const userBoxSx: SxProps = {
  flexGrow: 0,
};

export const userIconBoxSx: SxProps = {
  p: 0,
};

export const userMenuSx: SxProps = {
  mt: "45px",
};

export const pagesSx: SxProps = {
  flexGrow: 1,
  display: { xs: "none", md: "flex" },
};

export const BoxStyled = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    flexGrow: 1,
    display: "flex",
  },
}));
