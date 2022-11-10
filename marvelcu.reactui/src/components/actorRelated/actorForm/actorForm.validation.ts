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

const createActorSchema = yup.object({
  firstName: yup
    .string()
    .test("len", "Must between between 2 and 50 characters", (val) =>
      validateLength(val, 2, 50)
    )
    .required(),
  //   middleName: yup
  //     .string()
  //     .test("len", "Must have at least 50 characters", (val) =>
  //       validateLength(val, 0, 50)
  //     )
  //     .nullable(),

  //   lastName: yup
  //     .string()
  //     .test("len", "Must have at least 50 characters", (val) =>
  //       validateLength(val, 0, 50)
  //     )
  //     .nullable(),
});

export default createActorSchema;
