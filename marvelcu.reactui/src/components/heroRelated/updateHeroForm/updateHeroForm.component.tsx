import { useFormik } from "formik";
import { FC, SetStateAction, useRef } from "react";
import blobService from "../../../services/blob.services";
import heroService from "../../../services/hero.service";
import IHero from "../../../types/hero/IHero.mode";
import HeroForm, { Values } from "../heroForm/heroForm.component";
import createHeroSchema from "../heroForm/heroForm.validation";

type Props = {
  hero: IHero;
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
};

const UpdateHeroForm: FC<Props> = ({
  hero: { id, name, description },
  open,
  setOpen,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [updateHero] = heroService.useUpdateHeroMutation();
  const [uploadBlob] = blobService.useUploadHeroBlobMutation();

  const initialValues: Values = {
    name,
    description,
  };

  const handleSubmit = (values: Values) => {
    updateHero({ id, hero: values })
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

export default UpdateHeroForm;
