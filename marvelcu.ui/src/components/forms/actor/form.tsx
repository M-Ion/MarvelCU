import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { FormikProps } from "formik";
import React, { FC, ReactNode } from "react";
import FormField from "../../commons/formField";

export interface ActorBaseFormValues {
  firstName: string;
  imdbId: string | null;
  lastName: string;
  middleName: string;
}

interface ActorBaseFormProps {
  children?: ReactNode | ReactNode[];
  disabled: boolean;
  formik: FormikProps<ActorBaseFormValues>;
}

const ActorBaseForm: FC<ActorBaseFormProps> = ({
  disabled,
  formik,
  children,
}) => {
  return (
    <form onSubmit={formik.handleSubmit} className="baseForm">
      <FormField
        formik={formik}
        label={"First name"}
        prop={"firstName"}
        fullWidth={true}
        margin="normal"
        disabled={disabled}
      />
      <FormField
        formik={formik}
        label={"Middle name"}
        prop={"middleName"}
        fullWidth={true}
        margin="normal"
        disabled={disabled}
      />
      <FormField
        formik={formik}
        label={"Last name"}
        prop={"lastName"}
        fullWidth={true}
        margin="normal"
        disabled={disabled}
      />

      {children}

      <LoadingButton
        className="btnSubmit"
        type="submit"
        fullWidth
        loading={false}
        variant="contained"
        color="secondary"
      >
        Submit
      </LoadingButton>
    </form>
  );
};

export default ActorBaseForm;
