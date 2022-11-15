import { Box, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import React, { FC, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import useTransferList, { TranferListType } from "../../hooks/useTranferList";
import actorService from "../../services/actor.service";
import blobService from "../../services/blob.services";
import heroService from "../../services/hero.service";
import movieService from "../../services/movie.service";
import { setAlert } from "../../store/reducers/alerts.slice";
import IGetActor from "../../types/actor/IGetActor.model";
import IGetHero from "../../types/hero/IGetHero.mode";
import IMovie from "../../types/movie/IMovie.model";
import IPostMovie from "../../types/movie/IPostMovie.model";
import getYouTubeIdVideo from "../../utils/getYouTubeIdVideo";
import MovieForm, { Values } from "./form/movieForm.component";
import createMovieSchema from "./form/movieForm.validation";

type Props = {
  movie: IMovie;
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
};

const UpdateMovieForm: FC<Props> = ({
  movie: {
    id,
    description,
    mcuPhase,
    mcuSaga,
    name,
    premiere,
    price,
    youTubeTrailerId,
    actors,
    heroes,
  },
  setOpen,
}) => {
  const dispatch = useDispatch();
  const [file, setFile] = React.useState<File | null>(null);

  const actorTranferList = useTransferList<IGetActor>(
    actorService.useFetchActorsQuery,
    actors
  );
  const heroesTranferList = useTransferList<IGetHero>(
    heroService.useFetchHeroesQuery,
    heroes
  );

  const chosenActors = (
    actorTranferList.rightState[0] as readonly IGetActor[]
  ).map((el) => el.id);
  const chosenHeroes = (
    heroesTranferList.rightState[0] as readonly IGetHero[]
  ).map((el) => el.id);

  const [updateMovie, { isLoading: isLoadingMovie }] =
    movieService.useUpdateMovieMutation();
  const [uploadBlob, { isLoading: isLoadingBlob }] =
    blobService.useUploadMovieBlobMutation();

  const initialValues: Values = {
    description: description ?? "",
    mcuPhase,
    mcuSaga,
    name,
    premiere,
    price,
    youTubeTrailerId: youTubeTrailerId ?? "",
  };

  const handleSubmit = (values: Values) => {
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

    updateMovie({ id, movie: bodyData })
      .unwrap()
      .then((data) => {
        if (file) {
          const formData = new FormData();
          formData.append("file", file, `${id}.${file.name.split(".").pop()}`);

          uploadBlob(formData);
        }

        dispatch(
          setAlert({ type: "success", message: "Movie updated successfully" })
        );

        setOpen(false);
      });
  };

  const formik = useFormik<Values>({
    initialValues,
    onSubmit: async (values: Values, { resetForm }) => {
      await handleSubmit(values);
      resetForm();
    },
    validationSchema: createMovieSchema,
  });

  return !actorTranferList.data ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <MovieForm
      imgState={[file, setFile]}
      isLoading={isLoadingMovie && isLoadingBlob}
      formik={formik}
      actorTransferList={actorTranferList as TranferListType<IGetActor>}
      heroesTranferList={heroesTranferList as TranferListType<IGetHero>}
    />
  );
};

export default UpdateMovieForm;
