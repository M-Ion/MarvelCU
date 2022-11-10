import { useFormik } from "formik";
import { useRef } from "react";
import actorService from "../../services/actor.service";
import blobService from "../../services/blob.services";
import IPostActor from "../../types/actor/IPostActor.model";
import ActorForm, { Values } from "./actorForm/actorForm.component";
import createActorSchema from "./actorForm/actorForm.validation";

const initialValues: Values = {
  firstName: "",
  middleName: "",
  lastName: "",
};

const AddActorForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [postActor] = actorService.usePostActorMutation();
  const [uploadBlob] = blobService.useUploadActorBlobMutation();

  const handleSubmit = (values: Values) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formik = useFormik<Values>({
    initialValues,

    onSubmit: async (values: Values, { resetForm }) => {
      handleSubmit(values);
    },

    validationSchema: createActorSchema,
  });
  return <ActorForm formik={formik} fileRef={fileRef} />;
};

export default AddActorForm;
