import { Button } from "@mui/material";
import { useFormik } from "formik";
import React, { FC } from "react";
import reviewService from "../../../services/entities/review.service";
import ReviewBaseForm, { ReviewBaseFormValues } from "./form";
import reviewValidSchema from "./validation";

const initialValues: ReviewBaseFormValues = {
  opinion: "",
  rating: 1,
};

interface AddReviewFormProps {
  movieId: number;
}

const AddReviewForm: FC<AddReviewFormProps> = ({ movieId }) => {
  const [createReview] = reviewService.useCreateEntityMutation();

  const handleSubmit = async (values: ReviewBaseFormValues) => {
    await createReview({ movieId, arg: values });
  };

  const formik = useFormik<ReviewBaseFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: reviewValidSchema,
  });

  return (
    <ReviewBaseForm formik={formik} movieId={movieId}>
      <Button type="submit" variant="text">
        Comment
      </Button>
    </ReviewBaseForm>
  );
};

export default AddReviewForm;
