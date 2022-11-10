import { useFormik } from "formik";
import * as React from "react";

import blobService from "../../../services/blob.services";
import movieService from "../../../services/movie.service";

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
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [postMovie] = movieService.usePostMovieMutation();
  const [uploadBlob] = blobService.useUploadMovieBlobMutation();

  const handleSubmit = async (values: Values) => {
    // Convert Dayjs to Date
    values.premiere = (values.premiere as any).toDate();

    // Split YouTube video id
    if (values.youTubeTrailerId) {
      values.youTubeTrailerId = values.youTubeTrailerId.split("v=")[1];
    }

    postMovie(values)
      .unwrap()
      .then((data) => {
        if (fileRef.current?.files && fileRef.current?.files.length > 0) {
          const formData = new FormData();
          formData.append("file", fileRef.current?.files[0], `${data.id}.jpg`);

          uploadBlob(formData);
        }
      });
  };

  const formik = useFormik<Values>({
    initialValues,
    onSubmit: async (values: Values) => await handleSubmit(values),
    validationSchema: createMovieSchema,
  });

  return <MovieForm formik={formik} fileRef={fileRef} />;
};

export default AddMovieForm;
