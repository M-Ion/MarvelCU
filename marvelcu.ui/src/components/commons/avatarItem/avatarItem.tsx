import { Avatar, Box, Grid, SxProps, Typography } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { avatarSx, boxSx } from "./styles";

interface AvatarItemProps {
  blob: string | null;
  link: string;
  title: string;
}

const AvatarItem: FC<AvatarItemProps> = ({ link, title, blob }) => {
  const src = blob ?? "/marvelLogo.jpg";

  return (
    <Box sx={boxSx} component={Link} to={link}>
      <Grid container flexDirection="column" alignItems="center">
        <Avatar src={src} sx={{ ...avatarSx } as SxProps} />
        <Typography>{title}</Typography>
      </Grid>
    </Box>
  );
};

export default AvatarItem;
