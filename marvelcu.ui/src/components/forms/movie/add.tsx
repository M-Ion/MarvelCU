import { Divider } from "@mui/material";
import { Dayjs } from "dayjs";
import { useFormik } from "formik";
import React, { useState } from "react";
import { render } from "react-dom";
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
import { GetActor } from "../../../types/entites/actor.types";
import { GetHero } from "../../../types/entites/hero.types";
import { PostMovie } from "../../../types/entites/movie.types";
import { Saga } from "../../../types/enums/sagas.enum";
import { ImdbActor } from "../../../types/imdb.types";
import { not } from "../../../utils/array.utils";
import { prepareFileFormData } from "../../../utils/formData.utils";
import {
  getTitleFromimdbLink,
  getYouTubeVideoId,
} from "../../../utils/string.utils";
import ImageUploader from "../../commons/imageUploader";
import ImdbFetch from "../../commons/imdbFetch";
import TransferList from "../../commons/transferList";
import MovieBaseForm, { MovieBaseFormValues } from "./form";
import movieValidSchema from "./validation";

const initialValues: MovieBaseFormValues = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue interdum finibus. Nam sed est leo. In at cursus felis. Maecenas congue sodales ex id dignissim. Morbi at fringilla diam, et placerat libero. Vestibulum vel vestibulum mauris, eu lacinia nisi.",
  mcuPhase: 1,
  mcuSaga: Saga.Infinity,
  name: "",
  premiere: new Date(0),
  price: 29,
  youTubeTrailerId: "",
  imdbId: null,
};

const AddMovieForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createMovie, { isLoading: loadingMovie }] =
    movieService.useCreateMovieEntityMutation();
  const [uploadMovieFile, { isLoading: loadingFileUpload }] =
    blobService.useUploadEntityBlobMutation();
  const [fetchMovieCredits, { isLoading: loadingCredits }] =
    imdbService.useGetFullCreditsMutation();

  const [file, setFile] = useState<File | null>(null);
  const [imdbLink, setImdbLink] = useState<string | null>(null);

  const actorsTL = useTransferList<GetActor>(
    actorService.useFetchActorEntitiesQuery
  );
  const {
    data: actorItems,
    rightState: [actorsRight, setActorsRight],
    leftState: [actorsLeft, setActorsLeft],
  } = actorsTL;

  const heroesTL = useTransferList<GetHero>(
    heroService.useFetchHeroEntitiesQuery
  );
  const {
    rightState: [heroesRight],
  } = heroesTL;

  const selectedActors: number[] = actorsRight.map((a) => a.id);
  const selectedHeroes: number[] = heroesRight.map((h) => h.id);

  const handleSubmit = async (values: MovieBaseFormValues) => {
    // if (typeof values.premiere === typeof Dayjs) {
    //   values.premiere = (values.premiere as any).toDate();
    // }
    try {
      values.premiere = (values.premiere as any).toDate();
    } catch {}
    values.premiere.setDate(values.premiere.getDate() + 1);

    const body: PostMovie = {
      ...values,
      youTubeTrailerId:
        values.youTubeTrailerId && getYouTubeVideoId(values.youTubeTrailerId),
      actorsIds: selectedActors,
      heroesIds: selectedHeroes,
    };

    const response = await createMovie(body).unwrap();

    if (file) {
      const formData = prepareFileFormData(file, response.id);
      await uploadMovieFile({ entity: "Movie", formData });
    }

    dispatch(setSuccessFeedback("New movie entity added"));

    setTimeout(() => {
      navigate(`/movies/${response.id}`);
    }, 1000); // 1s
  };

  const formik = useFormik<MovieBaseFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: movieValidSchema,
  });

  const supplyImdbCast = (imdbCast: ImdbActor[]) => {
    const cast = actorItems?.filter((a) =>
      imdbCast.find((imdbEl) => imdbEl.id === a.imdbId + "/")
    );

    if (cast) {
      setActorsRight(cast);
      setActorsLeft(not<GetActor>(actorsLeft, cast));
    }
  };

  const fetchImdbData = async () => {
    if (imdbLink) {
      const id = getTitleFromimdbLink(imdbLink);

      if (id) {
        const imdbData = await fetchMovieCredits(id).unwrap();
        const { image, title, year } = imdbData.base;

        supplyImdbCast(imdbData.cast);

        formik.values.name = title;
        formik.values.premiere = new Date(year, 0);
        formik.values.imdbId = imdbData.id;

        const imdbFile = await urlToBlob(image.url, image.url);

        if (imdbFile) {
          setFile(imdbFile);
        }
      }
    }
  };

  return (
    <>
      <ImdbFetch
        handleFetch={fetchImdbData}
        validateImdbLink={getTitleFromimdbLink}
        setImdbLink={setImdbLink}
        loading={loadingCredits}
      />
      <Divider />
      <MovieBaseForm
        formik={formik}
        disabled={Boolean(imdbLink)}
        loading={loadingMovie && loadingFileUpload}
      >
        <TransferList title="Select actors" transferHook={actorsTL} />
        <TransferList title="Select heroes" transferHook={heroesTL} />

        <ImageUploader
          fileState={[file, setFile]}
          disabled={Boolean(imdbLink)}
        />
      </MovieBaseForm>
    </>
  );
};

export default AddMovieForm;
