import { Container, Typography } from "@mui/material";

import LoginForm from "../../components/loginForm/loginForm.component";

const LoginPage = () => {
  return (
    <Container sx={{ mt: 8 }} maxWidth="xs">
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
