import { Alert, Button, Grid, Link, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Link as RouteLink } from "react-router-dom";

import { Form } from "./signUpForm.styles";
import signUpSchema from "./signUpForm.validation";
import authService from "../../services/auth.service";

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const [register, { error }] = authService.useRegisterMutation();

  const formik = useFormik<Values>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values: Values) => {
      await register(values);
    },
    validationSchema: signUpSchema,
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            margin="normal"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            onBlur={formik.handleBlur}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            margin="normal"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            onBlur={formik.handleBlur}
            fullWidth
          />
        </Grid>
      </Grid>
      <TextField
        id="email-signup"
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
        id="password-signup"
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
      <TextField
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        margin="normal"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
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
        to="/login"
        variant="body2"
        sx={{ alignSelf: "flex-start", color: "info.main" }}
      >
        Already have an account? Login
      </Link>
      <>
        {error && (
          <Alert severity="error" sx={{ mt: 3, width: "100%" }}>
            Something goes wrong
          </Alert>
        )}
      </>
    </Form>
  );
};

export default SignUpForm;
