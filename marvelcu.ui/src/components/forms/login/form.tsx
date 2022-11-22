import { LoadingButton } from "@mui/lab";
import { Link } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import authService from "../../../services/auth.service";
import { setCredentials } from "../../../services/store/slices/user.slice";
import FormField from "../../commons/formField";
import loginValidSchema from "./validation";

export interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = authService.useLoginMutation();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const respone = await login(values).unwrap();

      const credentials = { user: respone.user, jwt: respone.token };
      dispatch(setCredentials(credentials));

      navigate("/movies");
    } catch (e) {
      console.error(e);
    }
  };

  const formik = useFormik<LoginFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: loginValidSchema,
  });

  return (
    <form className="baseForm" onSubmit={formik.handleSubmit}>
      <FormField
        formik={formik}
        label={"Email"}
        prop={"email"}
        fullWidth
        margin="normal"
      />

      <FormField
        formik={formik}
        fullWidth
        label={"Password"}
        margin="normal"
        prop={"password"}
        type="password"
      />

      <LoadingButton
        loading={isLoading}
        type="submit"
        variant="contained"
        color="secondary"
        sx={{ my: 3 }}
        fullWidth
      >
        Submit
      </LoadingButton>
      <Link
        component={RouteLink}
        to="/register"
        variant="body2"
        sx={{ alignSelf: "flex-start", color: "info.main" }}
      >
        Don't have an account? Sign Up
      </Link>
    </form>
  );
};

export default LoginForm;
