import * as yup from "yup";

const createMovieSchema = yup.object({
  description: yup
    .string()
    .test(
      "len",
      "Must between between 10 and 600 characters",
      (val) =>
        Boolean(val) &&
        (val as string).length >= 10 &&
        (val as string).length <= 600
    )
    .required(),
  mcuPhase: yup.number().required().min(1).max(10),
  mcuSaga: yup.number().required().min(1).max(2),
  name: yup
    .string()
    .test(
      "len",
      "Must between between 5 and 100 characters",
      (val) =>
        Boolean(val) &&
        (val as string).length >= 5 &&
        (val as string).length <= 100
    )
    .required(),
  price: yup.number().required().min(0),
  premiere: yup.date().required(),
});

export default createMovieSchema;
