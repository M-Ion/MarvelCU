import { useFormik } from "formik";
import React, { FC, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import useTransferList from "../../../hooks/useTransferLists.hook";
import blobService from "../../../services/blob.service";
import actorService from "../../../services/entities/actor.service";
import heroService from "../../../services/entities/hero.service";
import movieService from "../../../services/entities/movie.service";
import { setSuccessFeedback } from "../../../services/store/slices/feedback.slice";
import { Actor, PostActor } from "../../../types/entites/actor.types";
import { GetHero } from "../../../types/entites/hero.types";
import { GetMovie } from "../../../types/entites/movie.types";
import { prepareFileFormData } from "../../../utils/formData.utils";
import ImageUploader from "../../commons/imageUploader";
import TransferList from "../../commons/transferList";
import ActorBaseForm, { ActorBaseFormValues } from "./form";
import actorValidSchema from "./validation";

interface UpdateActorFormProps {
  entity: Actor;
  openState: [boolean, (value: SetStateAction<boolean>) => void];
}

const UpdateActorForm: FC<UpdateActorFormProps> = ({
  entity: { id, firstName, heroes, imdbId, lastName, middleName, movies },
  openState,
}) => {
  const dispatch = useDispatch();

  const [updateActor] = actorService.useUpdateActorEntityMutation();
  const [uploadActorFile] = blobService.useUploadEntityBlobMutation();

  const [file, setFile] = useState<File | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setOpen] = openState;

  const moviesTL = useTransferList<GetMovie>(
    movieService.useFetchMovieEntitiesQuery,
    movies
  );
  const {
    rightState: [moviesRight],
  } = moviesTL;

  const heroesTL = useTransferList<GetHero>(
    heroService.useFetchHeroEntitiesQuery,
    heroes
  );
  const {
    rightState: [heroesRight],
  } = heroesTL;

  const initialValues: ActorBaseFormValues = {
    firstName: firstName,
    middleName: middleName ?? "",
    lastName: lastName ?? "",
    imdbId,
  };

  const selectedMovies: number[] = moviesRight.map((m) => m.id);
  const selectedHeroes: number[] = heroesRight.map((h) => h.id);

  const handleSubmit = async (values: ActorBaseFormValues) => {
    let body: PostActor = {
      ...values,
      moviesIds: selectedMovies,
      heroesIds: selectedHeroes,
    };

    const response = await updateActor({ id, entity: body }).unwrap();

    if (file) {
      const formData = prepareFileFormData(file, response.id);
      await uploadActorFile({ entity: "Actor", formData });
    }

    dispatch(setSuccessFeedback("Actor entity updated"));

    setOpen(false);
  };

  const formik = useFormik<ActorBaseFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: actorValidSchema,
  });

  return (
    <ActorBaseForm formik={formik} disabled={Boolean(imdbId)}>
      <TransferList title="Select movies" transferHook={moviesTL} />
      <TransferList title="Select heroes" transferHook={heroesTL} />

      <ImageUploader fileState={[file, setFile]} disabled={Boolean(imdbId)} />
    </ActorBaseForm>
  );
};

export default UpdateActorForm;
