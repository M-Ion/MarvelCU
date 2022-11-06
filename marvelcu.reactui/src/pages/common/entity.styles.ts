import { Card, CardContent, styled } from "@mui/material";

export const StyledCard = styled(Card)({
  display: "flex",
  gap: 5,
  height: 320,
});

export const StyledCardContent = styled(CardContent)({
  flex: "1 0 auto",
  textAlign: "start",

  "& > div, span": {
    marginTop: 3,
  },
});
