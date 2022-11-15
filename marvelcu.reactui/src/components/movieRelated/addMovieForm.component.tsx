import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as React from "react";
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
import IGetActor from "../../types/actor/IGetActor.model";
import IGetHero from "../../types/hero/IGetHero.mode";
import IPostMovie from "../../types/movie/IPostMovie.model";
import getYouTubeIdVideo from "../../utils/getYouTubeIdVideo";
import { getMovieIdFromimdbLink } from "../../utils/imdbLink";
import ImdbFetch from "../common/imdbFetch/imdbFetch.component";

import MovieForm, { Values } from "./form/movieForm.component";
import createMovieSchema from "./form/movieForm.validation";

const initialValues: Values = {
  description: "",
  mcuPhase: 1,
  mcuSaga: 1,
  name: "",
  premiere: new Date(0),
  price: 0,
  youTubeTrailerId: "",
};

const AddMovieForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imdbLink, setimdbLink] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);

  const actorTranferList = useTransferList<IGetActor>(
    actorService.useFetchActorsQuery
  );
  const heroesTranferList = useTransferList<IGetHero>(
    heroService.useFetchHeroesQuery
  );
  const [getFullCredits, { isLoading: isLoadingCredits }] =
    imdbService.useGetFullCreditsMutation();

  const chosenActors = (
    actorTranferList.rightState[0] as readonly IGetActor[]
  ).map((el) => el.id);
  const chosenHeroes = (
    heroesTranferList.rightState[0] as readonly IGetHero[]
  ).map((el) => el.id);

  const [postMovie, { isLoading: isLoadingMovie }] =
    movieService.usePostMovieMutation();
  const [uploadBlob] = blobService.useUploadMovieBlobMutation();

  const handleSubmit = async (values: Values) => {
    // Convert Dayjs to Date
    try {
      values.premiere = (values.premiere as any).toDate();
    } catch {}

    // Split YouTube video id
    const bodyData: IPostMovie = {
      ...values,
      youTubeTrailerId:
        values.youTubeTrailerId && getYouTubeIdVideo(values.youTubeTrailerId),
      actorsIds: chosenActors,
      heroesIds: chosenHeroes,
    };

    const response = await postMovie(bodyData).unwrap();

    if (file) {
      const formData = new FormData();
      formData.append(
        "file",
        file,
        `${response.id}.${file.name.split(".").pop()}`
      );

      await uploadBlob(formData);
    }

    dispatch(
      setAlert({ type: "success", message: "Movie created successfully" })
    );

    setTimeout(() => {
      navigate(`/movies/${response.id}`);
    }, 2000);
  };

  const formik = useFormik<Values>({
    initialValues,
    onSubmit: async (values: Values, { resetForm }) => {
      await handleSubmit(values);
      resetForm();
    },
    validationSchema: createMovieSchema,
  });

  const handleIMDbGet = async () => {
    if (imdbLink) {
      const titleId = getMovieIdFromimdbLink(imdbLink);

      if (titleId) {
        const imdbData = await getFullCredits(titleId).unwrap();
        const { image, title, year } = imdbData.base;

        formik.values.name = title;
        formik.values.premiere = new Date(year, 0);

        const imdbFile = await getImgFileByUrl(image.url, title);

        if (imdbFile) {
          setFile(imdbFile);
        }
      }
    }
  };

  return !actorTranferList.data ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <ImdbFetch
        isLoading={isLoadingCredits}
        handleFetch={handleIMDbGet}
        validateLink={getMovieIdFromimdbLink}
        setImdbLink={setimdbLink}
      />

      <hr />

      <MovieForm
        actorTransferList={actorTranferList as TranferListType<IGetActor>}
        formik={formik}
        heroesTranferList={heroesTranferList as TranferListType<IGetHero>}
        imgState={[file, setFile]}
        isLoading={isLoadingMovie && isLoadingMovie}
      />
    </>
  );
};

export default AddMovieForm;
