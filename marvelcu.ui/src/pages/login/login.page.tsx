import { Container, Typography } from "@mui/material";

import LoginForm from "../../components/forms/login";
import { authContainerSx } from "../common.styles";

const LoginPage = () => {
  return (
    <Container sx={authContainerSx} maxWidth="xs">
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
