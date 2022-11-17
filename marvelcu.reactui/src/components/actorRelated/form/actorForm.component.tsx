import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Typography } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { FC } from "react";
import { TranferListType } from "../../../hooks/useTranferList";
import IGetHero from "../../../types/hero/IGetHero.mode";
import IGetMovie from "../../../types/movie/IGetMovie.model";
import FormInput from "../../common/formInput.component";
import TransferList from "../../common/transferList.component";

export type Values = {
  firstName: string;
  middleName: string;
  lastName: string;
  imdbId: string | null;
};

type Props = {
  formik: FormikProps<Values>;
  moviesTransferList: TranferListType<IGetMovie>;
  heroesTransferList: TranferListType<IGetHero>;
  imgState: [File | null, React.Dispatch<React.SetStateAction<File | null>>];
  disableOnImdb?: boolean;
};

const ActorForm: FC<Props> = ({
  formik,
  heroesTransferList,
  moviesTransferList,
  imgState,
  disableOnImdb = false,
}) => {
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
        label={"First name"}
        prop={"firstName"}
        fullWidth
        margin="normal"
        disabled={disableOnImdb}
      />
      <FormInput
        formik={formik}
        label={"Middle name"}
        prop={"middleName"}
        fullWidth
        margin="normal"
        disabled={disableOnImdb}
      />
      <FormInput
        formik={formik}
        label={"Last name"}
        prop={"lastName"}
        fullWidth
        margin="normal"
        disabled={disableOnImdb}
      />

      <Box sx={{ width: "100%", margin: "16px", textAlign: "start" }}>
        <Typography>Choose Movies</Typography>
        <TransferList transferList={moviesTransferList} />
      </Box>

      <Box sx={{ width: "100%", margin: "16px", textAlign: "start" }}>
        <Typography>Choose Heroes</Typography>
        <TransferList transferList={heroesTransferList} />
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
        loading={false}
        variant="contained"
        color="secondary"
      >
        Create
      </LoadingButton>
    </form>
  );
};

export default ActorForm;
