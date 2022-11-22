import * as yup from "yup";
import { isLengthValid } from "../../../utils/string.utils";

const actorValidSchema = yup.object({
  firstName: yup
    .string()
    .test("len", "Must between between 2 and 50 characters", (val) =>
      isLengthValid(val, 2, 50)
    )
    .required(),
});

export default actorValidSchema;
