import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import RegisterForm from "../../components/forms/register";
import { authContainerSx } from "../common.styles";

const RegisterPage = () => {
  return (
    <Container sx={authContainerSx} maxWidth="xs">
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
