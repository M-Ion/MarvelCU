import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormikProps } from "formik";
import React, { FC, ReactNode } from "react";
import { Saga } from "../../../types/enums/sagas.enum";
import FormField from "../../commons/formField";

export interface MovieBaseFormValues {
  description: string;
  imdbId: string | null;
  mcuPhase: number;
  mcuSaga: Saga;
  name: string;
  premiere: Date;
  price: number;
  youTubeTrailerId: string | null;
}

interface MovieBaseFormProps {
  children?: ReactNode | ReactNode[];
  disabled: boolean;
  formik: FormikProps<MovieBaseFormValues>;
  loading: boolean;
}

const MovieBaseForm: FC<MovieBaseFormProps> = ({
  children,
  disabled,
  formik,
  loading,
}) => {
  const SagaSelector = (): JSX.Element => {
    return (
      <FormControl fullWidth>
        <InputLabel>Saga</InputLabel>
        <Select
          value={formik.values.mcuSaga}
          label="Saga"
          name={"mcuSaga"}
          onChange={formik.handleChange}
        >
          <MenuItem value={1}>Infinity</MenuItem>
          <MenuItem value={2}>Multiverse</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const PhaseSelector = (): JSX.Element => {
    const phases = [1, 2, 3, 4, 5, 6];

    return (
      <FormControl fullWidth>
        <InputLabel>Phase</InputLabel>
        <Select
          value={formik.values.mcuPhase}
          label="Phase"
          name={"mcuPhase"}
          onChange={formik.handleChange}
        >
          {phases.map((phase) => (
            <MenuItem key={phase} value={phase}>
              {phase}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const DateTimePicker = (): JSX.Element => {
    const touched: boolean = Boolean(formik.touched.premiere);
    const error: boolean = Boolean(touched && formik.errors.premiere);
    const errorMessage = (touched && formik.errors.premiere) as string;

    const handleChange = (value: Date | null) => {
      formik.setFieldValue("premiere", value, true);
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onChange={handleChange}
          value={formik.values.premiere}
          renderInput={(params: TextFieldProps) => (
            <TextField
              name="premiere"
              label="Premiere"
              margin="normal"
              helperText={errorMessage}
              error={error}
              fullWidth
              {...params}
            />
          )}
        />
      </LocalizationProvider>
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} className="baseForm">
      <FormField
        formik={formik}
        label={"Name"}
        prop={"name"}
        fullWidth
        margin="normal"
        disabled={disabled}
      />
      <FormField
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
          <SagaSelector />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PhaseSelector />
        </Grid>
      </Grid>

      <DateTimePicker />

      <FormField
        formik={formik}
        label={"Price in USD"}
        prop={"price"}
        fullWidth
        type="number"
        margin="normal"
      />
      <FormField
        formik={formik}
        label={"YouTube Trailer link"}
        prop={"youTubeTrailerId"}
        fullWidth
        type="text"
        margin="normal"
      />

      {children}

      <LoadingButton
        className="btnSubmit"
        type="submit"
        fullWidth
        loading={loading}
        variant="contained"
        color="secondary"
      >
        Submit
      </LoadingButton>
    </form>
  );
};

export default MovieBaseForm;
