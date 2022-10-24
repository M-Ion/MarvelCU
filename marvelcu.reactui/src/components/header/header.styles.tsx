import { Box, Button, Icon, styled } from "@mui/material";

export const LogoIcon = styled(Icon)({
  display: "flex",
  fontSize: "75px",
  marginRight: "16px",

  img: {
    display: "flex",
    height: "inherit",
    width: "inherit",
  },
});

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    flexGrow: 1,
    display: "flex",
  },
}));

export const HeaderButton = styled(Button)({
  color: "white",
  display: "block",
  margin: "16px 0",
});
