import * as yup from "yup";
import { isLengthValid } from "../../../utils/string.utils";

const movieValidSchema = yup.object({
  description: yup
    .string()
    .test("len", "Must between between 10 and 600 characters", (val) =>
      isLengthValid(val, 10, 600)
    )
    .required(),
  mcuPhase: yup.number().required().min(1).max(10),
  mcuSaga: yup.number().required().min(1).max(2),
  name: yup
    .string()
    .test("len", "Must between between 2 and 100 characters", (val) =>
      isLengthValid(val, 2, 100)
    )
    .required(),
  price: yup.number().required().min(0),
  premiere: yup.date().required(),
});

export default movieValidSchema;
