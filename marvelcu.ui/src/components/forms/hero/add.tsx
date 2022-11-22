import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useTransferList from "../../../hooks/useTransferLists.hook";
import blobService from "../../../services/blob.service";
import heroService from "../../../services/entities/hero.service";
import movieService from "../../../services/entities/movie.service";
import { setSuccessFeedback } from "../../../services/store/slices/feedback.slice";
import { PostHero } from "../../../types/entites/hero.types";
import { GetMovie } from "../../../types/entites/movie.types";
import { prepareFileFormData } from "../../../utils/formData.utils";
import ImageUploader from "../../commons/imageUploader";
import TransferList from "../../commons/transferList";
import HeroBaseForm, { HeroBaseFormValues } from "./form";
import heroValidSchema from "./validation";

const initialValues: HeroBaseFormValues = {
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, culpa quisquam delectus in animi temporibus nihil natus! Enim explicabo error impedit excepturi, rem harum a inventore, molestias magni laboriosam doloremque?",
  name: "",
};

const AddHeroForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createHero, { isLoading: loadingHero }] =
    heroService.useCreateHeroEntityMutation();
  const [uploadHeroFile, { isLoading: loadingUploadFile }] =
    blobService.useUploadEntityBlobMutation();

  const [file, setFile] = React.useState<File | null>(null);

  const moviesTL = useTransferList<GetMovie>(
    movieService.useFetchMovieEntitiesQuery
  );

  const {
    rightState: [moviesRight],
  } = moviesTL;

  const selectedMovies: number[] = moviesRight.map((m) => m.id);

  const handleSubmit = async (values: HeroBaseFormValues) => {
    const body: PostHero = {
      ...values,
      moviesIds: selectedMovies,
    };
    const response = await createHero(body).unwrap();

    if (file) {
      const formData = prepareFileFormData(file, response.id);
      await uploadHeroFile({ entity: "Hero", formData });
    }

    dispatch(setSuccessFeedback("New hero entity added"));

    setTimeout(() => {
      navigate(`/heroes/${response.id}`);
    }, 1000); // 1s
  };

  const formik = useFormik<HeroBaseFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: heroValidSchema,
  });

  return (
    <HeroBaseForm formik={formik} loading={loadingHero || loadingUploadFile}>
      <TransferList title="Select movies" transferHook={moviesTL} />
      <ImageUploader fileState={[file, setFile]} disabled={false} />
    </HeroBaseForm>
  );
};

export default AddHeroForm;
