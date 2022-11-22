import { LoadingButton } from "@mui/lab";
import { FormikProps } from "formik";
import React, { FC, ReactNode } from "react";
import FormField from "../../commons/formField";

export interface HeroBaseFormValues {
  description: string;
  name: string;
}

interface HeroBaseFormProps {
  children?: ReactNode | ReactNode[];
  formik: FormikProps<HeroBaseFormValues>;
  loading: boolean;
}

const HeroBaseForm: FC<HeroBaseFormProps> = ({ children, formik, loading }) => {
  return (
    <form onSubmit={formik.handleSubmit} className="baseForm">
      <FormField
        formik={formik}
        label={"Name"}
        prop={"name"}
        fullWidth
        margin="normal"
      />

      <FormField
        formik={formik}
        label={"Description"}
        prop={"description"}
        fullWidth
        margin="normal"
        multiline
        rows={5}
      />

      {children}

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

export default HeroBaseForm;
