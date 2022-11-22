import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import React, { FC, SetStateAction, useState } from "react";
import { textFieldSx } from "./styles";

interface ImdbFetchProps {
  handleFetch: () => Promise<void>;
  loading: boolean;
  setImdbLink: (value: SetStateAction<string | null>) => void;
  validateImdbLink: (link: string) => string | null;
}

const ImdbFetch: FC<ImdbFetchProps> = ({
  handleFetch,
  loading,
  setImdbLink,
  validateImdbLink,
}) => {
  const [error, setError] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const isValid = validateImdbLink(value);

    if (!isValid) setError("Invalid link");
    else {
      setError("");
      setImdbLink(value);
    }
  };

  return (
    <Grid container alignSelf={"center"} justifyContent={"space-between"}>
      <TextField
        required
        onChange={handleChange}
        helperText={error && error}
        error={Boolean(error)}
        label="IMDb link"
        sx={textFieldSx}
      />
      <LoadingButton
        disabled={Boolean(error)}
        loading={loading}
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
