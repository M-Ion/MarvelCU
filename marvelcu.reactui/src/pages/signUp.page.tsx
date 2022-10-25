import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import SignUpForm from "../components/signUpForm/signUpForm.component";

const SignUpPage = () => {
  return (
    <Container sx={{ mt: 8 }} maxWidth="xs">
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <SignUpForm />
    </Container>
  );
};

export default SignUpPage;
