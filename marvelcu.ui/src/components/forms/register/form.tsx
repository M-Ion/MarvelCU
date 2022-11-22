import { Grid, Link } from "@mui/material";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import authService from "../../../services/auth.service";
import { setSuccessFeedback } from "../../../services/store/slices/feedback.slice";
import FormField from "../../commons/formField";
import registerValidSchema from "./validation";
import { LoadingButton } from "@mui/lab";

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: RegisterFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = authService.useRegisterMutation();

  const handleSubmit = async (values: RegisterFormValues) => {
    await register(values).unwrap();

    dispatch(setSuccessFeedback("Sign up successfully"));

    setTimeout(() => navigate("/login"), 1000); // 1s
  };

  const formik = useFormik<RegisterFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: registerValidSchema,
  });

  return (
    <form className="baseForm" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormField
            formik={formik}
            label={"First Name"}
            prop={"firstName"}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            formik={formik}
            label={"Last Name"}
            prop={"lastName"}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <FormField
        formik={formik}
        label={"Email"}
        prop={"email"}
        fullWidth
        margin="normal"
      />

      <FormField
        formik={formik}
        label={"Password"}
        prop={"password"}
        type="password"
        fullWidth
        margin="normal"
      />

      <FormField
        formik={formik}
        label={"Confirm Password"}
        prop={"confirmPassword"}
        type="password"
        fullWidth
        margin="normal"
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
        to="/login"
        variant="body2"
        sx={{ alignSelf: "flex-start", color: "info.main" }}
      >
        Already have an account? Login
      </Link>
    </form>
  );
};

export default RegisterForm;
