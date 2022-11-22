import { Divider } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useTransferList from "../../../hooks/useTransferLists.hook";
import blobService from "../../../services/blob.service";
import actorService from "../../../services/entities/actor.service";
import heroService from "../../../services/entities/hero.service";
import movieService from "../../../services/entities/movie.service";
import imdbService from "../../../services/imdb.service";
import { setSuccessFeedback } from "../../../services/store/slices/feedback.slice";
import { urlToBlob } from "../../../services/url.service";
import { PostActor } from "../../../types/entites/actor.types";
import { GetHero } from "../../../types/entites/hero.types";
import { GetMovie } from "../../../types/entites/movie.types";
import { prepareFileFormData } from "../../../utils/formData.utils";
import { getNameIdFromImdbLink } from "../../../utils/string.utils";
import ImageUploader from "../../commons/imageUploader";
import ImdbFetch from "../../commons/imdbFetch";
import TransferList from "../../commons/transferList";
import ActorBaseForm, { ActorBaseFormValues } from "./form";
import actorValidSchema from "./validation";

const initialValues: ActorBaseFormValues = {
  firstName: "",
  imdbId: null,
  lastName: "",
  middleName: "",
};

const setNames = (formik: FormikProps<ActorBaseFormValues>, name: string) => {
  const names = name.split(" ");

  switch (names.length) {
    case 3:
      formik.values.firstName = names[0];
      formik.values.middleName = names[1];
      formik.values.lastName = names[2];
      break;
    case 2:
      formik.values.firstName = names[0];
      formik.values.lastName = names[1];
      break;
    case 1:
      formik.values.firstName = names[0];
      break;
    default:
      break;
  }
};

const AddActorForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createActor] = actorService.useCreateActorEntityMutation();
  const [uploadActorFile] = blobService.useUploadEntityBlobMutation();
  const [fetchActorFilmography, { isLoading: loadingFilmography }] =
    imdbService.useGetActorFilmographyMutation();

  const [file, setFile] = useState<File | null>(null);
  const [imdbLink, setImdbLink] = useState<string | null>(null);

  const moviesTL = useTransferList<GetMovie>(
    movieService.useFetchMovieEntitiesQuery
  );
  const {
    rightState: [moviesRight],
  } = moviesTL;

  const heroesTL = useTransferList<GetHero>(
    heroService.useFetchHeroEntitiesQuery
  );
  const {
    rightState: [heroesRight],
  } = heroesTL;

  const selectedMovies: number[] = moviesRight.map((m) => m.id);
  const selectedHeroes: number[] = heroesRight.map((h) => h.id);

  const handleSubmit = async (values: ActorBaseFormValues) => {
    let body: PostActor = {
      ...values,
      moviesIds: selectedMovies,
      heroesIds: selectedHeroes,
    };

    const response = await createActor(body).unwrap();

    if (file) {
      const formData = prepareFileFormData(file, response.id);
      await uploadActorFile({ entity: "Actor", formData });
    }

    dispatch(setSuccessFeedback("New actor entity added"));

    setTimeout(() => {
      navigate(`/actors/${response.id}`);
    }, 1000); // 1s
  };

  const fetchImdbData = async () => {
    if (imdbLink) {
      const id = getNameIdFromImdbLink(imdbLink);

      if (id) {
        const imdbData = await fetchActorFilmography(id).unwrap();
        const { image, name } = imdbData.base;
        const imdbFile = await urlToBlob(image.url, image.url);

        setNames(formik, name);

        if (imdbFile) {
          setFile(imdbFile);
        }

        formik.values.imdbId = imdbData.id;
      }
    }
  };

  const formik = useFormik<ActorBaseFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: actorValidSchema,
  });

  return (
    <>
      <ImdbFetch
        handleFetch={fetchImdbData}
        validateImdbLink={getNameIdFromImdbLink}
        setImdbLink={setImdbLink}
        loading={loadingFilmography}
      />
      <Divider />
      <ActorBaseForm formik={formik} disabled={Boolean(imdbLink)}>
        <TransferList title="Select movies" transferHook={moviesTL} />
        <TransferList title="Select heroes" transferHook={heroesTL} />

        <ImageUploader
          fileState={[file, setFile]}
          disabled={Boolean(imdbLink)}
        />
      </ActorBaseForm>
    </>
  );
};

export default AddActorForm;
