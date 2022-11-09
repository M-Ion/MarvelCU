import { Button, Link } from "@mui/material";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import { Form } from "./loginForm.styles";
import { setCredentials } from "../../store/reducers/user.slice";
import authService from "../../services/auth.service";
import loginSchema from "./loginForm.validation";
import FormInput from "../formInput/formInput.component";

type Values = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = authService.useLoginMutation();

  const handleSubmit = async (values: Values) => {
    await login(values)
      .unwrap()
      .then((data) => {
        dispatch(
          setCredentials({
            user: data.user,
            token: data.token,
          })
        );

        navigate("/movies");
      });
  };

  const formik = useFormik<Values>({
    initialValues: { email: "", password: "" },
    onSubmit: handleSubmit,
    validationSchema: loginSchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        formik={formik}
        label={"Email"}
        prop={"email"}
        fullWidth
        margin="normal"
      />

      <FormInput
        formik={formik}
        fullWidth
        label={"Password"}
        margin="normal"
        prop={"password"}
        type="password"
      />

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        sx={{ my: 3 }}
        fullWidth
      >
        Submit
      </Button>
      <Link
        component={RouteLink}
        to="/signup"
        variant="body2"
        sx={{ alignSelf: "flex-start", color: "info.main" }}
      >
        Don't have an account? Sign Up
      </Link>
    </Form>
  );
};

export default LoginForm;
