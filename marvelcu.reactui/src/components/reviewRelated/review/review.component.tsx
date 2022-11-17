import { Avatar, Box, Divider, Grid, Rating, Typography } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/reducers/user.slice";

import IGetReview from "../../../types/review/IGetReview.model";

type Props = {
  review: IGetReview;
};

const Review: FC<Props> = ({ review: { opinion, rating, user } }) => {
  const currentUser = useSelector(selectCurrentUser);
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
