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
  // const [t, setT] = React.useState<ReturnType<typeof setTimeout> | null>(null);

  return (
    <TextField
      name={prop}
      label={label}
      // defaultValue={formik.values[prop]}
      value={formik.values[prop]}
      onBlur={formik.handleBlur}
      // onChange={(ev) => {
      //   if (t) clearTimeout(t);
      //   setT(
      //     setTimeout(() => {
      //       formik.setFieldValue(prop, ev.target.value);
      //     }, 1500)
      //   );
      // }}
      onChange={formik.handleChange}
      helperText={(formik.touched[prop] && formik.errors[prop]) as string}
      error={formik.touched[prop] && Boolean(formik.errors[prop])}
      {...otherProps}
    />
  );
};

export default FormInput;
