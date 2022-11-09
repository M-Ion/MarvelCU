import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { useRef } from "react";
import actorService from "../../services/actor.service";
import blobService from "../../services/blob.services";
import IPostActor from "../../types/actor/IPostActor.model";
import FormInput from "../formInput/formInput.component";
import createActorSchema from "./addActorForm.validation";

type Values = {
  firstName: string;
  middleName: string;
  lastName: string;
};

const initialValues: Values = {
  firstName: "",
  middleName: "",
  lastName: "",
};

const AddActorForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [postActor] = actorService.usePostActorMutation();
  const [uploadBlob] = blobService.useUploadActorBlobMutation();

  const handlePost = (values: Values) => {
    let body: IPostActor = { ...values };
    if (!body.middleName) body.middleName = null;
    if (!body.lastName) body.lastName = null;

    postActor(body)
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
      // if (handlePost(values)) {
      //   resetForm({ values: initialValues });
      // }
      handlePost(values);
    },

    validationSchema: createActorSchema,
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

export default AddActorForm;
