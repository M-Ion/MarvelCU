import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useTransferList, { TranferListType } from "../../hooks/useTranferList";
import blobService from "../../services/blob.services";
import heroService from "../../services/hero.service";
import movieService from "../../services/movie.service";
import { setAlert } from "../../store/reducers/alerts.slice";
import { IPostHero } from "../../types/hero/IPostHero.model";
import IGetMovie from "../../types/movie/IGetMovie.model";
import HeroForm, { Values } from "./form/heroForm.component";
import createHeroSchema from "./form/heroForm.validation";

const initialValues: Values = {
  description: "",
  name: "",
};

const AddHeroForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = React.useState<File | null>(null);

  const moviesTransferList = useTransferList<IGetMovie>(
    movieService.useFetchMoviesQuery,
    []
  );

  const chosenMovies = (
    moviesTransferList.rightState[0] as readonly IGetMovie[]
  ).map((el) => el.id);

  const [postHero] = heroService.usePostHeroMutation();
  const [uploadBlob] = blobService.useUploadHeroBlobMutation();

  const handleSubmit = (values: Values) => {
    const bodyData: IPostHero = {
      ...values,
      moviesIds: chosenMovies,
    };

    postHero(bodyData)
      .unwrap()
      .then((data) => {
        if (file) {
          const formData = new FormData();
          formData.append(
            "file",
            file,
            `${data.id}.${file.name.split(".").pop()}`
          );

          if (formData) {
            uploadBlob(formData);
          }
        }

        dispatch(
          setAlert({ type: "success", message: "Hero created successfully" })
        );

        setTimeout(() => {
          navigate(`/heroes/${data?.id}`);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formik = useFormik<Values>({
    initialValues,
    onSubmit: async (values: Values, { resetForm }) => {
      await handleSubmit(values);
      resetForm();
    },
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

export default AddHeroForm;
