import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormikProps } from "formik";
import { LoadingButton } from "@mui/lab";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";

import FormInput from "../../common/formInput.component";
import TransferList from "../../common/transferList.component";
import IGetActor from "../../../types/actor/IGetActor.model";
import IGetHero from "../../../types/hero/IGetHero.mode";
import { TranferListType } from "../../../hooks/useTranferList";

export type Values = {
  description: string;
  mcuPhase: number;
  mcuSaga: 1 | 2;
  name: string;
  premiere: Date;
  price: number;
  youTubeTrailerId: string | null;
  imdbId: string | null;
};

export interface IAddMovieFormProps {
  formik: FormikProps<Values>;
  actorTransferList: TranferListType<IGetActor>;
  heroesTranferList: TranferListType<IGetHero>;
  isLoading: boolean;
  imgState: [File | null, React.Dispatch<React.SetStateAction<File | null>>];
  disableOnImdb?: boolean;
}

export default function MovieForm({
  actorTransferList,
  formik,
  heroesTranferList,
  isLoading,
  imgState,
  disableOnImdb = false,
}: IAddMovieFormProps) {
  const [img, setImg] = imgState;
  const [imgUrl, setImgUrl] = React.useState<string>("");

  React.useEffect(() => {
    if (img) {
      setImgUrl(URL.createObjectURL(img));
    } else setImgUrl("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img]);

  const handleImgUpload = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files.length > 0) {
      const files = ev.target.files as FileList;
      const lastOne: File = files[files.length - 1];

      setImg(lastOne);

      return;
    }
    setImg(null);
  };

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
        disabled={disableOnImdb}
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
              <MenuItem value={1}>Infinity</MenuItem>
              <MenuItem value={2}>Multiverse</MenuItem>
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
        label={"Price in USD"}
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

      <Box sx={{ width: "100%", margin: "16px", textAlign: "start" }}>
        <Typography>Choose Actors</Typography>
        <TransferList transferList={actorTransferList} />
      </Box>

      <Box sx={{ width: "100%", margin: "16px", textAlign: "start" }}>
        <Typography>Choose Movies</Typography>
        <TransferList transferList={heroesTranferList} />
      </Box>

      <Button
        variant="contained"
        component="label"
        sx={{ margin: "8px" }}
        disabled={disableOnImdb}
      >
        Upload Image
        <input
          type="file"
          hidden
          accept="image/jpg"
          onChange={handleImgUpload}
        />
      </Button>

      {img && (
        <Container
          sx={{
            width: "50%",
            margin: 0,
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            height: 400,
          }}
        />
      )}

      <LoadingButton
        sx={{ margin: "8px" }}
        type="submit"
        fullWidth
        loading={isLoading}
        variant="contained"
        color="secondary"
      >
        Submit
      </LoadingButton>
    </form>
  );
}
