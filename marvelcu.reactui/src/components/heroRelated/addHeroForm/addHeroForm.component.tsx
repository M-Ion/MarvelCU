import { useFormik } from "formik";
import { useRef } from "react";
import blobService from "../../../services/blob.services";
import heroService from "../../../services/hero.service";
import HeroForm, { Values } from "../heroForm/heroForm.component";
import createHeroSchema from "../heroForm/heroForm.validation";

const initialValues: Values = {
  description: "",
  name: "",
};

const AddHeroForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [postHero] = heroService.usePostHeroMutation();
  const [uploadBlob] = blobService.useUploadHeroBlobMutation();

  const handleSubmit = (values: Values) => {
    postHero(values)
      .unwrap()
      .then((resp) => {
        if (fileRef.current?.files && fileRef.current?.files.length > 0) {
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
    onSubmit: handleSubmit,
    validationSchema: createHeroSchema,
  });

  return <HeroForm formik={formik} fileRef={fileRef} />;
};

export default AddHeroForm;
