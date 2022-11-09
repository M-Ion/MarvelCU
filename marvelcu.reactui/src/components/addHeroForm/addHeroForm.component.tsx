import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { useRef } from "react";
import blobService from "../../services/blob.services";
import heroService from "../../services/hero.service";
import FormInput from "../formInput/formInput.component";
import createHeroSchema from "./addHeroForm.validation";

type Values = {
  description: string;
  name: string;
};

const initialValues: Values = {
  description: "",
  name: "",
};

const AddHeroForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [postHero] = heroService.usePostHeroMutation();
  const [uploadBlob] = blobService.useUploadHeroBlobMutation();

  const handlePost = (values: Values): boolean => {
    console.log(values);

    postHero(values)
      .unwrap()
      .then((resp) => {
        if (fileRef.current?.files) {
          const formData = new FormData();
          formData.append("file", fileRef.current?.files[0], `${resp.id}.jpg`);

          uploadBlob(formData);
        }
        return true;
      })
      .catch((err) => {
        console.log(err);
      });

    return false;
  };

  const formik = useFormik<Values>({
    initialValues,

    onSubmit: async (values: Values, { resetForm }) => {
      if (handlePost(values)) {
        resetForm({ values: initialValues });
      }
    },

    validationSchema: createHeroSchema,
  });

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
        label={"Name"}
        prop={"name"}
        fullWidth
        margin="normal"
      />

      <FormInput
        formik={formik}
        label={"Description"}
        prop={"description"}
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

export default AddHeroForm;
