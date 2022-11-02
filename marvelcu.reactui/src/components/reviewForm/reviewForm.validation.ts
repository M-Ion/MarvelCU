import * as yup from "yup";

const reviewSchema = yup.object({
  opinion: yup
    .string()
    .min(3, "Your review should contain at least 3 characters")
    .max(25, "Your review should contain less than 25 characters")
    .required(),
  rating: yup.number().min(1, "Give a rating from 1 to 5").max(5),
});

export default reviewSchema;
