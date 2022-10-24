import styled from "@emotion/styled";
import { Card, CardContent } from "@mui/material";

export const MovieCardStyled = styled(Card)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

export const CardContentStyled = styled(CardContent)({
  flexGrow: 1,
  textAlign: "start",
});
