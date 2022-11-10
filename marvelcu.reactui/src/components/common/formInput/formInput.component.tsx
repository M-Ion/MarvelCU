import { FormikProps } from "formik";
import { TextField } from "@mui/material";
import * as React from "react";

type IFormInputProps = {
  formik: FormikProps<any>;
  label: string;
  prop: string;
};

const FormInput: React.FC<IFormInputProps & any> = ({
  formik,
  label,
  prop,
  ...otherProps
}) => {
  return (
    <TextField
      name={prop}
      label={label}
      value={formik.values[prop]}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      helperText={(formik.touched[prop] && formik.errors[prop]) as string}
      error={formik.touched[prop] && Boolean(formik.errors[prop])}
      {...otherProps}
    />
  );
};

export default FormInput;
