import { Alert, Button, Grid, Link } from "@mui/material";
import { useFormik } from "formik";
import { Link as RouteLink, useNavigate } from "react-router-dom";

import { Form } from "./signUpForm.styles";
import authService from "../../services/auth.service";
import FormInput from "../common/formInput/formInput.component";
import signUpSchema from "./signUpForm.validation";
import { useDispatch } from "react-redux";
import { setAlert } from "../../store/reducers/alerts.slice";

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { error, isSuccess }] = authService.useRegisterMutation();

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

      if (isSuccess) {
        dispatch(
          setAlert({
            type: "success",
            message: "Account created successfully",
          })
        );

        setTimeout(() => navigate("/login"), 2000);
      }
    },

    validationSchema: signUpSchema,
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormInput
            formik={formik}
            label={"First Name"}
            prop={"firstName"}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            formik={formik}
            label={"Last Name"}
            prop={"lastName"}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <FormInput
        formik={formik}
        label={"Email"}
        prop={"email"}
        fullWidth
        margin="normal"
      />

      <FormInput
        formik={formik}
        label={"Password"}
        prop={"password"}
        type="password"
        fullWidth
        margin="normal"
      />

      <FormInput
        formik={formik}
        label={"Confirm Password"}
        prop={"confirmPassword"}
        type="password"
        fullWidth
        margin="normal"
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
