import { Typography } from "@mui/material";
import * as React from "react";
import { useLocation } from "react-router-dom";

import CheckoutForm from "../../components/checkoutForm/checkoutForm.component";
import { StyledBox, StyledPaper } from "./checkout.styles";

interface ICheckoutPageProps {}

interface StateLocation {
  productId: number;
  productName: string;
  amount: number;
}

const CheckoutPage: React.FunctionComponent<ICheckoutPageProps> = (props) => {
  const { state } = useLocation();

  const amount = state && (state as StateLocation).amount;
  const productName = state && (state as StateLocation).productName;
  const productId = state && (state as StateLocation).productId;

  return (
    <StyledBox component="main">
      <StyledPaper>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Typography variant="h6" gutterBottom textAlign={"start"}>
          Order summary : {productName}, Amount: {amount}
        </Typography>
        <CheckoutForm movieId={productId} amount={amount} />
      </StyledPaper>
    </StyledBox>
  );
};

export default CheckoutPage;
