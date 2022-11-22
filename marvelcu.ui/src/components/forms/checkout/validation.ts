import * as yup from "yup";

// Only last two digits
let currentYear: number = +new Date().getFullYear().toString().substring(2);
let currentMonth: number = new Date().getMonth() + 1;

const checkoutValidSchema = yup.object({
  cardNumber: yup
    .string()
    .matches(/^4[0-9]{12}(?:[0-9]{3})?$/, "Invalid card number")
    .required(),
  expYear: yup
    .number()
    .min(currentYear, "Invalid")
    .max(99, "Invalid")
    .required("Invalid"),
  expMonth: yup
    .number()
    .required("Invalid")
    .when("expYear", {
      is: currentYear,
      then: (schema) =>
        schema.min(currentMonth + 1, "Past date").max(12, "Invalid"),
      otherwise: (schema) => schema.min(1, "Invalid").max(12, "Invalid"),
    }),
  cvc: yup.number().required(),
});

export default checkoutValidSchema;
