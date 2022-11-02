import { Button, Grid, Rating, TextField } from "@mui/material";
import { useFormik } from "formik";

import reviewSchema from "../reviewForm/reviewForm.validation";
import reviewService from "../../services/reviews.service";
import { FC } from "react";
import IGetReview from "../../types/review/IGetReview.model";

type Props = {
  review: IGetReview;
};
type Values = {
  opinion: string;
  rating: number;
};

const UpdateReviewForm: FC<Props> = ({ review: { opinion, rating, id } }) => {
  const [updateReview, { error }] = reviewService.useUpdateReviewMutation();

  const formik = useFormik<Values>({
    initialValues: {
      opinion,
      rating,
    },
    onSubmit: async (values: Values) => {
      await updateReview({ fields: values, id });
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
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.rating as number}
        />
        <Button type="submit" variant="text">
          Update
        </Button>
      </Grid>
    </form>
  );
};

export default UpdateReviewForm;
