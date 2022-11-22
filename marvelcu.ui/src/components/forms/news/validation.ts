import * as yup from "yup";
import { isLengthValid } from "../../../utils/string.utils";

const newsValidSchema = yup.object({
  title: yup
    .string()
    .required()
    .test("length", "Title must between between 2 and 50 characters", (val) =>
      isLengthValid(val, 2, 150)
    ),
  content: yup
    .string()
    .required()
    .test("length", "Content must between between 2 and 50 characters", (val) =>
      isLengthValid(val, 3, 2500)
    ),
});

export default newsValidSchema;
