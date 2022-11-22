import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import movieService from "../../../services/entities/movie.service";
import { setSuccessFeedback } from "../../../services/store/slices/feedback.slice";
import FormField from "../../commons/formField";
import { LoadingBtnStyled } from "./styles";
import checkoutValidSchema from "./validation";

interface CheckoutFormValues {
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvc: number;
  save: boolean;
  amount: number;
}

interface CheckoutFormProps {
  amount: number;
  movieId: number;
}

const initialValues: CheckoutFormValues = {
  amount: 0,
  cardNumber: "4242424242424242",
  cvc: 121,
  expMonth: 12,
  expYear: 24,
  save: false,
};

const CheckoutForm: FC<CheckoutFormProps> = ({ amount, movieId }) => {
  initialValues.amount = amount * 100;
  const dispatch = useDispatch();

  const [pay, { isLoading }] = movieService.useBuyMovieMutation();

  const handleSubmit = async (values: CheckoutFormValues) => {
    const response = await pay({ id: movieId, body: values }).unwrap();

    if (!Boolean(response)) {
      dispatch(setSuccessFeedback("Payment successfully"));

      setTimeout(() => {
        window.location.replace(`/movies/${movieId}`);
      }, 2000);
    }
  };

  const formik = useFormik<CheckoutFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: checkoutValidSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Nameoncard" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormField
            type="text"
            formik={formik}
            prop="cardNumber"
            label="Card Number"
            fullWidth
          />
        </Grid>
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item flexGrow={1}>
            <FormField
              type="number"
              formik={formik}
              prop="expYear"
              label="YY"
              inputProps={{ min: 22, max: 99 }}
              fullWidth
            />
          </Grid>
          <Grid item flexGrow={1}>
            <FormField
              type="number"
              formik={formik}
              prop="expMonth"
              label="MM"
              inputProps={{ min: 1, max: 12 }}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormField
            type="text"
            formik={formik}
            prop="cvc"
            label="CVC"
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12}>
      <FormControlLabel
        control={
          <Checkbox
            id="save"
            color="secondary"
            value={formik.values.save}
            onChange={formik.handleChange}
          />
        }
        label="Remember credit card details for next time"
      />
    </Grid> */}
        <LoadingBtnStyled
          loading={isLoading}
          variant="contained"
          color="primary"
          type="submit"
        >
          Place order
        </LoadingBtnStyled>
      </Grid>
    </form>
  );
};

export default CheckoutForm;
