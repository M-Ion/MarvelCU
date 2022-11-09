import { Button, Grid, Rating, TextField } from "@mui/material";
import { useFormik } from "formik";

import reviewSchema from "./reviewForm.validation";
import reviewService from "../../services/reviews.service";
import { FC } from "react";

type Values = {
  opinion: string;
  rating: number;
};

const ReviewForm: FC<{ movieId: number }> = ({ movieId }) => {
  const [postReview] = reviewService.usePostReviewMutation();

  const formik = useFormik<Values>({
    initialValues: {
      opinion: "",
      rating: 1,
    },
    onSubmit: async (values: Values) => {
      await postReview({ fields: values, movieId });
    },
    validationSchema: reviewSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        error={formik.touched.opinion && Boolean(formik.errors.opinion)}
        helperText={formik.touched.opinion && formik.errors.opinion}
        label="Opinion"
        name="opinion"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        sx={{ width: "100%" }}
        value={formik.values.opinion}
        variant="standard"
      />
      <Grid container alignItems="center" justifyContent="space-between">
        <Rating
          defaultValue={0}
          name="rating"
          onChange={formik.handleChange}
          value={+formik.values.rating}
        />
        <Button type="submit" variant="text">
          Comment
        </Button>
      </Grid>
    </form>
  );
};

export default ReviewForm;
