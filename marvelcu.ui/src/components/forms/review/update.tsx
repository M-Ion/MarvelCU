import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import React, { FC } from "react";
import reviewService from "../../../services/entities/review.service";
import { Review } from "../../../types/entites/review.types";
import ReviewBaseForm, { ReviewBaseFormValues } from "./form";
import reviewValidSchema from "./validation";

interface UpdateReviewFormProps {
  entity: Review;
}

const UpdateReviewForm: FC<UpdateReviewFormProps> = ({ entity }) => {
  const [updateReview] = reviewService.useUpdateReviewMutation();
  const [deleteReview] = reviewService.useDeleteReviewMutation();

  const handleSubmit = async (values: ReviewBaseFormValues) => {
    await updateReview({ id: entity.id, arg: values });
  };

  const handleDelete = async () => {
    await deleteReview({ id: entity.id, movieId: entity.movie.id });
  };

  const initialValues: ReviewBaseFormValues = {
    opinion: entity.opinion,
    rating: entity.rating,
  };

  const formik = useFormik<ReviewBaseFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: reviewValidSchema,
  });

  return (
    <ReviewBaseForm formik={formik} movieId={entity.movie.id}>
      <Button
        onClick={handleDelete}
        color="secondary"
        startIcon={<DeleteIcon />}
        variant="text"
      >
        Delete
      </Button>
      <Button type="submit" variant="text">
        Update
      </Button>
    </ReviewBaseForm>
  );
};

export default UpdateReviewForm;
