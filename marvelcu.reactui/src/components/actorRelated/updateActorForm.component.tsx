import { useFormik } from "formik";
import React from "react";
import { FC, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import useTransferList, { TranferListType } from "../../hooks/useTranferList";
import actorService from "../../services/actor.service";
import blobService from "../../services/blob.services";
import heroService from "../../services/hero.service";
import movieService from "../../services/movie.service";
import { setAlert } from "../../store/reducers/alerts.slice";
import IActor from "../../types/actor/IActor.model";
import IPostActor from "../../types/actor/IPostActor.model";
import IGetHero from "../../types/hero/IGetHero.mode";
import IGetMovie from "../../types/movie/IGetMovie.model";
import ActorForm, { Values } from "./form/actorForm.component";
import createActorSchema from "./form/actorForm.validation";

type Props = {
  actor: IActor;
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
};

const UpdateActorForm: FC<Props> = ({
  actor: { id, firstName, middleName, lastName, movies, heroes },
  open,
  setOpen,
}) => {
  const dispatch = useDispatch();
  const [file, setFile] = React.useState<File | null>(null);

  const moviesTransferList = useTransferList<IGetMovie>(
    movieService.useFetchMoviesQuery,
    movies
  );
  const heroesTransferList = useTransferList<IGetHero>(
    heroService.useFetchHeroesQuery,
    heroes
  );

  const choosenMovies = (
    moviesTransferList.rightState[0] as readonly IGetMovie[]
  ).map((el) => el.id);
  const choosenHeroes = (
    heroesTransferList.rightState[0] as readonly IGetHero[]
  ).map((el) => el.id);

  const initialValues: Values = {
    firstName: firstName,
    middleName: middleName ?? "",
    lastName: lastName ?? "",
  };

  const [postActor] = actorService.useUpdateActorMutation();
  const [uploadBlob] = blobService.useUploadActorBlobMutation();

  const handleSubmit = (values: Values) => {
    let body: IPostActor = {
      ...values,
      moviesIds: choosenMovies,
      heroesIds: choosenHeroes,
    };
    if (!body.middleName) body.middleName = null;
    if (!body.lastName) body.lastName = null;

    postActor({ id, actor: body })
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
          setAlert({ type: "success", message: "Actor created successfully" })
        );

        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formik = useFormik<Values>({
    initialValues,

    onSubmit: async (values: Values, { resetForm }) => {
      handleSubmit(values);
    },

    validationSchema: createActorSchema,
  });

  return (
    <ActorForm
      formik={formik}
      imgState={[file, setFile]}
      moviesTransferList={moviesTransferList as TranferListType<IGetMovie>}
      heroesTransferList={heroesTransferList as TranferListType<IGetHero>}
    />
  );
};

export default UpdateActorForm;
