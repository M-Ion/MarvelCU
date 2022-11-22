import { Avatar, Box, Divider, Grid, Rating, Typography } from "@mui/material";
import { FC } from "react";
import { Review as ReviewType } from "../../types/entites/review.types";

interface ReviewProps {
  review: ReviewType;
}

const Review: FC<ReviewProps> = ({ review: { opinion, rating, user } }) => {
  return (
    <Box>
      <Grid container alignItems="center" gap={2} m={2}>
        <Avatar>{user.firstName[0]}</Avatar>
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
