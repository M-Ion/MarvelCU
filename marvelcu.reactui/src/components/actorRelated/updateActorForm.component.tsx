import { useFormik } from "formik";
import { FC, SetStateAction, useRef } from "react";
import actorService from "../../services/actor.service";
import blobService from "../../services/blob.services";
import IActor from "../../types/actor/IActor.model";
import IPostActor from "../../types/actor/IPostActor.model";
import ActorForm, { Values } from "./actorForm/actorForm.component";
import createActorSchema from "./actorForm/actorForm.validation";

type Props = {
  actor: IActor;
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
};

const UpdateActorForm: FC<Props> = ({
  actor: { id, firstName, middleName, lastName },
  open,
  setOpen,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const initialValues: Values = {
    firstName: firstName,
    middleName: middleName ?? "",
    lastName: lastName ?? "",
  };

  const [postActor] = actorService.useUpdateActorMutation();
  const [uploadBlob] = blobService.useUploadActorBlobMutation();

  const handleSubmit = (values: Values) => {
    let body: IPostActor = { ...values };
    if (!body.middleName) body.middleName = null;
    if (!body.lastName) body.lastName = null;

    postActor({ id, actor: body })
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

export default UpdateActorForm;
