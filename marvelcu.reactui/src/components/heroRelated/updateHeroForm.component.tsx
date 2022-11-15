import { useFormik } from "formik";
import React from "react";
import { FC, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import useTransferList, { TranferListType } from "../../hooks/useTranferList";
import blobService from "../../services/blob.services";
import heroService from "../../services/hero.service";
import movieService from "../../services/movie.service";
import { setAlert } from "../../store/reducers/alerts.slice";
import IHero from "../../types/hero/IHero.mode";
import IGetMovie from "../../types/movie/IGetMovie.model";
import HeroForm, { Values } from "./form/heroForm.component";
import createHeroSchema from "./form/heroForm.validation";

type Props = {
  hero: IHero;
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
};

const UpdateHeroForm: FC<Props> = ({
  hero: { id, name, description, movies },
  open,
  setOpen,
}) => {
  const dispatch = useDispatch();
  const [file, setFile] = React.useState<File | null>(null);

  const moviesTransferList = useTransferList<IGetMovie>(
    movieService.useFetchMoviesQuery,
    movies
  );

  const choosenMovies = (
    moviesTransferList.rightState[0] as readonly IGetMovie[]
  ).map((el) => el.id);

  const [updateHero] = heroService.useUpdateHeroMutation();
  const [uploadBlob] = blobService.useUploadHeroBlobMutation();

  const initialValues: Values = {
    name,
    description,
  };

  const handleSubmit = (values: Values, { resetForm }: any) => {
    updateHero({
      id,
      hero: { ...values, moviesIds: choosenMovies },
    })
      .unwrap()
      .then((resp) => {
        if (file) {
          const formData = new FormData();
          formData.append("file", file, `${id}.${file.name.split(".").pop()}`);

          if (formData) {
            uploadBlob(formData);
          }
        }

        dispatch(
          setAlert({ type: "success", message: "Hero updated successfully" })
        );

        setOpen(false);
        resetForm();
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

  return (
    <HeroForm
      formik={formik}
      imgState={[file, setFile]}
      moviesTransferList={moviesTransferList as TranferListType<IGetMovie>}
    />
  );
};

export default UpdateHeroForm;
