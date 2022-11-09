import * as yup from "yup";

const createHeroSchema = yup.object({
  name: yup
    .string()
    .required()
    .test(
      "len",
      "Must between between 2 and 150 characters",
      (val) =>
        Boolean(val) &&
        (val as string).length >= 2 &&
        (val as string).length <= 150
    ),
  description: yup
    .string()
    .required()
    .test(
      "len",
      "Must between between 10 and 600 characters",
      (val) =>
        Boolean(val) &&
        (val as string).length >= 2 &&
        (val as string).length <= 150
    ),
});

export default createHeroSchema;
