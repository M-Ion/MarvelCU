import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";

import { StyledButton } from "./checkoutForm.styles";
import checkoutSchema from "./checkoutForm.validation";
import FormInput from "../formInput/formInput.component";
import movieService from "../../services/movie.service";
import { FC } from "react";

type Values = {
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvc: number;
  save: boolean;
  amount: number;
};

type Props = {
  movieId: number;
  amount: number;
};

const CheckoutForm: FC<Props> = ({ movieId, amount }) => {
  const [checkout] = movieService.useBuyMovieMutation();

  const handleSubmit = async (values: Values) => {
    const res = await checkout({ id: movieId, body: values });
    console.log(res);
  };

  const formik = useFormik<Values>({
    initialValues: {
      amount: amount * 100,
      cardNumber: "4242424242424242",
      cvc: 121,
      expMonth: 12,
      expYear: 24,
      save: false,
    },
    onSubmit: handleSubmit,
    validationSchema: checkoutSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Nameoncard" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput
            type="text"
            formik={formik}
            prop="cardNumber"
            label="Card Number"
            fullWidth
          />
        </Grid>
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item flexGrow={1}>
            <FormInput
              type="number"
              formik={formik}
              prop="expYear"
              label="YY"
              inputProps={{ min: 22, max: 99 }}
              fullWidth
            />
          </Grid>
          <Grid item flexGrow={1}>
            <FormInput
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
          <FormInput
            type="text"
            formik={formik}
            prop="cvc"
            label="CVC"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <StyledButton variant="contained" color="primary" type="submit">
          Place order
        </StyledButton>
      </Grid>
    </form>
  );
};

export default CheckoutForm;