import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { FC, SetStateAction, useState } from "react";

type Props = {
  isLoading: boolean;
  handleFetch: () => Promise<void>;
  setImdbLink: (value: SetStateAction<string>) => void;
  validateLink: (link: string) => string | null;
};

const ImdbFetch: FC<Props> = ({
  isLoading,
  handleFetch,
  setImdbLink,
  validateLink,
}) => {
  const [error, setError] = useState<string>("");

  return (
    <Grid container alignSelf={"center"} justifyContent={"space-between"}>
      <TextField
        required
        onChange={(ev) => {
          if (!validateLink(ev.target.value)) {
            setError("Invalid link");
          } else {
            setError("");
            setImdbLink(ev.target.value);
          }
        }}
        helperText={error && error}
        error={Boolean(error)}
        label="IMDb link"
        sx={{ minWidth: "80%" }}
      />
      <LoadingButton
        disabled={Boolean(error)}
        loading={isLoading}
        variant="contained"
        color="secondary"
        onClick={handleFetch}
      >
        Get
      </LoadingButton>
    </Grid>
  );
};

export default ImdbFetch;
