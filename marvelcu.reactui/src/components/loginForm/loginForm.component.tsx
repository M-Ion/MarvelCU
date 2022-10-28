import { Alert, Button, Link, TextField } from "@mui/material";
import { Link as RouteLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import { Form } from "./loginForm.styles";
import { setCredentials } from "../../store/reducers/user.slice";
import authService from "../../services/auth.service";
import loginSchema from "./loginForm.validation";

type Values = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const [login, { error }] = authService.useLoginMutation();

  const handleSubmit = async (values: Values) => {
    await login(values)
      .unwrap()
      .then((data) => {
        dispatch(
          setCredentials({
            user: { id: data.userId },
            token: data.token,
          })
        );
      });
  };

  const formik = useFormik<Values>({
    initialValues: { email: "", password: "" },
    onSubmit: handleSubmit,
    validationSchema: loginSchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <TextField
        id="email"
        name="email"
        label="Email"
        margin="normal"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        onBlur={formik.handleBlur}
        fullWidth
      />
      <TextField
        id="password"
        name="password"
        label="Password"
        type="password"
        margin="normal"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        onBlur={formik.handleBlur}
        fullWidth
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
      <>
        {error && (
          <Alert severity="error" sx={{ mt: 3, width: "100%" }}>
            {(error as { status: number }).status === 400
              ? "Incorrect email or password"
              : "Something goes wrong, try again later"}
          </Alert>
        )}
      </>
    </Form>
  );
};

export default LoginForm;
