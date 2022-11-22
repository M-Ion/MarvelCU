import { LoadingButton } from "@mui/lab";
import { FormikProps } from "formik";
import React, { FC } from "react";
import FormField from "../../commons/formField";

export interface NewsBaseFormValues {
  title: string;
  content: string;
}

interface NewsBaseFormProps {
  formik: FormikProps<NewsBaseFormValues>;
  loading: boolean;
}

const NewsBaseForm: FC<NewsBaseFormProps> = ({ formik, loading }) => {
  return (
    <form onSubmit={formik.handleSubmit} className="baseForm">
      <FormField
        formik={formik}
        label={"Title"}
        prop={"title"}
        fullWidth
        margin="normal"
      />
      <FormField
        formik={formik}
        label={"Content"}
        prop={"content"}
        fullWidth
        margin="normal"
        multiline
        rows={10}
      />
      <LoadingButton
        className="btnSubmit"
        type="submit"
        fullWidth
        loading={loading}
        variant="contained"
        color="secondary"
      >
        Submit
      </LoadingButton>
    </form>
  );
};

export default NewsBaseForm;
