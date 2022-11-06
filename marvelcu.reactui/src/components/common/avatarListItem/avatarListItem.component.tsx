import { Box, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

import { StyledAvatar } from "./avatarListItem.styles";

type Props = {
  title: string;
  link: string;
};

const AvatarListItem: FC<Props> = ({ link, title }) => {
  return (
    <Box component={Link} to={link} sx={{ textDecoration: "none" }}>
      <Grid container flexDirection="column" alignItems="center">
        <StyledAvatar src="/marvelLogo.jpg" />
        <Typography>{title}</Typography>
      </Grid>
    </Box>
  );
};

export default AvatarListItem;
