import { Avatar, Box, Divider, Grid, Rating, Typography } from "@mui/material";
import { FC } from "react";

import IGetReview from "../../../types/review/IGetReview.model";

type Props = {
  review: IGetReview;
};

const Review: FC<Props> = ({ review: { opinion, rating } }) => {
  return (
    <Box>
      <Grid container alignItems="center" gap={2} m={2}>
        <Avatar>U</Avatar>
        <Box textAlign="start">
          <Typography>{opinion}</Typography>
          <Rating value={rating} readOnly />
        </Box>
      </Grid>
      <Divider />
    </Box>
  );
};

export default Review;
