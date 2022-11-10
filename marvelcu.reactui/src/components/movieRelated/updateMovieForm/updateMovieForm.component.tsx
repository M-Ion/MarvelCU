import { Dayjs } from "dayjs";
import { useFormik } from "formik";
import React, { FC, SetStateAction } from "react";
import blobService from "../../../services/blob.services";
import movieService from "../../../services/movie.service";
import IMovie from "../../../types/movie/IMovie.model";
import MovieForm from "../movieForm/movieForm.component";
import createMovieSchema from "../movieForm/movieForm.validation";

type Values = {
  description: string;
  mcuPhase: number;
  mcuSaga: 1 | 2;
  name: string;
  premiere: Date;
  price: number;
  youTubeTrailerId: string | null;
};

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
  },
  open,
  setOpen,
}) => {
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [updateMovie] = movieService.useUpdateMovieMutation();
  const [uploadBlob] = blobService.useUploadMovieBlobMutation();

  const initialValues: Values = {
    description,
    mcuPhase,
    mcuSaga,
    name,
    premiere,
    price,
    youTubeTrailerId: youTubeTrailerId ?? "",
  };

  const handleSubmit = (values: Values) => {
    // Convert Dayjs to Date
    if (typeof values.premiere === typeof Dayjs) {
      values.premiere = (values.premiere as any).toDate();
    }

    // Split YouTube video id
    if (values.youTubeTrailerId) {
      values.youTubeTrailerId = values.youTubeTrailerId.split("v=")[1];
    }

    updateMovie({ id, movie: values })
      .unwrap()
      .then((data) => {
        if (fileRef.current?.files && fileRef.current?.files.length > 0) {
          const formData = new FormData();
          formData.append("file", fileRef.current?.files[0], `${id}.jpg`);

          uploadBlob(formData);
        }

        setOpen(false);
      });
  };

  const formik = useFormik<Values>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: createMovieSchema,
  });

  return <MovieForm formik={formik} fileRef={fileRef} />;
};

export default UpdateMovieForm;
