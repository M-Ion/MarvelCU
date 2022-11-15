import { Button, Grid, Rating, TextField } from "@mui/material";
import { useFormik } from "formik";

import DeleteIcon from "@mui/icons-material/Delete";
import reviewSchema from "../reviewForm/reviewForm.validation";
import reviewService from "../../../services/reviews.service";
import { FC } from "react";
import IGetReview from "../../../types/review/IGetReview.model";
import { LoadingButton } from "@mui/lab";

type Props = {
  review: IGetReview;
};
type Values = {
  opinion: string;
  rating: number;
};

const UpdateReviewForm: FC<Props> = ({
  review: { opinion, rating, id, movie },
}) => {
  const [updateReview] = reviewService.useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] =
    reviewService.useDeleteReviewMutation();

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
          value={+formik.values.rating as number}
        />
        <Grid item>
          <LoadingButton
            loading={isDeleting}
            onClick={async () =>
              await deleteReview({ reviewId: id, movieId: movie.id })
            }
            color="secondary"
            startIcon={<DeleteIcon />}
            variant="text"
          >
            Delete
          </LoadingButton>
          <Button type="submit" variant="text">
            Update
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UpdateReviewForm;
