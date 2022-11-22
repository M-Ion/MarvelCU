import React, { FC, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { Dayjs } from "dayjs";
import useTransferList from "../../../hooks/useTransferLists.hook";
import blobService from "../../../services/blob.service";
import actorService from "../../../services/entities/actor.service";
import heroService from "../../../services/entities/hero.service";
import movieService from "../../../services/entities/movie.service";
import { GetActor } from "../../../types/entites/actor.types";
import { GetHero } from "../../../types/entites/hero.types";
import { Movie, PostMovie } from "../../../types/entites/movie.types";
import MovieBaseForm, { MovieBaseFormValues } from "./form";
import { getYouTubeVideoId } from "../../../utils/string.utils";
import { prepareFileFormData } from "../../../utils/formData.utils";
import { setSuccessFeedback } from "../../../services/store/slices/feedback.slice";
import { useFormik } from "formik";
import movieValidSchema from "./validation";
import ImageUploader from "../../commons/imageUploader";
import TransferList from "../../commons/transferList";

interface UpdateActorFormProps {
  entity: Movie;
  openState: [boolean, (value: SetStateAction<boolean>) => void];
}

const UpdateMovieForm: FC<UpdateActorFormProps> = ({
  entity: {
    actors,
    description,
    heroes,
    id,
    imdbId,
    mcuPhase,
    mcuSaga,
    name,
    premiere,
    price,
    youTubeTrailerId,
  },
  openState,
}) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setOpen] = openState;

  const [updateMovie, { isLoading: loadingMovie }] =
    movieService.useUpdateMovieEntityMutation();
  const [uploadMovieFile, { isLoading: loadingFileUpload }] =
    blobService.useUploadEntityBlobMutation();

  const [file, setFile] = React.useState<File | null>(null);

  const actorsTL = useTransferList<GetActor>(
    actorService.useFetchActorEntitiesQuery,
    actors
  );
  const {
    rightState: [actorsRight],
  } = actorsTL;

  const heroesTL = useTransferList<GetHero>(
    heroService.useFetchHeroEntitiesQuery,
    heroes
  );
  const {
    rightState: [heroesRight],
  } = heroesTL;

  const initialValues: MovieBaseFormValues = {
    description: description ?? "",
    imdbId: null,
    mcuPhase,
    mcuSaga,
    name,
    premiere: new Date(premiere),
    price,
    youTubeTrailerId: youTubeTrailerId
      ? `https://www.youtube-nocookie.com/embed/${youTubeTrailerId}`
      : "",
  };

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

    const response = await updateMovie({ id, entity: body }).unwrap();

    if (file) {
      const formData = prepareFileFormData(file, response.id);
      await uploadMovieFile({ entity: "Movie", formData });
    }

    dispatch(setSuccessFeedback("Movie entity updated"));

    setOpen(false);
  };

  const formik = useFormik<MovieBaseFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: movieValidSchema,
  });

  return (
    <MovieBaseForm
      formik={formik}
      disabled={Boolean(imdbId)}
      loading={loadingMovie || loadingFileUpload}
    >
      <TransferList title="Select actors" transferHook={actorsTL} />
      <TransferList title="Select heroes" transferHook={heroesTL} />

      <ImageUploader fileState={[file, setFile]} disabled={Boolean(imdbId)} />
    </MovieBaseForm>
  );
};

export default UpdateMovieForm;
