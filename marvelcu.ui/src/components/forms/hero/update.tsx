import { useFormik } from "formik";
import React, { FC, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import useTransferList from "../../../hooks/useTransferLists.hook";
import blobService from "../../../services/blob.service";
import heroService from "../../../services/entities/hero.service";
import movieService from "../../../services/entities/movie.service";
import { setSuccessFeedback } from "../../../services/store/slices/feedback.slice";
import { Hero, PostHero } from "../../../types/entites/hero.types";
import { GetMovie } from "../../../types/entites/movie.types";
import { prepareFileFormData } from "../../../utils/formData.utils";
import ImageUploader from "../../commons/imageUploader";
import TransferList from "../../commons/transferList";
import HeroBaseForm, { HeroBaseFormValues } from "./form";
import heroValidSchema from "./validation";

interface UpdateHeroFormProps {
  entity: Hero;
  openState: [boolean, (value: SetStateAction<boolean>) => void];
}
const UpdateHeroForm: FC<UpdateHeroFormProps> = ({
  entity: { id, name, description, movies },
  openState,
}) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setOpen] = openState;

  const [updateHero, { isLoading: loadingHero }] =
    heroService.useUpdateHeroEntityMutation();
  const [uploadHeroFile, { isLoading: loadingUploadFile }] =
    blobService.useUploadEntityBlobMutation();

  const [file, setFile] = React.useState<File | null>(null);

  const moviesTL = useTransferList<GetMovie>(
    movieService.useFetchMovieEntitiesQuery,
    movies
  );

  const {
    rightState: [moviesRight],
  } = moviesTL;

  const selectedMovies: number[] = moviesRight.map((m) => m.id);

  const initialValues: HeroBaseFormValues = {
    name,
    description,
  };

  const handleSubmit = async (values: HeroBaseFormValues) => {
    const body: PostHero = {
      ...values,
      moviesIds: selectedMovies,
    };
    const response = await updateHero({ id, entity: body }).unwrap();

    if (file) {
      const formData = prepareFileFormData(file, id);
      await uploadHeroFile({ entity: "Hero", formData });
    }

    dispatch(setSuccessFeedback("Hero entity updated"));

    setOpen(false);
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

export default UpdateHeroForm;
