import { Grid, Rating } from "@mui/material";
import { FormikProps } from "formik";
import React, { FC, ReactNode } from "react";
import FormField from "../../commons/formField";

export interface ReviewBaseFormValues {
  opinion: string;
  rating: number;
}

export interface ReviewBaseFormProps {
  children?: ReactNode | ReactNode[];
  formik: FormikProps<ReviewBaseFormValues>;
  movieId: number;
}

const ReviewBaseForm: FC<ReviewBaseFormProps> = ({
  children,
  formik,
  movieId,
}) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField
        formik={formik}
        label="Opinion"
        prop="opinion"
        variant="standard"
        fullWidth={true}
      />

      <Grid container alignItems="center" justifyContent="space-between">
        <Rating
          defaultValue={0}
          name="rating"
          onChange={formik.handleChange}
          value={+formik.values.rating}
        />

        {children}
      </Grid>
    </form>
  );
};

export default ReviewBaseForm;
