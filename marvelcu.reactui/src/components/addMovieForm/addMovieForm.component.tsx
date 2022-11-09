import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useFormik } from "formik";
import * as React from "react";
import FormInput from "../formInput/formInput.component";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import createMovieSchema from "./addMovieForm.validation";
import { LoadingButton } from "@mui/lab";
import movieService from "../../services/movie.service";
import blobService from "../../services/blob.services";
import { useRef } from "react";

type Values = {
  description: string;
  mcuPhase: number;
  mcuSaga: 0 | 1;
  name: string;
  premiere: Date;
  price: number;
  youTubeTrailerId: string | null;
};

const initialValues: Values = {
  description: "",
  mcuPhase: 1,
  mcuSaga: 0,
  name: "",
  premiere: new Date(0),
  price: 0,
  youTubeTrailerId: "",
};

export interface IAddMovieFormProps {}

export function AddMovieForm(props: IAddMovieFormProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const [postMovie] = movieService.usePostMovieMutation();
  const [uploadBlob] = blobService.useUploadMovieBlobMutation();

  const handlePost = (values: Values): boolean => {
    // Convert Dayjs to Date
    values.premiere = (values.premiere as any).toDate();

    // Split YouTube video id
    if (values.youTubeTrailerId) {
      values.youTubeTrailerId = values.youTubeTrailerId.split("v=")[1];
    }

    postMovie(values)
      .unwrap()
      .then((resp) => {
        if (fileRef.current?.files) {
          const formData = new FormData();
          formData.append("file", fileRef.current?.files[0], `${resp.id}.jpg`);

          uploadBlob(formData);
        }
        return true;
      })
      .catch((err) => {
        console.log(err);
      });

    return false;
  };

  const formik = useFormik<Values>({
    initialValues,

    onSubmit: async (values: Values, { resetForm }) => {
      if (handlePost(values)) {
        resetForm({ values: initialValues });
      }
    },

    validationSchema: createMovieSchema,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <FormInput
        formik={formik}
        label={"Name"}
        prop={"name"}
        fullWidth
        margin="normal"
      />
      <FormInput
        formik={formik}
        label={"Description"}
        prop={"description"}
        fullWidth
        margin="normal"
        multiline
        rows={5}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Saga</InputLabel>
            <Select
              value={formik.values.mcuSaga}
              label="Saga"
              name={"mcuSaga"}
              onChange={formik.handleChange}
            >
              <MenuItem value={0}>Infinity</MenuItem>
              <MenuItem value={1}>Multiverse</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Phase</InputLabel>
            <Select
              value={formik.values.mcuPhase}
              label="Phase"
              name={"mcuPhase"}
              onChange={formik.handleChange}
            >
              {[1, 2, 3, 4, 5, 6].map((el) => (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onChange={(value) => formik.setFieldValue("premiere", value, true)}
          value={formik.values.premiere}
          renderInput={(params: TextFieldProps) => (
            <TextField
              name="premiere"
              label="Premiere"
              margin="normal"
              helperText={
                (formik.touched.premiere && formik.errors.premiere) as string
              }
              error={formik.touched.premiere && Boolean(formik.errors.premiere)}
              fullWidth
              {...params}
            />
          )}
        />
      </LocalizationProvider>

      <FormInput
        formik={formik}
        label={"Price"}
        prop={"price"}
        fullWidth
        type="number"
        margin="normal"
      />

      <FormInput
        formik={formik}
        label={"YouTube Trailer link"}
        prop={"youTubeTrailerId"}
        fullWidth
        type="text"
        margin="normal"
      />

      <Button variant="contained" component="label" sx={{ margin: "8px" }}>
        Upload Image
        <input
          type="file"
          hidden
          accept="image/jpg"
          ref={fileRef}
          // onChange={handleFileUpload}
        />
      </Button>

      <LoadingButton
        sx={{ margin: "8px" }}
        type="submit"
        fullWidth
        loading={false}
        variant="contained"
        color="secondary"
      >
        Create
      </LoadingButton>
    </form>
  );
}
