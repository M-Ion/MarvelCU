import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { FormikProps } from "formik";
import { FC } from "react";
import FormInput from "../../common/formInput/formInput.component";

export type Values = {
  firstName: string;
  middleName: string;
  lastName: string;
};

type Props = {
  formik: FormikProps<Values>;
  fileRef: React.RefObject<HTMLInputElement>;
};

const ActorForm: FC<Props> = ({ formik, fileRef }) => {
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
        label={"First name"}
        prop={"firstName"}
        fullWidth
        margin="normal"
      />
      <FormInput
        formik={formik}
        label={"Middle name"}
        prop={"middleName"}
        fullWidth
        margin="normal"
      />
      <FormInput
        formik={formik}
        label={"Last name"}
        prop={"lastName"}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" component="label" sx={{ margin: "8px" }}>
        Upload Image
        <input type="file" hidden accept="image/jpg" ref={fileRef} />
      </Button>

      <LoadingButton
        sx={{ margin: "8px" }}
        type="submit"
        fullWidth
        loading={false}
        variant="contained"
        color="secondary"
      >
        Create
      </LoadingButton>
    </form>
  );
};

export default ActorForm;
