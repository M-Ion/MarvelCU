import React, { FC } from "react";
import { FormikProps } from "formik";
import { BaseTextFieldProps, TextField } from "@mui/material";

interface FormFieldProps extends BaseTextFieldProps {
  formik: FormikProps<any>;
  fullWidth: boolean;
  label: string;
  prop: string;
}

const FormField: FC<FormFieldProps> = ({
  formik,
  label,
  prop,
  fullWidth,
  ...others
}) => {
  const error = formik.touched[prop] && Boolean(formik.errors[prop]);
  const helperText = (formik.touched[prop] && formik.errors[prop]) as string;
  const value = formik.values[prop];

  return (
    <TextField
      name={prop}
      label={label}
      value={value}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      helperText={helperText}
      error={error}
      fullWidth={fullWidth}
      {...others}
    />
  );
};

export default FormField;
