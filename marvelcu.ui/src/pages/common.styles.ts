import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  styled,
  SxProps,
} from "@mui/material";

export const CardStyled = styled(Card)({
  display: "flex",
  gap: 5,
  height: 320,
});

export const CardContentStyled = styled(CardContent)({
  flex: "1 0 auto",
  textAlign: "start",

  "& > div, span": {
    marginTop: 3,
  },
});

export const PageContainerStyled = styled(Container)(({ theme }) => ({
  padding: theme.spacing(8, 0, 6),
}));

export const PaperStyled = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  [theme.breakpoints.up(600)]: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    padding: theme.spacing(3),
  },
}));

export const BoxStyled = styled(Box)(({ theme }) => ({
  width: "auto",
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  [theme.breakpoints.up(600)]: {
    width: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export const gridSx: SxProps = {
  gap: 5,
};

export const paginationSx: SxProps = {
  marginBottom: 2,
};

export const authContainerSx: SxProps = {
  mt: 8,
};

export const entityContainerSx: SxProps = {
  marginTop: 4,
};

export const btnRightSx: SxProps = {
  alignSelf: "flex-end",
};

export const headerCardSx: SxProps = {
  width: 400,
};

export const btnDeleteSx: SxProps = {
  marginY: 8,
  marginLeft: "auto",
};
