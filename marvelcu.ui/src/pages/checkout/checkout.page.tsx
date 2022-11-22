import { Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../../components/forms/checkout/form";
import { BoxStyled, PaperStyled } from "../common.styles";

interface StateLocation {
  amount: number;
  productId: number;
  productName: string;
}

const CheckoutPage = () => {
  const { state } = useLocation();

  const amount = state && (state as StateLocation).amount;
  const productName = state && (state as StateLocation).productName;
  const productId = state && (state as StateLocation).productId;

  return (
    <BoxStyled component="main">
      <PaperStyled>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Typography variant="h6" gutterBottom textAlign={"start"}>
          Order summary : {productName}, Amount: {amount}
        </Typography>
        <CheckoutForm movieId={productId} amount={amount} />
      </PaperStyled>
    </BoxStyled>
  );
};

export default CheckoutPage;
