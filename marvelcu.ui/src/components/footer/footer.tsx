import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { FooterStyled } from "./styles";

const Footer = () => {
  return (
    <FooterStyled>
      <Container maxWidth="sm">
        <Typography variant="body1" color="white">
          Marvel Cinematic Universe by Mereuta Ion
        </Typography>
        <Typography color="white">Copyright &copy;</Typography>
      </Container>
    </FooterStyled>
  );
};

export default Footer;
