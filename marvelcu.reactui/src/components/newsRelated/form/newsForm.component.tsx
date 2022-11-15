import { LoadingButton } from "@mui/lab";
import { FormikProps } from "formik";
import { FC } from "react";
import FormInput from "../../common/formInput.component";

export type Values = {
  title: string;
  content: string;
};

type Props = {
  formik: FormikProps<Values>;
  isLoading: boolean;
};

const NewsForm: FC<Props> = ({ formik, isLoading }) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <FormInput
        formik={formik}
        label={"Title"}
        prop={"title"}
        fullWidth
        margin="normal"
      />
      <FormInput
        formik={formik}
        label={"Content"}
        prop={"content"}
        fullWidth
        margin="normal"
        multiline
        rows={10}
      />
      <LoadingButton
        sx={{ margin: "8px" }}
        type="submit"
        fullWidth
        loading={isLoading}
        variant="contained"
        color="secondary"
      >
        Submit
      </LoadingButton>
    </form>
  );
};

export default NewsForm;
