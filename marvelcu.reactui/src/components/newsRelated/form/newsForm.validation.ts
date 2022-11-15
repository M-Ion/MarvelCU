import * as yup from "yup";

const validateLength = (
  value: string | undefined,
  min: number,
  max: number
): boolean => {
  return (
    Boolean(value) &&
    (value as string).length >= min &&
    (value as string).length <= max
  );
};

const newsSchema = yup.object({
  title: yup
    .string()
    .required()
    .test("length", "Title must between between 2 and 50 characters", (val) =>
      validateLength(val, 2, 150)
    ),
  content: yup
    .string()
    .required()
    .test("length", "Content must between between 2 and 50 characters", (val) =>
      validateLength(val, 3, 2500)
    ),
});

export default newsSchema;
