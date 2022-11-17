import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useTransferList, { TranferListType } from "../../hooks/useTranferList";
import actorService from "../../services/actor.service";
import blobService from "../../services/blob.services";
import heroService from "../../services/hero.service";
import imdbService from "../../services/imdb/imdb.service";
import { getImgFileByUrl } from "../../services/imgGet.service";
import movieService from "../../services/movie.service";
import { setAlert } from "../../store/reducers/alerts.slice";
import IPostActor from "../../types/actor/IPostActor.model";
import IGetHero from "../../types/hero/IGetHero.mode";
import IGetMovie from "../../types/movie/IGetMovie.model";
import { getActorIdFromimdbLink } from "../../utils/imdbLink";
import ImdbFetch from "../common/imdbFetch/imdbFetch.component";
import ActorForm, { Values } from "./form/actorForm.component";
import createActorSchema from "./form/actorForm.validation";

const initialValues: Values = {
  firstName: "",
  middleName: "",
  lastName: "",
  imdbId: null,
};

const AddActorForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fromImdb, setFromImdb] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [imdbLink, setimdbLink] = React.useState<string>("");

  const moviesTransferList = useTransferList<IGetMovie>(
    movieService.useFetchMoviesQuery,
    []
  );
  const heroesTransferList = useTransferList<IGetHero>(
    heroService.useFetchHeroesQuery,
    []
  );

  const choosenMovies = (
    moviesTransferList.rightState[0] as readonly IGetMovie[]
  ).map((el) => el.id);
  const choosenHeroes = (
    heroesTransferList.rightState[0] as readonly IGetHero[]
  ).map((el) => el.id);

  const [postActor] = actorService.usePostActorMutation();
  const [uploadBlob] = blobService.useUploadActorBlobMutation();

  const [getActorFilmography, { isLoading: isLoadingCredits }] =
    imdbService.useGetActorFilmographyMutation();

  const handleSubmit = (values: Values) => {
    let body: IPostActor = {
      ...values,
      moviesIds: choosenMovies,
      heroesIds: choosenHeroes,
    };
    if (!body.middleName) body.middleName = null;
    if (!body.lastName) body.lastName = null;

    postActor(body)
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
          setAlert({ type: "success", message: "Actor created successfully" })
        );

        setTimeout(() => {
          navigate(`/actors/${data?.id}`);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIMDbGet = async () => {
    if (imdbLink) {
      const actorId = getActorIdFromimdbLink(imdbLink);

      if (actorId) {
        const imdbData = await getActorFilmography(actorId).unwrap();
        const { image, name } = imdbData.base;
        formik.values.imdbId = imdbData.id;

        const imdbFile = await getImgFileByUrl(image.url, image.url);

        const splitedNames = name.split(" ");

        switch (splitedNames.length) {
          case 3:
            formik.values.firstName = splitedNames[0];
            formik.values.middleName = splitedNames[1];
            formik.values.lastName = splitedNames[2];
            break;
          case 2:
            formik.values.firstName = splitedNames[0];
            formik.values.lastName = splitedNames[1];
            break;
          case 1:
            formik.values.firstName = splitedNames[0];
            break;
          default:
            break;
        }

        if (imdbFile) {
          setFile(imdbFile);
        }

        setFromImdb(true);
      }
    }
  };

  const formik = useFormik<Values>({
    initialValues,

    onSubmit: async (values: Values, { resetForm }) => {
      handleSubmit(values);
    },

    validationSchema: createActorSchema,
  });
  return (
    <>
      <ImdbFetch
        isLoading={isLoadingCredits}
        setImdbLink={setimdbLink}
        handleFetch={handleIMDbGet}
        validateLink={getActorIdFromimdbLink}
      />

      <hr />
      <ActorForm
        formik={formik}
        imgState={[file, setFile]}
        moviesTransferList={moviesTransferList as TranferListType<IGetMovie>}
        heroesTransferList={heroesTransferList as TranferListType<IGetHero>}
        disableOnImdb={fromImdb}
      />
    </>
  );
};

export default AddActorForm;
