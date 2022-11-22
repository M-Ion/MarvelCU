import * as yup from "yup";
import { isLengthValid } from "../../../utils/string.utils";

const heroValidSchema = yup.object({
  name: yup
    .string()
    .required()
    .test("len", "Must between between 2 and 150 characters", (val) =>
      isLengthValid(val, 2, 150)
    ),
  description: yup
    .string()
    .required()
    .test("len", "Must between between 10 and 600 characters", (val) =>
      isLengthValid(val, 10, 600)
    ),
});

export default heroValidSchema;
