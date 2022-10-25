import { Container, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  return (
    <footer
      style={{
        backgroundColor: "#757575",
        padding: theme.spacing(3, 2),
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" color="white">
          Marvel Cinematic Universe by Mereuta Ion
        </Typography>
        <Typography color="white">Copyright &copy;</Typography>
      </Container>
    </footer>
  );
};

export default Footer;
