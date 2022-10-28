import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email("Not valid email").required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
      "Invalid password format"
    )
    .required("Password is required"),
});

export default loginSchema;
